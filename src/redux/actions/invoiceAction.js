import {API_URL} from '../../config/consts';
import AsyncStorage from '@react-native-community/async-storage';
import queryString from 'query-string';
import {postData, getData} from '../../connection';
import {
  FETCH_INVOICE_LIST,
  FETCH_INVOICE_PAGING,
  FETCH_INVOICE_MESSAGE,
  ADD_INVOICE,
  FETCHING,
} from './type';

/**
 * Get Request
 * used to fetch invoice list
 */
export const getInvoisList = (data, nav = null) => async dispatch => {
  const requestData = queryString.stringify(data);
  dispatch({
    type: FETCHING,
    payload: true,
  });
  let obect = {
    url: `invoice-service/1.0.0/invoices?${requestData}`,
  };

  try {
    let response = await getData(obect);
    if (response.data.length != 0) {
      dispatch({
        type: FETCH_INVOICE_LIST,
        payload: response.data,
      });
    }
    dispatch({
      type: FETCH_INVOICE_PAGING,
      payload: response.paging,
    });
    dispatch({
      type: FETCH_INVOICE_MESSAGE,
      payload: response.status,
    });
  } catch (e) {
    if (nav && e.message == 401) {
      await AsyncStorage.removeItem('accessToken');
      nav.navigate('Login');
    }
    dispatch({
      type: FETCH_INVOICE_MESSAGE,
      payload: e.message,
    });
  }
  dispatch({
    type: FETCHING,
    payload: false,
  });
};

/**
 * Post Request
 * used to Create invoice
 */
export const addInvoice = (param, nav = null) => async dispatch => {
  var data = {
    listOfInvoices: [
      {
        merchant: {
          merchantReference: '3011047',
          contact: {
            id: '569809',
            email: 'dung@101digital.io',
          },
        },
        invoiceReference: param.invoiceReference,
        currency: param.currency,
        invoiceDate: param.invoiceDate,
        transactionDate: param.transactionDate,
        dueDate: param.dueDate,
        settlementDate: param.settlementDate,
        items: param.items,
      },
    ],
  };
  let obect = {
    url: `invoice-service/1.0.0/invoices`,
    body: data,
  };

  try {
    let response = await postData(obect);
    dispatch({
      type: ADD_INVOICE,
      payload: response.data,
    });
  } catch (e) {
    console.log(e);
    if (nav && e.message == 401) {
      await AsyncStorage.removeItem('accessToken');
      nav.navigate('Login');
    }
    dispatch({
      type: ADD_INVOICE,
      payload: e,
    });
  }
};

/**
 * used to clear store values
 */
export const clearMessage = () => async dispatch => {
  dispatch({
    type: ADD_INVOICE,
    payload: null,
  });
  dispatch({
    type: FETCH_INVOICE_LIST,
    payload: [],
  });
};
