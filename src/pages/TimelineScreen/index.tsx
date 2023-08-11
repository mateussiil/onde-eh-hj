import React from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import TimelineItem from '../../components/Timeline';
import { useQuery } from 'react-query';
import { fetchBo } from '../../services/bo';

const Timeline = () => {
  const { data, refetch, isFetching } = useQuery("bo", fetchBo);

  const handleRefresh = () => {
    // Atualize os dados buscando novamente da API
    refetch();
  };

  return (
      <FlatList
        data={(data || []).reverse()}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TimelineItem username={"User A"} imageSource={item.image} />}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />
        }
      />
  );
};

const styles = StyleSheet.create({});

export default Timeline;
