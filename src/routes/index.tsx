import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimelineScreen from '../pages/TimelineScreen';
import { MapScreen } from '../pages/MapScreen';
import CreateBo from '../pages/CreateBo';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Mapa" component={MapScreen} />
        <Tab.Screen name="New Item" component={CreateBo} />
        <Tab.Screen name="Timeline" component={TimelineScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
