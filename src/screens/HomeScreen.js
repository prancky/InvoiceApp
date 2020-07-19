/**
 * Home Screen.
 */

import React, {useState, useEffect} from 'react';
import {FAB} from 'react-native-paper';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

import {Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useDispatch, useSelector} from 'react-redux';
import {addInvoice, getInvoisList} from '../redux/actions/invoiceAction';

import {globalStyle} from '../styles/Style';
import Colors from '../styles/Colors';
import InvoiceCard from '../components/Home/InvoiceCard';

function HomeScreen({navigation}) {
  /**
   * access store data.
   */
  const invoiceStatus = useSelector(state => state.invoiceData.addInvoice);
  const listLoading = useSelector(state => state.invoiceData.loading);
  const invoicesList = useSelector(state => state.invoiceData.invoiceList);
  const listPaging = useSelector(state => state.invoiceData.invoicePaging);
  const dispatch = useDispatch();

  const [invoiceList, updateInvoiceList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [refNumber, setRefNumber] = useState(3011047);
  const [date, setDate] = useState({
    fromDate: '2019-06-10',
    toDate: '2025-06-10',
  });

  useEffect(() => {
    updateInvoiceList(invoicesList);
  }, [invoicesList]);

  useEffect(() => {
    setRefreshing(!refreshing);
  }, [listLoading]);

  useEffect(() => {
    if (pageNumber == 0) {
      fetchInvoices();
    }
  }, [pageNumber == 0]);

  useEffect(() => {
    if (invoiceStatus) {
      if (invoiceStatus.status.code === '000000') {
        setPageNumber(0);
      }
    }
  }, [invoiceStatus]);

  const fetchInvoices = () => {
    let data = {
      fromDate: date.fromDate,
      toDate: date.toDate,
      pageSize: 10,
      pageNum: pageNumber + 1,
      merchantReference: refNumber,
    };
    setPageNumber(pageNumber + 1);
    dispatch(getInvoisList(data, navigation));
  };

  const addItem = () => {
    navigation.navigate('AddInvoice');
  };

  const renderFooter = () => {
    if (!refreshing) {
      return <ActivityIndicator size="large" />;
    } else {
      return null;
    }
  };

  const navigateTo = params => {
    navigation.navigate('ViewInvoice', {data: params});
  };
  const globalSearch = searchInput => {
    if (searchInput.trim().length === 0) {
      updateInvoiceList(invoicesList);
    } else {
      let filteredData = invoicesList.filter(value => {
        return (
          value.invoiceId.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.currency.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.totalAmount.toString().includes(searchInput) ||
          value.balanceAmount.toString().includes(searchInput) ||
          value.totalTax.toString().includes(searchInput) ||
          value.dueDate.toLowerCase().includes(searchInput.toLowerCase()) ||
          value.transactionDate
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        );
      });

      updateInvoiceList(filteredData);
    }
  };

  return (
    <>
      <View style={globalStyle.conatiner}>
        <Searchbar
          placeholder="Search"
          onChangeText={globalSearch}
          style={styles.search}
        />
        {invoiceList && invoiceList.length > 0 && (
          <View style={globalStyle.scrollContainer}>
            <FlatList
              data={invoiceList}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'handled'}
              renderItem={({item}) => (
                <InvoiceCard navigate={data => navigateTo(data)} data={item} />
              )}
              keyExtractor={(item, index) => item.invoiceId}
              onEndReached={() => {
                if (
                  listPaging &&
                  invoiceList.length < listPaging.totalRecords
                ) {
                  fetchInvoices();
                }
              }}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
              // refreshing={refreshing}
            />
          </View>
        )}

        <FAB
          icon="plus"
          style={{
            position: 'absolute',
            bottom: 10,
            right: 16,
            backgroundColor: Colors.Red,
          }}
          onPress={addItem}
          color="white"
        />
      </View>
    </>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  smText: {
    fontSize: 15,
    marginTop: -20,
    marginBottom: 10,
    fontWeight: '100',
    color: Colors.Black,
  },
  lgText: {
    fontSize: 35,
    fontWeight: '700',
    color: Colors.Black,
  },
  search: {
    marginBottom: 10,
  },
  conatiner: {
    backgroundColor: 'red',
    width: width,
    height: height,
  },
});
