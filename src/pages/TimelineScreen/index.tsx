import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import TimelineItem from '../../components/Timeline';
import { fetchBo } from '../../services/bo';

const Timeline = () => {
  const { data, refetch, isRefetching } = useQuery({
    queryKey: ['bo'],
    queryFn: fetchBo
  });

  const handleRefresh = () => {
    refetch();
  };

  const timelineData = data || [];

  return (
    <FlatList
      data={timelineData.reverse()}
      keyExtractor={item => item._id}
      renderItem={({ item }) =>
        <TimelineItem
          item={item}
          username={"User A"}
          imageSource={item.image}
          />
        }
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({});

export default Timeline;
