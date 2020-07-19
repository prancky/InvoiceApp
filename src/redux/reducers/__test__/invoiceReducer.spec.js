import {
  FETCH_INVOICE_LIST,
  FETCH_INVOICE_PAGING,
  FETCH_INVOICE_MESSAGE,
  ADD_INVOICE,
  FETCHING,
} from '../../actions/type';
import invoiceReducer from '../invoiceReducer';
const initialState = {
  invoiceList: [],
  invoicePaging: null,
  invoiceStatus: null,
  addInvoice: null,
  loading: false,
};
describe('Invoice Reducer', () => {
  it('Should return default state', () => {
    const newState = invoiceReducer(undefined, initialState);
    expect(newState).toEqual(initialState);
  });

  it('Should return new invoices if receiving type', () => {
    const invoice = [
      {
        invoiceId: '173',
        merchantId: '3011047',
        accountingId: '7',
        type: 'TAX_INVOICE',
        currency: 'GBP',
        transactionDate: '2020-04-27',
        dueDate: '2020-05-15',
        status: [
          {
            key: 'emailed',
            value: true,
          },
          {
            key: 'printed',
            value: false,
          },
        ],
        totalTax: 0.0,
        totalAmount: 500.0,
        balanceAmount: 500.0,
      },
    ];

    const newState = invoiceReducer(undefined, {
      type: FETCH_INVOICE_LIST,
      payload: invoice,
    });
    expect(newState.invoiceList).toEqual(invoice);
  });

  it('Should return created invoice details if receiving type', () => {
    const invoiceData = {
      data: {
        requestId: '4fff69b5-401f-434e-9c5e-66fed557c2ad',
      },
      status: {
        code: '000000',
        message: 'Request processed successfully',
      },
    };

    const newState = invoiceReducer(undefined, {
      type: ADD_INVOICE,
      payload: invoiceData,
    });
    expect(newState.addInvoice).toEqual(invoiceData);
  });
});
