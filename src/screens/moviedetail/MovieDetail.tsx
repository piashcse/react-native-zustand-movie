import React, {useEffect} from 'react';
import Loading from '../../components/loading/Loading';
import styles from './MovieDetailStyle';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {Constants} from '../../appConstants/AppConstants';
import {
  useGetArtist,
  useGetMovieDetail,
  useGetRecommendedMovie,
} from '../../networks/Api.ts';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MovieItem} from '../../types/MovieItem.ts';
import {Cast} from '../../types/Artist.ts';

const MovieDetail = ({navigation, route}: NativeStackScreenProps<any>) => {
  const isLoading = useGetMovieDetail(state => state.loading);
  const movieDetail = useGetMovieDetail(state => state.data);
  const recommendedMovie = useGetRecommendedMovie(state => state.data?.results);
  const artist = useGetArtist(state => state.data?.cast);
  // Api call
  useEffect(() => {
    useGetMovieDetail.getState().execute({id: route.params.movieId});
  }, [route.params.movieId]);

  const similarItem = ({item}: {item: MovieItem}) => {
    return (
      <TouchableOpacity
        style={styles.movieItemContainer}
        onPress={() => navigation.replace('movieDetail', {movieId: item.id})}>
        <Image
          style={styles.similarImageView}
          source={{
            uri: `${Constants.IMAGE_URL}${item.poster_path}`,
          }}
        />
      </TouchableOpacity>
    );
  };
  const artistItem = ({item}: {item: Cast}) => {
    return (
      <TouchableOpacity
        style={styles.movieItemContainer}
        onPress={() => {
          navigation.navigate('ArtistDetail', {personId: item.id});
        }}>
        <Image
          style={styles.artistImageView}
          source={{
            uri: `${Constants.IMAGE_URL}${item.profile_path}`,
          }}
        />
      </TouchableOpacity>
    );
  };

  // main view with loading while api call is going on
  return isLoading ? (
    <Loading />
  ) : (
    <ScrollView style={styles.mainView}>
      <Image
        style={styles.imageView}
        source={{
          uri: `${Constants.IMAGE_URL}${movieDetail?.poster_path}`,
        }}
      />
      <View style={styles.secondContainer}>
        <Text style={styles.title}>{movieDetail?.title}</Text>
        <View style={styles.thirdContainer}>
          <View style={styles.fourthContainer}>
            <Text style={styles.infoTitleData}>
              {movieDetail?.original_language}
            </Text>
            <Text style={styles.infoTitle}>Language</Text>
          </View>
          <View style={styles.fourthContainer}>
            <Text style={styles.infoTitleData}>
              {movieDetail?.vote_average}
            </Text>
            <Text style={styles.infoTitle}>Rating</Text>
          </View>
          <View style={styles.fourthContainer}>
            <Text style={styles.infoTitleData}>{movieDetail?.runtime} min</Text>
            <Text style={styles.infoTitle}>Duration</Text>
          </View>
          <View style={styles.fourthContainer}>
            <Text style={styles.infoTitleData}>
              {movieDetail?.release_date}
            </Text>
            <Text style={styles.infoTitle}>Release Date</Text>
          </View>
        </View>
        <Text style={styles.description}>Description</Text>
        <Text>{movieDetail?.overview}</Text>
        <Text style={styles.description}>Similar</Text>
        <FlatList
          style={styles.flatListContainer}
          data={recommendedMovie}
          renderItem={similarItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.description}>Artist</Text>
        <FlatList
          style={styles.flatListContainer}
          data={artist}
          renderItem={artistItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};
export default MovieDetail;
