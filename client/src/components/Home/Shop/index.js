import {
  View,
  Text,
  FlatList,
  BackHandler,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navbar from '../../Navbar';
import Product from '../Product';
import axios from 'axios';
import {baseURL} from '../../../Services/apiClient';

const Shop = ({navigation}) => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp();
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const {data} = await axios.get(`${baseURL}/product`);
        console.log(data);
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);

  const renderItem = ({item, index}) => {
    return <Product item={item} />;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#141414'}}>
      {Platform.OS === 'ios' && (
        <StatusBar translucent backgroundColor="#5E8D48" />
      )}
      <Navbar navigation={navigation} />
      <View style={{backgroundColor: '#141414', flex: 1, alignItems: 'center'}}>
        <FlatList data={products} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};

export default Shop;
