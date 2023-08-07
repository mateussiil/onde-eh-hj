import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import UserTimelineItem from './components/User';
import PlaceImageTimelineItem from './components/PlaceImage';

type TimelineItem = {
  username: string
  imageSource: string
}

const TimelineItem = ({ username, imageSource }: TimelineItem) => {
  return (
    <View style={styles.container}>
      <UserTimelineItem
        username={username}
        imageSource={imageSource}
      />
      <View style={styles.imageContainer}>
        <PlaceImageTimelineItem imageSource={imageSource}/>
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
  }
});



export default TimelineItem;