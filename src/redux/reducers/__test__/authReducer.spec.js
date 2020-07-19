import {AUTH_USER} from '../../actions/type';
import authReducer from '../authReducer';
const initialState = {
  userAuth: [],
};
describe('Auth Reducer', () => {
  it('Should return default state', () => {
    const newState = authReducer(undefined, initialState);
    expect(newState).toEqual(initialState);
  });

  it('Should return new token if receiving type', () => {
    const token = {
      access_token: '9ec1b9b0-d63d-3b1f-9e3b-025beab923c7',
      expires_in: 3600,
      scope: 'am_application_scope default',
      token_type: 'Bearer',
    };
    const newState = authReducer(undefined, {
      type: AUTH_USER,
      payload: token,
    });
    expect(newState).toEqual({
      userAuth: token,
    });
  });
});
