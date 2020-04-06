import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import Button from '../../components/button/button';
import ReportMenuList from '../../components/reportDetail/reportMenuList';
import commonStyles from '../../components/styles/commonStyles';

const EditAppointment = ({ navigation }) => {
  const [memo, setMemo] = useState();

  const { item } = navigation.state.params;
  console.log('userIcon', item);

  const _onPressSelectClient = () => {
    console.log('_onPressSelectClient');
  };

  const _onPressSelectMenu = () => {};
  const _onChageMemo = () => {};

  return (
    <ScrollView>
      <View style={commonStyles.bodyWrapper}>
        <TouchableOpacity style={styles.card} onPress={_onPressSelectClient}>
          <Image source={{ uri: `${item.user.userIcon}` }} style={styles.userIcon} />
          <Text style={styles.selectClientText}>Select Client</Text>
        </TouchableOpacity>
        <View style={styles.dateBlock}>
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
        </View>
        <Button onPress={_onPressSelectMenu} text={'Select Menu'} style={styles.selectButton} />
        <ReportMenuList menuList={FAKE_MENU} />
        <View style={styles.memo}>
          <Text style={commonStyles.leftColumn}>Memo</Text>
          <TextInput multiline style={styles.memoInput} onChangeText={_onChageMemo} value={memo} />
        </View>
      </View>
    </ScrollView>
  );
};

EditAppointment.propTypes = { navigation: PropTypes.object };

const FAKE_MENU = [
  { menuItem: 'jel', price: '20', bgcolor: '#FF9F9F' },
  { menuItem: 'off', price: '30', bgcolor: '#87D1AA' },
  { menuItem: 'Design', price: '40', bgcolor: '#AC71D1' },
];

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: '4%',
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#e6e6e6',
    borderLeftColor: '#17906F',
    borderLeftWidth: 3,
  },
  userIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  selectClientText: {
    fontSize: 18,
  },
  columnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginVertical: 12,
  },
  dateBlock: {
    marginVertical: 24,
  },
  textInput: {
    width: 200,
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

export default EditAppointment;
