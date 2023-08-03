import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const AudienceType = ({ handleSelect }:any) => {
  const [selectedOption, setSelectedOption] = useState<'todos' | 'amigos'>('todos');

  const handleOptionSelection = (option:any) => {
    setSelectedOption(option);
    handleSelect(option)
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handleOptionSelection('todos')}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Feather
          name={selectedOption === 'todos' ? 'check-square' : 'square'}
          size={24}
          color={selectedOption === 'todos' ? 'green' : 'black'}
        />
        <Text style={{ marginLeft: 10 }}>Todos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleOptionSelection('amigos')}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Feather
          name={selectedOption === 'amigos' ? 'check-square' : 'square'}
          size={24}
          color={selectedOption === 'amigos' ? 'green' : 'black'}
        />
        <Text style={{ marginLeft: 10 }}>Amigos</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 10 }}>
        Opção Selecionada: {selectedOption}
      </Text>
    </View>
  );
};