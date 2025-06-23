import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deezerCoreApi = createApi({
  reducerPath: 'deezerCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://deezerdevs-deezer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
      headers.set('x-rapidapi-key', apiKey);
      headers.set('x-rapidapi-host', 'deezerdevs-deezer.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSearchResults: builder.query({
      query: (searchTerm) => `search?q=${searchTerm}`,
    }),
    getTopCharts: builder.query({
      query: () => `chart`,
    }),
    getSongDetails: builder.query({
      query: (id) => `track/${id}`,
    }),
    getSongRelated: builder.query({
      query: (id) => `track/${id}/related`,
    }),
  }),
});

export const {
  useGetSearchResultsQuery,
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = deezerCoreApi;
