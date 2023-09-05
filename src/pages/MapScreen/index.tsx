import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useQuery } from 'react-query';
import { fetchBo } from '../../services/bo';

export function MapScreen() {
  const { data: bos } = useQuery('bo', fetchBo);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {(bos || [])?.map((bo, index) => <Marker key={index} coordinate={{ longitude: bo.location.coordinates[0], latitude: bo.location.coordinates[1]  } }/>)}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
