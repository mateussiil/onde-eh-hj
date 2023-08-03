import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const placeTypes = ['Restaurante', 'Parque', 'Museu', 'Shopping', 'Praia'];

export const TypePlace = ({ handleSelect }: any) => {
  const [selectedTiposLocais, setSelectedTiposLocais] = useState([]);

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Feather name="map-pin" size={24} color="black" />
        <Text style={{ marginLeft: 10 }}>Selecionar Tipos de Locais</Text>
      </View>
      <Picker
        selectedValue={selectedTiposLocais}
        onValueChange={(itemValue: any, itemIndex: any) =>{
          console.log(itemValue, itemIndex)
          setSelectedTiposLocais(itemValue)
          handleSelect(itemValue)
        }}>
        {placeTypes.map((place) =>
          <Picker.Item key={place} label={place} value={place} />
        )}
      </Picker>
    </View>
  );
};
