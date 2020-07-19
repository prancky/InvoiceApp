/**
 * Invoice View Screen.
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Colors from '../styles/Colors';

export default function InvoiceViewScreen({route, navigation}) {
  const {data} = route.params;

  const statusList = data => {
    return data.map((obj, k) => {
      return (
        <View key={Math.floor(Math.random() * 100)}>
          <Text style={styles.descriptionBottom}>
            {obj.key + ' : ' + obj.value}
          </Text>
        </View>
      );
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <View style={styles.mainFlexConatiner}>
        <View>
          <Text style={styles.name}>
            <Text style={styles.innerText}>INVOICE ID :</Text> {data.invoiceId}
          </Text>
          <View>
            <Text style={styles.name}>
              <Text style={styles.innerText}>MERCHANT ID: </Text>{' '}
              {data.merchantId}
            </Text>
            <Text style={styles.name}>
              <Text style={styles.innerText}>ACCOUNTING ID:</Text>{' '}
              {data.accountingId}
            </Text>
            <View style={styles.details}>
              <Text style={styles.descriptionBottom}>
                Transaction Date :
                <Text style={styles.descriptionBottomInner}>
                  {data.transactionDate}
                </Text>
              </Text>
              <Text style={styles.descriptionBottom}>
                Due Date :{' '}
                <Text style={styles.descriptionBottomInner}>
                  {data.dueDate}
                </Text>
              </Text>
              <Text style={styles.descriptionBottom}>
                Total Tax :{' '}
                <Text style={styles.descriptionBottomInner}>
                  {data.totalTax}
                </Text>{' '}
                <Text style={styles.descriptionBottomInner}>
                  {' '}
                  {data.currency}
                </Text>
              </Text>
              <Text style={styles.descriptionBottom}>
                Balance Amount :
                <Text style={styles.descriptionBottomInner}>
                  {' '}
                  {data.balanceAmount}
                </Text>{' '}
                <Text style={styles.descriptionBottomInner}>
                  {data.currency}
                </Text>
              </Text>
              <Text style={styles.descriptionBottom}>
                Total Amount :
                <Text style={styles.descriptionBottomInner}>
                  {' '}
                  {data.totalAmount}
                </Text>{' '}
                <Text style={styles.descriptionBottomInner}>
                  {data.currency}
                </Text>
              </Text>
              <Text style={styles.descriptionBottom}>
                status :
                <Text style={styles.descriptionBottomInner}> {data.type} </Text>
              </Text>
            </View>
            {data.status && data.status.length > 0 && statusList(data.status)}
          </View>
        </View>
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
    fontSize: 25,
    fontWeight: '700',
    color: Colors.Red,
    lineHeight: 35,
  },
  innerText: {
    color: '#111111',
  },
  description: {
    color: Colors.Black,
  },
  descriptionBottom: {
    marginBottom: 10,
    fontSize: 18,
  },
  descriptionBottomInner: {
    fontWeight: '700',
  },
  details: {
    marginTop: 30,
  },
});
