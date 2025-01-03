const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const SCOPE =
  'user-read-email user-top-read user-follow-read user-read-recently-played';
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const BASE_URL = 'https://accounts.spotify.com';
const TOKEN_ENDPOINT = `${BASE_URL}/api/token`;

export async function redirectToSpotifyAuthorization() {
  const codeVerifier = generateCodeVerifier(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  localStorage.setItem('verifier', codeVerifier);

  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID);
  params.append('response_type', 'code');
  params.append('redirect_uri', REDIRECT_URI);
  params.append('scope', SCOPE);
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', codeChallenge);

  document.location = `${BASE_URL}/authorize?${params.toString()}`;
}

export async function getOrRefreshAccessToken(
  payload:
    | { action: 'get'; code: string }
    | { action: 'refresh'; refreshToken: string }
): Promise<AccessTokenResponse> {
  const params = new URLSearchParams();

  if (payload.action === 'get') {
    const verifier = localStorage.getItem('verifier');

    if (!verifier) throw new Error('Missing code verifier');

    params.append('client_id', CLIENT_ID);
    params.append('grant_type', 'authorization_code');
    params.append('code', payload.code);
    params.append('redirect_uri', REDIRECT_URI);
    params.append('code_verifier', verifier!);
  } else if (payload.action === 'refresh') {
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', payload.refreshToken);
    params.append('client_id', CLIENT_ID);
  }

  const result = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });

  if (!result.ok) {
    console.error(await result.json());
    throw new Error('Failed to fetch access token');
  }

  const data = (await result.json()) as AccessTokenResponse;

  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  localStorage.setItem(
    'expiration_time',
    setTokenExpirationTime(data.expires_in).toString()
  );

  return data;
}

function generateCodeVerifier(length: number) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function setTokenExpirationTime(expiresIn: number) {
  const now = new Date().getTime();
  return now + expiresIn * 1000;
}
