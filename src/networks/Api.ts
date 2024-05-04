import {request} from './ApiClient.js';
import {Constants} from '../appConstants/AppConstants';
const BASE_URL = 'https://api.themoviedb.org/3/';
const initialParam = {
  api_key: Constants.API_KEY,
  language: 'en-US',
};
export const useGetMovies = request({
  method: 'GET',
  url: `${BASE_URL}movie/now_playing`,
  initialParam,
});

export const useGetMovieDetail = request(
  {
    method: 'GET',
    url: `${BASE_URL}movie/`,
    initialParam,
  },
  {
    onSuccess: () => {
      const movieId = useGetMovieDetail.getState().data.id;
      useGetRecommendedMovie.getState().execute({
        id: `${movieId}/recommendations`,
      });
      useGetArtist.getState().execute({
        id: `${movieId}/credits`,
      });
    },
  },
);
export const useGetRecommendedMovie = request({
  method: 'GET',
  url: `${BASE_URL}movie/`,
  initialParam,
});
export const useGetArtist = request({
  method: 'GET',
  url: `${BASE_URL}movie/`,
  initialParam,
});
