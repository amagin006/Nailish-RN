import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            { key: 'hello', color: 'red', selectedDotColor: 'blue' },
            { key: 'massage', color: 'red', selectedDotColor: 'blue' },
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

const Calender = () => {
  const today = dateFormatte(new Date());
  const [selectedDay, setSelectedDay] = useState(today);
  const [markedDates, setMarkedDates] = useState({});
  const [weeks, setWeeks] = useState();

  useEffect(() => {
    const markedAppointment = makeMarked(nextDay);
    markedAppointment[selectedDay] = { selected: true, disableTouchEvent: true };
    setMarkedDates(markedAppointment);
  }, [selectedDay]);

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

  const _renderFlatListItem = listItem => {
    const { item } = listItem;
    return (
      <TouchableOpacity style={styles.listItemWrapper}>
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
        keyExtractor={item => `${item.id}`}
        renderItem={_renderFlatListItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // calender: { height: 340 },
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
});

export default Calender;

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
