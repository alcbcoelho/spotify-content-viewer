// import {
//   redirectToSpotifyAuthorization,
//   getOrRefreshAccessToken
// } from './authService';

// export default async function () {
//   const clientId = '382c808854a74b2fa89465852f1410ee';
//   const params = new URLSearchParams(location.search);
//   const code = params.get('code');

//   if (!code) {
//     redirectToSpotifyAuthorization(clientId);
//   } else {
//     // const accessToken = await getAccessToken(clientId, code);
//     // const topItems = await getTopItems(accessToken, 'artists');
//   }
// }

// // async function fetchProfile(code: string): Promise<any> {
// //   const result = await fetch("https://api.spotify.com/v1/me", {
// //     method: "GET",
// //     headers: { Authorization: `Bearer ${code}` },
// //   });

// //   return await result.json();
// // }

// async function getTopItems(
//   code: string,
//   itemType: 'artists' | 'tracks',
//   params = '?time_range=long_term'
// ): Promise<TopItems> {
//   const result = await fetch(
//     `https://api.spotify.com/v1/me/top/${itemType}?${params}`,
//     {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${code}`
//       }
//     }
//   );

//   return await result.json();
// }
