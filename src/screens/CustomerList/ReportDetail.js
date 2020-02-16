import React from 'react';
import { View, Text, ScrollView, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

import moment from 'moment';

const ReportDetail = ({ navigation }) => {
  const { user, item } = navigation.state.params;
  const date = moment(item.item.appointmentStart).format('YYYY/MM/DD');
  const startTime = moment(item.item.appointmentStart).format('HH:mm');
  const endTime = moment(item.item.appointmentEnd).format('HH:mm');

  const _renderPhoto = item => <Image source={{ uri: `${item.item.url}` }} style={styles.photo} />;
  const _keyExtractor = item => item.id;

  return (
    <ScrollView>
      <View style={styles.userWrapper}>
        <Image source={{ uri: `${user.userIcon}` }} style={styles.userIcon} />
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
          <Text style={styles.date}>{`${date} ${startTime} ~ ${endTime}`}</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={item.item.photo}
          horizontal={true}
          renderItem={_renderPhoto}
          keyExtractor={_keyExtractor}
        />
      </View>
    </ScrollView>
  );
};

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userWrapper: {
    flexDirection: 'row',
    marginHorizontal: '3%',
    marginVertical: 8,
  },
  nameWrapper: {
    marginLeft: 20,
  },
  name: {
    paddingVertical: 6,
    fontWeight: 'bold',
  },
  date: {
    color: '#9c9c9c',
  },
  photo: {
    width: width,
    height: width,
  },
});

export default ReportDetail;
