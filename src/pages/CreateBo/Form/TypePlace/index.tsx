import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';

const tiposLocais = ['Restaurante', 'Parque', 'Museu', 'Shopping', 'Praia'];

export const TypePlace = () => {
  const { register, handleSubmit } = useForm();

  const [selectedTiposLocais, setSelectedTiposLocais] = useState([]);

  const handleTipoLocalSelection = (selectedItems: any) => {
    setSelectedTiposLocais(selectedItems);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleSubmit(handleTipoLocalSelection)}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Feather name="map-pin" size={24} color="black" />
        <Text style={{ marginLeft: 10 }}>Selecionar Tipos de Locais</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 10 }}>
        Tipos de Locais Selecionados: {selectedTiposLocais.join(', ')}
      </Text>
    </View>
  );
};
