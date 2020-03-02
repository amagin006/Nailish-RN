import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';

import ReportMenuList from '../../components/reportDetail/reportMenuList';
import commonStyles from '../../components/styles/commonStyles';
import Button from '../../components/button/button';

const ReportEdit = ({ navigation }) => {
  const [mainPhoto, setMainPhoto] = useState(
    'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/imagePlaceholder.png',
  );
  const [selectedPhoto, setSelectedPhoto] = useState(DEFAULTPHOTOS);
  const [tips, setTips] = useState();
  const [payment, setPayment] = useState();
  const [memo, setMemo] = useState();

  function onPressSubImage(index) {
    console.log('onPressitem', index);
  }

  const _onPressSelectMenu = () => {
    console.log('onPressSelectMenu');
  };

  const _onChangeTips = text => {
    setTips(text);
  };

  const _onChangePayment = item => {
    setPayment(item);
  };

  const _onChageMemo = text => {
    setMemo(text);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Image source={{ uri: `${mainPhoto}` }} style={styles.mainPhoto} />
        <View style={styles.subImageWrapper}>
          {selectedPhoto.map((photo, index) => {
            return (
              <TouchableOpacity
                onPress={() => onPressSubImage(index)}
                key={`${index}`}
                style={styles.subImageBox}>
                <Image source={{ uri: `${photo.url}` }} style={styles.subImage} />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={commonStyles.bodyWrapper}>
          <View style={styles.columnWrapper}>
            <Text style={commonStyles.leftColumn}>Visit Date</Text>
            <TextInput style={styles.textInput} />
          </View>
          <View style={styles.columnWrapper}>
            <Text style={commonStyles.leftColumn}>Start Time</Text>
            <TextInput style={styles.textInput} />
          </View>
          <View style={styles.columnWrapper}>
            <Text style={commonStyles.leftColumn}>End Time</Text>
            <TextInput style={styles.textInput} />
          </View>
          <Button onPress={_onPressSelectMenu} text={'Select Menu'} style={styles.selectButton} />
          <ReportMenuList menuList={FAKE_MENU} />
          <View style={styles.columnWrapper}>
            <Text style={commonStyles.leftColumn}>Tips</Text>
            <View style={styles.tips}>
              <Text style={styles.dollerMark}>$</Text>
              <TextInput
                placeholder="0.00"
                keyboardType={'number-pad'}
                style={styles.tipTextInput}
                value={tips}
                onChangeText={_onChangeTips}
              />
            </View>
          </View>
          <View style={styles.columnWrapper}>
            <Text style={commonStyles.leftColumn}>Payment</Text>
            <RNPickerSelect
              onValueChange={_onChangePayment}
              placeholder={{ label: 'Select Payment', value: null }}
              items={PAYMENT}
              style={pickerStyle}
              value={payment}
            />
          </View>
          <View style={styles.memo}>
            <Text style={commonStyles.leftColumn}>Memo</Text>
            <TextInput
              multiline
              style={styles.memoInput}
              onChangeText={_onChageMemo}
              value={memo}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

ReportEdit.propTypes = { navigation: PropTypes.object };

const DEFAULTPHOTOS = [
  {
    id: '1',
    url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/imagePlaceholder.png',
  },
  {
    id: '2',
    url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/imagePlaceholder.png',
  },
  {
    id: '3',
    url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/imagePlaceholder.png',
  },
  {
    id: '4',
    url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/imagePlaceholder.png',
  },
];

const PAYMENT = [
  { label: 'Credit Card', value: 'creditCard' },
  { label: 'Cash', value: 'cash' },
];

const width = Dimensions.get('screen').width;
const subImageSize = width * 0.2;
const styles = StyleSheet.create({
  mainPhoto: {
    width: width,
    height: width,
  },
  subImageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '6%',
    marginBottom: 30,
  },
  subImage: {
    width: subImageSize,
    height: subImageSize,
    backgroundColor: 'red',
    resizeMode: 'contain',
  },
  columnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginVertical: 10,
  },
  textInput: {
    width: 200,
    borderBottomColor: '#9c9c9c',
    borderBottomWidth: 1,
  },
  selectButton: {
    marginVertical: 10,
  },
  tips: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tipTextInput: {
    width: 100,
    borderBottomColor: '#9c9c9c',
    borderBottomWidth: 1,
    textAlign: 'right',
    fontSize: 16,
  },
  dollerMark: {
    marginRight: 10,
  },
  paymentSelct: {
    width: 130,
    borderBottomColor: '#9c9c9c',
    borderBottomWidth: 1,
  },
  memo: {
    marginVertical: 10,
  },
  memoInput: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#9c9c9c',
    borderRadius: 4,
    height: 200,
    paddingHorizontal: 10,
  },
});

const pickerStyle = {
  inputIOS: {
    width: 110,
    textAlign: 'right',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#9c9c9c',
  },
  inputAndroid: {
    width: 110,
    textAlign: 'right',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#9c9c9c',
  },
};

export default ReportEdit;

const FAKE_MENU = [
  { menuItem: 'jel', price: '20', bgcolor: '#FF9F9F' },
  { menuItem: 'off', price: '30', bgcolor: '#87D1AA' },
  { menuItem: 'Design', price: '40', bgcolor: '#AC71D1' },
];
