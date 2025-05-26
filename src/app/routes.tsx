import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ViewMap from '../screens/mapScreen';
import ViewSearch from '../screens/searchScreen';

export type RootStackParamList = {
  ViewMap: undefined;
  ViewSearch: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ViewMap"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ViewMap" component={ViewMap} />
        <Stack.Screen name="ViewSearch" component={ViewSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes; 