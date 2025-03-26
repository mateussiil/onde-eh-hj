import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchImage } from '../../../../services/image';

type PlaceImageTimelineItem = {
  imageSource: string
}

const PlaceImageTimelineItem = ({ imageSource }: PlaceImageTimelineItem) => {
  const { data, isLoading } = useQuery({
    queryKey: ['image', imageSource],
    queryFn: () => fetchImage(imageSource)
  });

  if (isLoading) {
    return <ActivityIndicator size="small" color="gray" />;
  }

  if (!data) {
    return <Text>Erro ao carregar a imagem.</Text>;
  }

  return (
     <Image source={{ uri: data }} style={styles.image} />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
});

export default PlaceImageTimelineItem;