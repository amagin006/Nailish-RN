import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';

function dateFormatte(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;
}

var nextDay = [
  '2020-03-01',
  '2020-03-05',
  '2020-03-08',
  '2020-03-07',
  '2020-03-18',
  '2020-03-17',
  '2020-03-28',
  '2020-03-29',
];

function makeMarked(appointDates) {
  const markedApp = appointDates.reduce(
    (c, v) =>
      Object.assign(c, {
        [v]: {
          dots: [
            { key: 'hello', color: 'red', selectedDotColor: 'red' },
            { key: 'massage', color: 'blue', selectedDotColor: 'red' },
          ],
          marked: true,
        },
      }),
    {},
  );
  return markedApp;
}

function getWeeksInMonth(year, month_number) {
  var firstOfMonth = new Date(year, month_number - 1, 1);
  var lastOfMonth = new Date(year, month_number, 0);

  var used = firstOfMonth.getDay() + lastOfMonth.getDate();

  return Math.ceil(used / 7);
}

const CalenderHome = ({ navigation }) => {
  const today = dateFormatte(new Date());
  const [selectedDay, setSelectedDay] = useState(today);
  const [markedDates, setMarkedDates] = useState({});
  const [weeks, setWeeks] = useState();

  useEffect(() => {
    const markedAppointment = makeMarked(nextDay);
    markedAppointment[selectedDay] = { selected: true, disableTouchEvent: true };
    setMarkedDates(markedAppointment);
    navigation.setParams({ onSavePress: _addCustomerReport });
  }, [selectedDay]);

  const _addCustomerReport = () => {
    console.log('addCustomerReport');
    navigation.navigate('EditAppointment');
  };

  const _selectedDate = day => {
    console.log('selectedDate', day);
    setSelectedDay(day.dateString);
  };

  const _swipeMonth = months => {
    const numberOfWeeks = getWeeksInMonth(
      months[months.length - 1].year,
      months[months.length - 1].month,
    );
    setWeeks(numberOfWeeks);
  };

  const _onPressList = item => {
    navigation.navigate('EditAppointment', { item: item });
  };

  const _renderFlatListItem = listItem => {
    const { item } = listItem;
    return (
      <TouchableOpacity onPress={() => _onPressList(item)} style={styles.listItemWrapper}>
        <Image source={{ uri: `${item.user.userIcon}` }} style={styles.userIcon} />
        <View style={styles.textWrapper}>
          <Text style={styles.name}>{`${item.user.firstName} ${item.user.lastName}`}</Text>
          <Text style={styles.time}>{`${item.appointmentStart} ~ ${item.appointmentEnd}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // console.log('appointmentDot', appointmentDot);
  console.log('markedDates', markedDates);
  const height = weeks === 5 ? { height: 300 } : { height: 340 };
  return (
    <View style={{ flex: 1 }}>
      <CalendarList
        onDayPress={_selectedDate}
        horizontal={true}
        markingType={'multi-dot'}
        pagingEnabled={true}
        hideExtraDays={false}
        markedDates={markedDates}
        onVisibleMonthsChange={_swipeMonth}
        style={height}
        theme={{
          'stylesheet.calendar.header': {
            week: {
              marginTop: 0,
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
            header: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 0,
              alignItems: 'center',
            },
          },
        }}
      />
      <FlatList
        data={FAKEDATA}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => `${item.id}`}
        renderItem={_renderFlatListItem}
      />
    </View>
  );
};

CalenderHome.propTypes = { navigation: PropTypes.object };

CalenderHome.navigationOptions = screenProps => {
  return {
    headerRight: function headerRight() {
      return (
        <TouchableOpacity
          onPress={screenProps.navigation.getParam('onSavePress')}
          style={styles.headerRightSave}>
          <Feather name="plus" size={32} color="#fff" />
        </TouchableOpacity>
      );
    },
  };
};

const styles = StyleSheet.create({
  headerRightSave: {
    marginRight: 14,
  },
  listItemWrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  textWrapper: {
    marginLeft: 20,
  },
  userIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 16,
  },
  time: {
    fontSize: 14,
    color: '#b0b0b0',
    marginTop: 5,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#e6e6e6',
  },
});

export default CalenderHome;

const FAKEDATA = [
  {
    id: '1',
    appointmentDate: '2020-03-12',
    appointmentStart: '18:00',
    appointmentEnd: '20:00',
    user: {
      id: 1,
      firstName: 'Assuly',
      lastName: 'Henry',
      userIcon: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/01.jpg',
      lastVisit: '2020/01/02',
      nameInitial: 'A',
    },
  },
  {
    id: '2',
    appointmentDate: '2020-03-29',
    appointmentStart: '18:00',
    appointmentEnd: '20:00',
    user: {
      id: 1,
      firstName: 'Assuly',
      lastName: 'Henry',
      userIcon: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/01.jpg',
      lastVisit: '2020/01/02',
      nameInitial: 'A',
    },
  },
  {
    id: '3',
    appointmentDate: '2020-03-12',
    appointmentStart: '18:00',
    appointmentEnd: '20:00',
    user: {
      id: 2,
      firstName: 'Bob',
      lastName: 'Jddkjk',
      userIcon: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/02.jpg',
      lastVisit: '2020/01/02',
      nameInitial: 'B',
    },
  },
  {
    id: '4',
    appointmentDate: '2020-04-12',
    appointmentStart: '18:00',
    appointmentEnd: '20:00',
    user: {
      id: 2,
      firstName: 'Bob',
      lastName: 'Jddkjk',
      userIcon: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/02.jpg',
      lastVisit: '2020/01/02',
      nameInitial: 'B',
    },
  },

  {
    id: '5',
    appointmentDate: '2020-03-12',
    appointmentStart: '18:00',
    appointmentEnd: '20:00',
    user: {
      id: 2,
      firstName: 'Cio',
      lastName: 'YYYdhhdk',
      userIcon: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/03.jpg',
      lastVisit: '2020/01/04',
      birthDay: '2001/02/20',
      tel: '778-999-0202',
      nameInitial: 'C',
    },
  },
  {
    id: '6',
    appointmentDate: '2020-03-02',
    appointmentStart: '18:00',
    appointmentEnd: '20:00',
    user: {
      id: 2,
      firstName: 'Cio',
      lastName: 'YYYdhhdk',
      userIcon: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/03.jpg',
      lastVisit: '2020/01/04',
      birthDay: '2001/02/20',
      tel: '778-999-0202',
      nameInitial: 'C',
    },
  },
];
