import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';

import * as Location from 'expo-location';

export function CreateBo() {
  const camRef = useRef<Camera | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [capturedPhoto, setCapturedPhoto] = useState('');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }


    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading
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

  async function takeLocation() {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
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
  
  async function createBo() {
    if (permission && permission.granted) {
      await takePicture();
      await takeLocation();
    }
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
                onPress={createBo}>
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
              <TouchableOpacity
                style={styles.buttonNext}
                >
                <Text style={styles.text}>Seguinte</Text>
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
    height: 80,
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
