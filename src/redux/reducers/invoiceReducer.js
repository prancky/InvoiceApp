import {
  FETCH_INVOICE_LIST,
  FETCH_INVOICE_PAGING,
  FETCH_INVOICE_MESSAGE,
  ADD_INVOICE,
  FETCHING,
} from '../actions/type';
const initialState = {
  invoiceList: [],
  invoicePaging: null,
  invoiceStatus: null,
  addInvoice: null,
  loading: false,
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVOICE_LIST:
      return {
        ...state,
        invoiceList:
          action.payload.length == 0
            ? []
            : [...state.invoiceList, ...action.payload],
      };
    case FETCH_INVOICE_PAGING:
      return {
        ...state,
        invoicePaging: action.payload,
      };
    case FETCH_INVOICE_MESSAGE:
      return {
        ...state,
        invoiceStatus: action.payload,
      };
    case ADD_INVOICE:
      return {
        ...state,
        addInvoice: action.payload,
      };
    case FETCHING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default invoiceReducer;
