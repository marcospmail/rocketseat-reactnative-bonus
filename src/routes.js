import React from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '~/styles/colors';

import Main from '~/pages/Main';
import SignIn from '~/pages/SignIn';

import { navigationRef } from '~/services/navigation';

const Stack = createStackNavigator();

const Routes = () => {
  const signedIn = useSelector(state => state.auth.signedIn);
  const initChecked = useSelector(state => state.auth.initChecked);

  if (!initChecked) return null;

  return (
    <>
      <StatusBar
        backgroundColor={colors.backgroundDarker}
        barStyle="light-content"
      />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={signedIn ? 'Main' : 'SignIn'}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
