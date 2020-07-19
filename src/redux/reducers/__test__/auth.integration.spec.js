import {testStore} from '../../store/testHelper';
import {authenticateUser} from '../../actions/authAction';

describe('fetch api action', () => {
  let store;
  beforeEach(() => {
    store = testStore();
  });

  it('User Authenticate Store is updated correctly', () => {
    return store.dispatch(authenticateUser()).then(() => {
      const newState = store.getState();

      expect(newState.auth.userAuth).toHaveProperty('access_token');
      expect(newState.auth.userAuth).toHaveProperty('token_type');
    });
  });
});
