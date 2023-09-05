import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CreateBo from '../pages/CreateBo';
import { MapScreen } from '../pages/MapScreen';
import TimelineScreen from '../pages/TimelineScreen';

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
