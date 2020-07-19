import {AUTH_USER} from './type';
import {getInvoisList} from './invoiceAction';
import AsyncStorage from '@react-native-community/async-storage';
import queryString from 'query-string';
import {authUser} from '../../connection';

/**
 * user authenticateion
 */
export const authenticateUser = (nav = null) => async dispatch => {
  var data = {
    grant_type: 'client_credentials',
    scope: 'PRODUCTION',
  };

  let obect = {
    url: `token`,
    body: queryString.stringify(data),
  };
  try {
    let response = await authUser(obect);

    await AsyncStorage.setItem(
      'accessToken',
      response.token_type + ' ' + response.access_token,
    );
    dispatch({
      type: AUTH_USER,
      payload: response,
    });
    if (nav) {
      nav.navigate('App');
    }
  } catch (err) {
    dispatch({
      type: AUTH_USER,
      payload: err,
    });
  }
};
