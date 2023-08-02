import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const placeTypes = ['Restaurante', 'Parque', 'Museu', 'Shopping', 'Praia'];

export const TypePlace = () => {
  const { register, handleSubmit } = useForm();

  const [selectedTiposLocais, setSelectedTiposLocais] = useState([]);

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Feather name="map-pin" size={24} color="black" />
        <Text style={{ marginLeft: 10 }}>Selecionar Tipos de Locais</Text>
      </View>
      <Picker
        selectedValue={selectedTiposLocais}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedTiposLocais(itemValue)
        }>
        {placeTypes.map((places) =>
          <Picker.Item label={places} value={places} />
        )}
      </Picker>
    </View>
  );
};
