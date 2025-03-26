import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import UserTimelineItem from './components/User';
import PlaceImageTimelineItem from './components/PlaceImage';
import { IPost } from '../../types';

type TimelineItem = {
  username: string
  imageSource: string
  item: IPost
}

const TimelineItem = ({ username, imageSource, item }: TimelineItem) => {
  return (
    <View style={styles.container}>
      <UserTimelineItem
        username={username}
        imageSource={imageSource}
      />
      <View style={styles.imageContainer}>
        <PlaceImageTimelineItem imageSource={imageSource}/>
        <View style={styles.addressContainer}>
          <Feather name="map-pin" size={16} color="#666" />
          <Text style={styles.addressText}>{item.address}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Text>{item.address}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Text>{item.peopleNumber} nessa localização</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
  },
  imageContainer: {
    marginLeft: 50 + 10
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  addressText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 14,
  }
});

export default TimelineItem;