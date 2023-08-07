import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';

import * as Location from 'expo-location';
import { Details } from './Form';
import axios from 'axios';
import { TypePlace } from './Form/PlaceType';
import { AudienceType } from './Form/AudienceType';
import { arrayToFormData } from '../../utils/array';
import { Coordinates } from '../../types';
import { environment } from '../../environment';

export default function CreateBo() {
  const camRef = useRef<Camera | null>(null);

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [capturedPhoto, setCapturedPhoto] = useState('');
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState('Parque');
  const [selectedAudience, setSelectedAudience] = useState('Friends');

  useEffect(() => {
    function getCurrentLocation() {
      const timeout = 10000;
      return new Promise(async (resolve, reject) => {
        setTimeout(() => { reject(new Error(`Error getting gps location after ${(timeout * 2) / 1000} s`)) }, timeout * 2);
        setTimeout(async () => { resolve(await Location.getLastKnownPositionAsync()) }, timeout);
        resolve(await Location.getCurrentPositionAsync());
      });
    }

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 10_000_000,
        timeInterval: 10_000_000,
      });

      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      const coordinates: Coordinates = [longitude, latitude]

      setLocation(coordinates);
    })();
  }, []);



  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Sem acesso a camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    if (!camRef) return;
    if (!camRef.current) return;

    const captured = await camRef.current.takePictureAsync();

    if (captured?.uri) {
      setCapturedPhoto(captured?.uri);
    }

    return captured;
  }
  
  async function takeDetails() {
    await takePicture();
  }

  async function createBo() {
    if (!capturedPhoto) return

    const data = new FormData();

    let filename = capturedPhoto.split('/').pop() || 'test';

    //@ts-ignore
    data.append('image', { uri: capturedPhoto, name: filename, type: 'image/jpeg' });
    data.append('audience', selectedAudience);
    data.append('placeType', selectedPlace);

    arrayToFormData("coordinates", data, location || [-104.9903, 39.7392])

    await axios.post(environment.backendURL + '/bo', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((data) => {
      console.log('Postagem enviada com sucesso');
    })
    .catch((error) => {
      console.error('Erro ao enviar postagem');
    });
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        {!capturedPhoto ? (
          <Camera 
            ref={camRef}
            style={styles.camera} 
            type={type}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.button} 
                onPress={async () => await takeDetails()}>
                <Text style={styles.text}>Onde é hoje?</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <View style={styles.capturedPhotoContainer}>
            <Image
              style={styles.capturedPhoto}
              source={{ uri: capturedPhoto }}
            />
              {/* <TypePlace handleSelect={setSelectedPlace}/>
              <AudienceType handleSelect={setSelectedAudience}/> */}
              <TouchableOpacity
                onPress={createBo}
                style={styles.buttonNext}
                >
                <Text style={styles.text}>Postar</Text>
              </TouchableOpacity>
          </View>
        )
      }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root:{
    flex: 1,
  },
  capturedPhotoContainer: {
    flex: 1,

    padding: 40,
  },
  capturedPhoto: {
    height: 600,
    borderWidth: 2,
    borderColor: 'red',
  },
  buttonNext: {
    height: 50,
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
