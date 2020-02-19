import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import commonStyles from '../../components/styles/commonStyles';
import PagenationDot from '../../components/pagenation/pagenationDot';
import ReportMenuList from '../../components/reportDetail/reportMenuList';
import PriceDetail from '../../components/reportDetail/priceDetail';
import Button from '../../components/button/button';

const ReportDetail = ({ navigation }) => {
  const { user, item } = navigation.state.params;
  const date = moment(item.item.appointmentStart).format('YYYY/MM/DD');
  const startTime = moment(item.item.appointmentStart).format('HH:mm');
  const endTime = moment(item.item.appointmentEnd).format('HH:mm');

  const [viewableItemIndex, setViewableItemIndex] = useState(0);

  const _renderPhoto = item => <Image source={{ uri: `${item.item.url}` }} style={styles.photo} />;
  const _keyExtractor = item => `${item.id}`;

  const _onDeletePress = () => {
    console.log('========+++++++========');
  };

  const onViewRef = React.useRef(({ viewableItems }) => {
    setViewableItemIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.userWrapper}>
          <Image source={{ uri: `${user.userIcon}` }} style={styles.userIcon} />
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
            <Text style={styles.date}>{`${date} ${startTime} ~ ${endTime}`}</Text>
          </View>
        </View>
        <FlatList
          data={item.item.photo}
          horizontal={true}
          renderItem={_renderPhoto}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={_keyExtractor}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
        <PagenationDot
          style={styles.pagenationDotStyle}
          foucsItemIndex={viewableItemIndex}
          list={item.item.photo}
        />
        <View style={commonStyles.bodyWrapper}>
          <ReportMenuList menuList={item.item.menu} />
          <PriceDetail menuList={item.item.menu} />
          <Button
            onPress={_onDeletePress}
            text="delete"
            deleteButton={true}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

ReportDetail.propTypes = { navigation: PropTypes.object };

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
  pagenationDotStyle: {
    marginVertical: 20,
  },
  button: {
    marginVertical: 30,
  },
});

export default ReportDetail;
