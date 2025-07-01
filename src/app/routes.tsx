import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import MessageScreen from '../screens/messageScreen';

export type RootStackParamList = {
  MessageScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MessageScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MessageScreen" component={MessageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
