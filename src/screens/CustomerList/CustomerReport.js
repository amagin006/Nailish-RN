import React from 'react';
import { View, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import SnsButtons from '../../components/snsButton/snsButtons';

const CusomerReport = ({ navigation }) => {
  const user = navigation.state.params;

  const _onAddNewReport = () => {
    console.log('_onAddNewReport');
  };

  return (
    <SafeAreaView>
      <View style={styles.customerInfoBox}>
        <View style={styles.customerIconWrapper}>
          <Image source={{ uri: `${user.userIcon}` }} style={styles.customerIcon} />
        </View>
        <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
        {user.birthDay && (
          <View style={styles.birthDayWrapper}>
            <FontAwesome name={'birthday-cake'} style={styles.birthDayIcon} />
            <Text style={styles.birthDay}>{user.birthDay}</Text>
          </View>
        )}
        <View style={styles.snsCenterBox}>
          <SnsButtons user={user} />
        </View>
        <TouchableOpacity style={styles.newReportButton} onPress={_onAddNewReport}>
          <FontAwesome name={'file-text-o'} style={styles.newReportIcon} />
          <Text style={styles.newReportText}>New Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

CusomerReport.propTypes = { navigation: PropTypes.object };

const styles = StyleSheet.create({
  customerInfoBox: {
    marginHorizontal: '2%',
    marginTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  customerIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: -60,
  },
  name: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  birthDayWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10,
  },
  birthDayIcon: {
    color: '#666666',
    fontSize: 16,
  },
  birthDay: {
    marginLeft: 8,
    fontSize: 13,
    color: '#666666',
  },
  snsCenterBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  newReportButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#3A9E55',
    borderRadius: 18,
    marginHorizontal: '5%',
    paddingVertical: 8,
  },
  newReportIcon: {
    fontSize: 24,
    color: '#fff',
  },
  newReportText: {
    marginLeft: 20,
    fontSize: 20,
    color: '#fff',
  },
});

export default CusomerReport;

const fakeData = [
  {
    appointmentStart: new Date('2019-02-08 12:00:00'),
    appointmentEnd: new Date('2019-02-08 16:00:00'),
    photo: [
      { url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/nailsample1.jpg' },
      { url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/nailsample2.jpg' },
      { url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/nailsample1.jpg' },
      { url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/nailsample2.jpg' },
    ],
    menu: [
      { menuItem: 'jel', price: '20', bgcolor: '#FF9F9F' },
      { menuItem: 'off', price: '30', bgcolor: '#FF9F9F' },
      { menuItem: 'Design', price: '40', bgcolor: '#FF9F9F' },
    ],
  },
  {
    appointmentStart: new Date('2019-02-08 12:00:00'),
    appointmentEnd: new Date('2019-02-08 16:00:00'),
    photo: [
      { url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/nailsample1.jpg' },
      { url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/nailsample2.jpg' },
      { url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/nailsample1.jpg' },
      { url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/nailsample2.jpg' },
    ],
    menu: [
      { menuItem: 'jel', price: '20', bgcolor: '#FF9F9F' },
      { menuItem: 'off', price: '30', bgcolor: '#FF9F9F' },
      { menuItem: 'Design', price: '40', bgcolor: '#FF9F9F' },
    ],
  },
  {
    appointmentStart: new Date('2019-02-08 12:00:00'),
    appointmentEnd: new Date('2019-02-08 16:00:00'),
    photo: [
      { url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/nailsample1.jpg' },
      { url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/nailsample2.jpg' },
      { url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/nailsample1.jpg' },
      { url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/nailsample2.jpg' },
    ],
    menu: [
      { menuItem: 'jel', price: '20', bgcolor: '#FF9F9F' },
      { menuItem: 'off', price: '30', bgcolor: '#FF9F9F' },
      { menuItem: 'Design', price: '40', bgcolor: '#FF9F9F' },
    ],
  },
];
