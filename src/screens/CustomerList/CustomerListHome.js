/* eslint-disable react/display-name */
import React from 'react';
import {
  SectionList,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const CustomerListHome = ({ navigation }) => {
  const _itemSeparator = () => <View style={styles.separator} />;
  const _keyExtractor = item => item.id;

  const _renderItem = ({ item }) => {
    _renderItem.propTypes = { item: PropTypes.object };

    const _onPressCard = item => {
      if (navigation.state.params && navigation.state.params.selectClient) {
        navigation.state.params.selectClient(item);
        navigation.goBack();
      } else {
        navigation.navigate('CustomerReport', item);
      }
    };

    return (
      <TouchableOpacity style={styles.card} onPress={() => _onPressCard(item)}>
        <Image source={{ uri: `${item.userIcon}` }} style={styles.userIcon} />
        <View style={styles.customerInfo}>
          <Text style={styles.name}>{`${item.firstName} ${item.lastName}`}</Text>
          <Text style={styles.lastVisit}>{`${item.lastVisit}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderSectionHeader = ({ section: data }) => {
    _renderSectionHeader.propTypes = { section: PropTypes.object.isRequired };

    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{data.initial}</Text>
      </View>
    );
  };

  const _onAddButton = () => {
    navigation.navigate('CustomerEdit');
  };

  return (
    <SafeAreaView style={styles.sectionList}>
      <SectionList
        sections={DATA}
        keyExtractor={_keyExtractor}
        renderSectionHeader={_renderSectionHeader}
        renderItem={_renderItem}
        ItemSeparatorComponent={_itemSeparator}
      />
      <TouchableOpacity style={styles.addButton} onPress={_onAddButton}>
        <FontAwesome style={styles.addIcon} name={'plus'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

CustomerListHome.navigationOptions = () => ({
  title: 'Customer',
});

CustomerListHome.propTypes = { navigation: PropTypes.object };

const styles = StyleSheet.create({
  sectionList: {
    flex: 1,
  },
  sectionHeader: {
    backgroundColor: '#fff',
  },
  sectionHeaderText: {
    fontSize: 16,
    color: '#676767',
    paddingHorizontal: '8%',
    paddingVertical: 10,
  },
  card: {
    paddingHorizontal: '12%',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  separator: {
    backgroundColor: '#E2E8ED',
    height: 1,
  },
  userIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    color: '#4C5264',
    fontSize: 16,
    marginVertical: 6,
  },
  lastVisit: {
    color: '#BCC5D3',
    fontSize: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    paddingTop: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#D9534F',
  },
  addIcon: {
    fontSize: 36,
    color: '#fff',
  },
});

export default CustomerListHome;

const DATA = [
  {
    initial: 'A',
    data: [
      {
        id: 1,
        firstName: 'Assuly',
        lastName: 'Henry',
        userIcon: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/01.jpg',
        lastVisit: '2020/01/02',
        nameInitial: 'A',
      },
    ],
  },
  {
    initial: 'B',
    data: [
      {
        id: 2,
        firstName: 'Bob',
        lastName: 'Jddkjk',
        userIcon: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/02.jpg',
        lastVisit: '2020/01/02',
        nameInitial: 'B',
      },
    ],
  },
  {
    initial: 'C',
    data: [
      {
        id: 3,
        firstName: 'Cio',
        lastName: 'YYYdhhdk',
        userIcon: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/03.jpg',
        lastVisit: '2020/01/04',
        birthDay: '2001/02/20',
        tel: '778-999-0202',
        nameInitial: 'C',
      },
    ],
  },
  {
    initial: 'F',
    data: [
      {
        id: 4,
        firstName: 'Facn',
        lastName: 'Udjkd',
        userIcon: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/04.jpg',
        lastVisit: '2020/01/04',
        nameInitial: 'F',
      },
    ],
  },
  {
    initial: 'H',
    data: [
      {
        id: 5,
        firstName: 'Hejkdk',
        lastName: 'Kdjeijf',
        userIcon: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/05.jpg',
        lastVisit: '2020/01/04',
        nameInitial: 'H',
      },
      {
        id: 6,
        firstName: 'Huenvf',
        lastName: 'Wdjkdj',
        userIcon: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/06.jpg',
        lastVisit: '2020/01/04',
        nameInitial: 'H',
      },
    ],
  },
  {
    initial: 'T',
    data: [
      {
        id: 7,
        firstName: 'Tjkdd',
        lastName: 'Ydhjds',
        userIcon: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/07.jpg',
        lastVisit: '2020/01/12',
        nameInitial: 'T',
      },
    ],
  },
];
