/**
 * Navigation Container
 */

import * as React from 'react';
import {Appbar, Avatar} from 'react-native-paper';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationActions,
  createSwitchNavigator,
} from '@react-navigation/compat';

import {
  HomeScreen,
  InvoiceView,
  SignInScreen,
  InvoiceAddScreen,
  AppLoadingScreen,
} from '../screens';

import {TouchableOpacity} from 'react-native';

import Colors from '../styles/Colors';

const Stack = createStackNavigator();
const Header = ({scene, previous, navigation}) => {
  const {options} = scene.descriptor;
  return (
    <Appbar.Header
      style={{
        backgroundColor: Colors.Red,
      }}>
      {previous ? (
        <Appbar.BackAction onPress={() => navigation.pop()} />
      ) : (
        <TouchableOpacity>
          <Avatar.Image
            size={40}
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
          />
        </TouchableOpacity>
      )}
    </Appbar.Header>
  );
};

function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({scene, previous, navigation}) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}>
      <Stack.Screen name="Login" component={SignInScreen} />
    </Stack.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({scene, previous, navigation}) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddInvoice" component={InvoiceAddScreen} />
      <Stack.Screen name="ViewInvoice" component={InvoiceView} />
    </Stack.Navigator>
  );
}

const RootNavigator = createSwitchNavigator(
  {
    Loading: AppLoadingScreen,
    Login: LoginStack,
    App: RootStack,
  },
  {
    initialRouteName: 'Loading',
  },
);

export default RootNavigator;
