import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimelineScreen from '../pages/TimelineScreen';
import CreateBo from '../pages/CreateBo';
import MapScreen from '../pages/MapScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Timeline"
          component={TimelineScreen}
          options={{
            title: 'Onde é Hoje?',
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="CreateBo"
          component={CreateBo}
          options={{
            title: 'Novo Local',
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            title: 'Mapa',
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
