/**
 * Invoice App
 * Card Component
 * used to Render ther Item Card Details
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../../styles/Colors';

export default function EditTask(props) {
  return (
    <View style={styles.mainFlexConatiner}>
      <View>
        <Text style={styles.name}>
          {'# ' +
            props.data.invoiceId +
            ' - Merchant Id : ' +
            props.data.merchantId}
        </Text>
        <Text style={styles.description}>
          Transaction Date :{' '}
          <Text style={styles.innerText}>{props.data.transactionDate}</Text>
        </Text>
        <Text style={styles.description}>
          Amount :{' '}
          <Text style={styles.innerText}>{props.data.totalAmount}</Text>
          <Text style={styles.innerText}>{props.data.currency}</Text>
        </Text>
        <Text style={styles.description}>
          Type : <Text style={styles.innerText}>{props.data.type}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainFlexConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.Red,
  },
  description: {
    color: Colors.Black,
    fontSize: 16,
  },
  innerText: {
    fontWeight: '700',
    fontSize: 15,
  },
});
