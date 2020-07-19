/**
 * Authentication Screen.
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {globalStyle} from '../styles/Style';
import Colors from '../styles/Colors';

import {useDispatch} from 'react-redux';
import {authenticateUser} from '../redux/actions/authAction';

function SignInScreen({navigation}) {
  const dispatch = useDispatch();

  const signIn = data => {
    dispatch(authenticateUser(navigation));
  };

  return (
    <View style={globalStyle.conatiner}>
      <ScrollView>
        <TouchableOpacity style={globalStyle.button} onPress={signIn}>
          <Text style={globalStyle.logButtonText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={globalStyle.logoWrapper}></View>
    </View>
  );
}
export default SignInScreen;

const styles = StyleSheet.create({
  bottomText: {
    color: Colors.Black,
    fontSize: 14,
    marginTop: 35,
    textAlign: 'center',
  },
  signUpText: {
    paddingHorizontal: 14,
    fontWeight: '700',
    color: Colors.Red,
  },
});
