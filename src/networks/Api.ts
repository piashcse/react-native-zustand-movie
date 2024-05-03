import {request} from './ApiClient.js';
import {Constants} from '../appConstants/AppConstants';
const BASE_URL = 'https://api.themoviedb.org/3/';
export const useGetMovies = request({
  method: 'GET',
  url: `${BASE_URL}movie/now_playing?api_key=${Constants.API_KEY}&language=en-US`,
});
