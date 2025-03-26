import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useQuery } from '@tanstack/react-query';
import { fetchBo } from '../../services/bo';

const MapScreen = () => {
  const { data: bos, isLoading } = useQuery({
    queryKey: ['bo'],
    queryFn: fetchBo,
    enabled: false
  });

  if (isLoading) return <ActivityIndicator size="small" color="gray" />;

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {(bos || [])?.map((bo, index) =>
          <Marker
            key={index}
            coordinate={{
              longitude: bo.location.coordinates[0],
              latitude: bo.location.coordinates[1]
            }}
            title={bo.placeType}
            description={bo.address}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
