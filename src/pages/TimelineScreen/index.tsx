import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import TimelineItem from '../../components/Timeline';

const Timeline = () => {
  // const { data, refetch, isFetching } = useQuery("bo", fetchBo);

  const isFetching = false;

  const data = [
    {
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw3LJET31_pazsY6wKQr8-oX&ust=1693961344868000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNC5wvOfkoEDFQAAAAAdAAAAABAE",
      _id: 0
    },
    {
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw3LJET31_pazsY6wKQr8-oX&ust=1693961344868000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNC5wvOfkoEDFQAAAAAdAAAAABAE",
      _id: 1
    }
  ]

  const handleRefresh = () => {
    // Atualize os dados buscando novamente da API
    ()=>{};
  };

  return (
      <FlatList
        data={(data).reverse()}
        renderItem={({ item }) => <TimelineItem username={"User A"} imageSource={item.image} />}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />
        }
      />
  );
};

const styles = StyleSheet.create({});

export default Timeline;
