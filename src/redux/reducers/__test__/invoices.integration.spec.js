import {testStore} from '../../store/testHelper';
import {
  getInvoisList,
  addInvoice,
  clearMessage,
} from '../../actions/invoiceAction';
describe('fetch api action', () => {
  let store;
  beforeEach(() => {
    store = testStore();
  });

  it('Fetch Invoices Store is updated correctly', async () => {
    return store.dispatch(await getInvoisList()).then(() => {
      const newState = store.getState();
      expect(newState.invoiceData.invoiceStatus).toEqual('401');
    });
  });
});
