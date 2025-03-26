import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import TimelineItem from '../../components/Timeline';
import { fetchBo } from '../../services/bo';
import { IPost } from '../../types';

const Timeline = () => {
  const { data, refetch, isRefetching } = useQuery({
    queryKey: ['bo'],
    queryFn: fetchBo
  });

  const handleRefresh = () => {
    refetch();
  };

  const mockData: IPost[] = [
    {
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw3LJET31_pazsY6wKQr8-oX&ust=1693961344868000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNC5wvOfkoEDFQAAAAAdAAAAABAE",
      _id: '0',
      audience:'All',
      placeType: '',
      location: {
        type: {
          type: 'string',
          enum: ['Point'],
          required: true,
        },
        coordinates: [-2.53073, -44.3068],
        required: true
      }
    },
    {
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw3LJET31_pazsY6wKQr8-oX&ust=1693961344868000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNC5wvOfkoEDFQAAAAAdAAAAABAE",
      _id: '1',
      audience: 'All',
      placeType: '',
      location: {
        type: {
          type: 'string',
          enum: ['Point'],
          required: true,
        },
        coordinates: [-2.53073, -44.3068],
        required: true
      }
    }
  ];

  const timelineData = data || mockData;

  return (
    <FlatList
      data={timelineData.reverse()}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <TimelineItem username={"User A"} imageSource={item.image} />}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({});

export default Timeline;
