import { getOrRefreshAccessToken } from './services/authService';

const params = new URLSearchParams(location.search);
const code = params.get('code');
const accessToken = localStorage.getItem('access_token');
const refreshToken = localStorage.getItem('refresh_token');
const expirationTime = localStorage.getItem('expiration_time');

async function getAccessToken() {
  if (
    accessToken &&
    refreshToken &&
    expirationTime &&
    new Date().getTime() >= parseInt(expirationTime)
  ) {
    await getOrRefreshAccessToken({
      action: 'refresh',
      refreshToken
    });

    location.reload();
  }
}

async function refreshAccessToken() {
  if (code && !accessToken) {
    await getOrRefreshAccessToken({
      action: 'get',
      code
    });

    location.href = `${location.origin}/viewer`;
  }
}

getAccessToken();
refreshAccessToken();