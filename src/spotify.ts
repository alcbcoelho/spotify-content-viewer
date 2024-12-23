import { getOrRefreshAccessToken } from './services/authService';

const params = new URLSearchParams(location.search);
const code = params.get('code');
const accessToken = localStorage.getItem('access_token');
const refreshToken = localStorage.getItem('refresh_token');
const expirationTime = localStorage.getItem('expiration_time');

console.log('hi'); //

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

  console.log('Token refreshed :)');

  location.reload();
}

if (code && !accessToken) {
  await getOrRefreshAccessToken({
    action: 'get',
    code
  });

  console.log('Added tokens to local storage :)'); //

  location.href = `${location.origin}/viewer`;
}
// if (accessToken && !refreshTokenInterval) {
//   // 👇 NÃO TÁ FUNCIONANDO
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   refreshTokenInterval = setInterval(async () => {
//     const refreshToken = localStorage.getItem('refresh_token');
//     if (refreshToken) {
//       await getOrRefreshAccessToken({
//         action: 'refresh',
//         refreshToken
//       });

//       console.log('Token refreshed :)'); //
//     }
//   }, (expiresIn as number) * 1000);
//   //
// }
