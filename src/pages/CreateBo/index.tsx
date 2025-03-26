import axios from 'axios';
import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../types/navigation';
import { Feather } from '@expo/vector-icons';

import { environment } from '../../environment';
import { Coordinates } from '../../types';
import { arrayToFormData } from '../../utils/array';
import { AudienceType } from './Form/AudienceType';
import { TypePlace } from './Form/PlaceType';
import { createBo } from '../../services/bo';

const defaultAudience = 'Friends'
const { width } = Dimensions.get('window');

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
        <Text style={styles.permissionText}>Sem acesso à câmera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Permitir acesso</Text>
        </TouchableOpacity>
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
        <View style={styles.cameraContainer}>
          <Camera
            ref={camRef}
            style={styles.camera}
            type={type}>
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={toggleCameraType}>
                <Feather name="refresh-cw" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={async () => await takeDetails()}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.capturedPhotoContainer}>
            <Image
              style={styles.capturedPhoto}
              source={{ uri: capturedPhoto }}
            />
            <View style={styles.formContainer}>
              <TypePlace handleSelect={setSelectedPlace}/>
              <AudienceType handleSelect={setSelectedAudience} value={defaultAudience}/>
              <TouchableOpacity
                onPress={createBoAndNavigate}
                style={styles.postButton}
              >
                <Feather name="send" size={24} color="white" />
                <Text style={styles.postButtonText}>Postar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 40,
  },
  flipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  capturedPhotoContainer: {
    flex: 1,
  },
  capturedPhoto: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  postButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  permissionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
