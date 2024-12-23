import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '.';

export type RequestBody = {
  itemType: 'artists' | 'tracks';
  params?: {
    time_range?: 'long_term' | 'medium_term' | 'short_term';
    limit?: number;
    offset?: number;
  };
};

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1/',
    prepareHeaders: (headers /* , { getState } */) => {
      // const accessToken = (getState() as RootState).apiAuth.token;
      const accessToken = localStorage.getItem('access_token');

      if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getTopItems: builder.query<TopItems, RequestBody>({
      query: ({ itemType, params: p }) => {
        const params = new URLSearchParams();

        if (p) {
          const { time_range, limit, offset } = p;

          if (time_range) params.append('time_range', time_range);
          if (limit) params.append('limit', limit.toString());
          if (offset) params.append('offset', offset.toString());
        }

        return `me/top/${itemType}${params && `?${params.toString()}`}`;
      }
    }),
    getCurrentUsersData: builder.query<UserData, void>({
      query: () => 'me'
    })
  })
});

export const { useGetTopItemsQuery, useGetCurrentUsersDataQuery } = apiSlice;
