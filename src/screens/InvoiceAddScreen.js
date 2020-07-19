/**
 * Invoice Create Screen.
 */

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import {TextInput} from 'react-native-paper';
import moment from 'moment';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {addInvoice, clearMessage} from '../redux/actions/invoiceAction';

import {globalStyle} from '../styles/Style';

function InvoiceAddScreen({navigation}) {
  const invoiceStatus = useSelector(state => state.invoiceData.addInvoice);

  const dispatch = useDispatch();

  const [invoiceData, setInvoiceData] = useState({
    invoiceReference: null,
    currency: null,
    dueDate: moment()
      .add(2, 'd')
      .format('YYYY-MM-DD'),
  });
  const [date, setDate] = useState(
    moment()
      .add(2, 'd')
      .format('YYYY-MM-DD'),
  );

  useEffect(() => {
    if (invoiceStatus) {
      if (invoiceStatus.status.code === '000000') {
        showMessage({
          message: 'Success!',
          description: invoiceStatus.status.message,
          type: 'success',
        });
        navigation.goBack();
      }
      dispatch(clearMessage());
    }
  }, [invoiceStatus]);

  const updateField = (name, value) => {
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  const styles = StyleSheet.create({
    inputContainer: {
      marginHorizontal: 30,
      marginTop: 5,
    },
  });

  const onSubmit = () => {
    let invoiceReference = invoiceData.invoiceReference;
    let currency = invoiceData.currency;
    let dueDate = invoiceData.dueDate;

    if (!invoiceReference || !currency || !dueDate) {
      if (!invoiceReference && !currency && !dueDate) {
        showMessage({
          message: 'Error',
          description: 'All Fields are required',
          type: 'danger',
        });
      } else {
        if (!invoiceReference) {
          showMessage({
            message: 'Error',
            description: 'Reference Should not be empty',
            type: 'danger',
          });
        } else if (!currency) {
          showMessage({
            message: 'Error',
            description: 'Currency Should not be empty',
            type: 'danger',
          });
        } else if (!dueDate) {
          showMessage({
            message: 'Error',
            description: 'Due Date Should not be empty',
            type: 'danger',
          });
        }
      }
    } else {
      let data = invoiceData;
      data.items = itemListGenerator();
      data.invoiceDate = moment()
        .add(Math.floor(Math.random() * 5) + 1, 'd')
        .format('YYYY-MM-DD');
      data.transactionDate = moment()
        .add(Math.floor(Math.random() * 5) + 1, 'd')
        .format('YYYY-MM-DD');
      data.settlementDate = moment()
        .add(Math.floor(Math.random() * 10) + 1, 'd')
        .format('YYYY-MM-DD');
      dispatch(addInvoice(data, navigation));
    }
  };

  // used to generate random list
  const itemListGenerator = (length = Math.floor(Math.random() * 5) + 1) => {
    let listArray = [];
    for (var i = 0; i < length; i++) {
      let item = {
        quantity: Math.floor(Math.random() * 10) + 1,
        taxId: (Math.floor(Math.random() * 10) + 1).toString(),
        amount: Math.floor(Math.random() * (100 * length)) + 1,
        itemReference: randomWordGenerator(6, 1),
        description:
          randomWordGenerator(6, 2) +
          ' ' +
          randomWordGenerator(10, 2) +
          ' ' +
          randomWordGenerator(7, 2) +
          ' ' +
          randomWordGenerator(5, 1),
      };
      listArray.push(item);
    }
    return listArray;
  };

  // used to generate random string and numbers
  const randomWordGenerator = (Length, Type) => {
    var text = '';
    var possible =
      Type == 1
        ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (var i = 0; i < Length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  return (
    <View style={{flex: 1, marginTop: 40}}>
      <View
        style={{
          position: 'absolute',
          zIndex: 999,
          width: '100%',
        }}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Invoice Reference"
            mode="outlined"
            style={{borderColor: '#111111'}}
            onChangeText={text => updateField('invoiceReference', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Currency"
            mode="outlined"
            style={{borderColor: '#111111'}}
            onChangeText={text => updateField('currency', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text
            style={{
              fontSize: 14,
              marginTop: 0,
              marginLeft: 0,
              marginBottom: 15,
            }}>
            Due date
          </Text>
        </View>
        <DatePicker
          date={date}
          format="YYYY-MM-DD"
          mode="date"
          style={{width: '100%'}}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          androidMode="spinner"
          minuteInterval={30}
          minDate={moment()
            .add(2, 'd')
            .toDate()}
          customStyles={{
            dateInput: {
              borderWidth: 1,
              alignItems: 'flex-start',
              paddingLeft: 75,
              borderRadius: 5,
              marginHorizontal: 30,
              height: 58,
              borderColor: '#111111',
              marginBottom: 15,
            },
            disabled: {
              paddingTop: 10,
              paddingBottom: 10,
              borderWidth: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
              color: '#ddd',
            },
            dateText: {
              fontSize: 18,
              fontWeight: '600',
            },
            btnCancel: {
              padding: 0,
              paddingLeft: 5,
            },
            btnConfirm: {
              padding: 0,
              paddingRight: 5,
            },
            btnTextCancel: {
              fontSize: 16,
              paddingHorizontal: 15,
            },
            btnTextConfirm: {
              fontSize: 16,
              paddingHorizontal: 15,
            },
          }}
          onDateChange={date => {
            setDate(date);
            updateField('dueDate', date);
          }}
        />
      </View>
      <View style={{position: 'absolute', bottom: 10, left: 20, width: '90%'}}>
        <TouchableOpacity style={globalStyle.button} onPress={onSubmit}>
          <Text style={globalStyle.logButtonText}>Create Invoice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default InvoiceAddScreen;
