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
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
