import React, {useEffect} from 'react';
import MovieList from '../../components/movielist/MovieList';
import {View} from 'react-native';
import styles from './HomeStyle';

import {useGetMovies} from '../../networks/Api.ts';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Loading from '../../components/loading/Loading.tsx';

const Home = ({navigation}: NativeStackScreenProps<any>) => {
  const movies = useGetMovies(state => state.data?.results);
  const loading = useGetMovies(state => state.loading);
  useEffect(() => {
    useGetMovies.getState().execute();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <View style={styles.mainView}>
      <MovieList
        movies={movies}
        loadMoreData={() => {}}
        onPress={item => navigation.navigate('movieDetail', {movieId: item.id})}
      />
    </View>
  );
};
export default Home;
