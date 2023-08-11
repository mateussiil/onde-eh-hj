import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

type audienceType = 'All' | 'Friends'

type AudienceTypeProps = { 
  handleSelect: (value: audienceType) => void 
  value: audienceType
}

export const AudienceType = ({ handleSelect, value }: AudienceTypeProps) => {
  const [selectedOption, setSelectedOption] = useState<audienceType>(value);

  const handleOptionSelection = (option:any) => {
    setSelectedOption(option);
    handleSelect(option)
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handleOptionSelection('All')}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Feather
          name={selectedOption === 'All' ? 'check-square' : 'square'}
          size={24}
          color={selectedOption === 'All' ? 'green' : 'black'}
        />
        <Text style={{ marginLeft: 10 }}>Todos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleOptionSelection('Friends')}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Feather
          name={selectedOption === 'Friends' ? 'check-square' : 'square'}
          size={24}
          color={selectedOption === 'Friends' ? 'green' : 'black'}
        />
        <Text style={{ marginLeft: 10 }}>Amigos</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 10 }}>
        Opção Selecionada: {selectedOption === 'Friends' ? 'Amigos' : 'Todos'}
      </Text>
    </View>
  );
};