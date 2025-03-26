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
    queryFn: () => fetchImage(imageSource),
    retry: false,
    enabled: Boolean(imageSource)
  });

  if (isLoading) {
    return (
      <View style={[styles.image, styles.center]}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={[styles.image, styles.center]}>
        <Text>Erro ao carregar a imagem.</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: imageSource }}
      style={styles.image}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  }
});

export default PlaceImageTimelineItem;