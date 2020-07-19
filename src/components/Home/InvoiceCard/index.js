import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';

import Colors from '../../../styles/Colors';

import CardContent from './cardContent';

export default function Task(props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => props.navigate(props.data)}>
      <View>
        <View style={{flex: 2}}>
          <View style={styles.flexContainer}>
            <View style={styles.textWrapper}>
              <CardContent data={props.data} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 8,
    backgroundColor: Colors.White,
    borderColor: '#f2f2f2',
    borderWidth: 1,
    marginBottom: 5,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapper: {
    marginLeft: 10,
    flexGrow: 1,
  },
});
