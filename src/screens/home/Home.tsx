import React, {useEffect} from 'react';
import MovieList from '../../components/movielist/MovieList';
import {View} from 'react-native';
import styles from './HomeStyle';

import {useGetMovies} from '../../networks/Api.ts';
import type {NavigationProp} from '@react-navigation/native';

const Home = (navigation: NavigationProp<any>) => {
  const movies = useGetMovies(state => state.data?.results);
  useEffect(() => {
    useGetMovies.getState().execute();
  }, []);
  return (
    <View style={styles.mainView}>
      <MovieList
        movies={movies}
        loadMoreData={() => {}}
        onPress={() => {
          navigation.navigate('MovieDetail');
        }}
      />
    </View>
  );
};
export default Home;
