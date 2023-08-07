import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
import { fetchImage } from '../../../../services/image';

type PlaceImageTimelineItem = {
  imageSource: string
}

const PlaceImageTimelineItem = ({ imageSource }: PlaceImageTimelineItem) => {
  const { data, isFetching } = useQuery(["image", imageSource], () => fetchImage(imageSource));

  console.log({ data })

  if (isFetching) return <></>

  return (
     <Image source={{ uri: (data || '') }} style={styles.image} />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginRight: 10,
  }
});



export default PlaceImageTimelineItem;