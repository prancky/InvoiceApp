import * as Connector from './connector';
import {API_URL, API_AUTH_KEY} from '../config/consts';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Get Request
 * used to fetch Data
 */
export const getData = async data => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await Connector.get(`${API_URL + data.url}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'Application/json',
        Authorization: accessToken,
      },
    });
    if (response.status === 200) {
      const {data} = response;
      if (data) {
        return data;
      } else {
        throw new Error(response);
      }
    } else {
      throw new Error(response);
    }
  } catch (ex) {
    throw new Error(ex);
  }
};

/**
 * Post Request
 * used to Post Data
 */
export const postData = async data => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const response = await Connector.post(`${API_URL + data.url}`, data.body, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'Application/json',
        Authorization: accessToken,
      },
    });

    if (response.status === 200) {
      const {data} = response;
      if (data) {
        return response;
      } else {
        throw new Error(response);
      }
    } else {
      throw new Error(response);
    }
  } catch (ex) {
    throw new Error(ex);
  }
};

/**
 * Authenticate Request
 * used to regenarate Authentication token
 */
export const authUser = async data => {
  try {
    const response = await Connector.post(`${API_URL + data.url}`, data.body, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `${API_AUTH_KEY}`,
      },
    });

    if (response.status === 200) {
      const {data} = response;
      if (data) {
        return data;
      } else {
        throw new Error(response);
      }
    } else {
      throw new Error(response);
    }
  } catch (ex) {
    throw new Error(ex);
  }
};
