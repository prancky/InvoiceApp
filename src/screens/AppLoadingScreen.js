/**
 * Pre Loading Screen
 */

import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
function AppLoadingScreen({navigation}) {
  /**
   * used to check token exsist.
   * and navigate to relavent navigation stack
   */
  async function navigationAsyncEffect() {
    let accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      navigation.navigate('App');
    } else {
      navigation.navigate('Login');
    }
  }
  useEffect(() => {
    navigationAsyncEffect();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Loading ...</Text>
    </View>
  );
}
export default AppLoadingScreen;
