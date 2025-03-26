import axios from 'axios';
import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../types/navigation';

import { environment } from '../../environment';
import { Coordinates } from '../../types';
import { arrayToFormData } from '../../utils/array';
import { AudienceType } from './Form/AudienceType';
import { TypePlace } from './Form/PlaceType';
import { createBo } from '../../services/bo';

const defaultAudience = 'Friends'

export default function CreateBo() {
  const camRef = useRef<Camera | null>(null);
  const navigation = useNavigation<NavigationProps>();

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [capturedPhoto, setCapturedPhoto] = useState<null | string>(null);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState('Parque');
  const [selectedAudience, setSelectedAudience] = useState(defaultAudience);

  useEffect(() => {
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

  function showToast() {
    Toast.show('Foto cadastrada!', { duration: Toast.durations.LONG });
  }

  async function takeDetails() {
    await takePicture();
  }

  async function createBoAndNavigate() {
    if (!capturedPhoto) return;

    const data = new FormData();
    let filename = capturedPhoto.split('/').pop() || 'test';

    //@ts-ignore
    data.append('image', { uri: capturedPhoto, name: filename, type: 'image/jpeg' });
    data.append('audience', selectedAudience);
    data.append('placeType', selectedPlace);

    arrayToFormData("coordinates", data, location || [-104.9903, 39.7392])

    try {
      await createBo(data);
      setCapturedPhoto(null);
      showToast();
      console.log('Postagem enviada com sucesso');
    } catch (error) {
      console.error('Erro ao enviar postagem');
    } finally {
      navigation.navigate('Timeline');
    }
  }

  return (
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
        <ScrollView>
          <View style={styles.capturedPhotoContainer}>
            <Image
              style={styles.capturedPhoto}
              source={{ uri: capturedPhoto }}
            />
              <TypePlace handleSelect={setSelectedPlace}/>
              <AudienceType handleSelect={setSelectedAudience} value={defaultAudience}/>
              <TouchableOpacity
                onPress={createBoAndNavigate}
                style={styles.buttonNext}
                >
                <Text style={styles.text}>Postar</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      )
    }
    </View>
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
