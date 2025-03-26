import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TimelineItem from '../../components/Timeline';
import { fetchBo } from '../../services/bo';
import { NavigationProps } from '../../types/navigation';

const Timeline = () => {
  const navigation = useNavigation<NavigationProps>();
  const { data, refetch, isRefetching } = useQuery({
    queryKey: ['bo'],
    queryFn: fetchBo
  });

  const handleRefresh = () => {
    refetch();
  };

  const handleCreateBo = () => {
    navigation.navigate('CreateBo');
  };

  const timelineData = (data || []).reverse();

  return (
    <View style={styles.container}>
      <FlatList
        data={timelineData}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TimelineItem
            username={"User A"}
            imageSource={item.image}
            item={item}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
          />
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreateBo}
      >
        <Feather name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});

export default Timeline;
