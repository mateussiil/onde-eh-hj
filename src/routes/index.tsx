import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimelineScreen from '../pages/TimelineScreen';
import { MapScreen } from '../pages/MapScreen';
import CreateBo from '../pages/CreateBo';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mapa" component={MapScreen} />
      <Tab.Screen name="New Item" component={CreateBo} />
      <Tab.Screen name="Timeline" component={TimelineScreen} />
    </Tab.Navigator>
  );
};

export default Navigation;
