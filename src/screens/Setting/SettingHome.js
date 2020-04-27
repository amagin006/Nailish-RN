import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { userLogout } from '../../redux/actions/auth';

const SettingHome = props => {
  const dispatch = useDispatch();
  const reduxState = useSelector(state => state);

  useEffect(() => {
    if (!reduxState.auth?.isLogin) {
      props.navigation.navigate('Login');
    }
  }, [reduxState.auth?.isLogin]);

  const _onLogout = () => {
    dispatch(userLogout());
  };

  return (
    <SafeAreaView style={styles.sectionList}>
      <Image
        style={styles.logoImage}
        resizeMode={'contain'}
        source={require('../../../assets/images/logo2.png')}
      />
      <View style={styles.section}>
        <TouchableOpacity onPress={_onLogout}>
          <Text style={styles.sectionText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.versionText}>version 1.0.0</Text>
    </SafeAreaView>
  );
};

SettingHome.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  sectionList: {
    flex: 1,
  },
  logoImage: {
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'center',
    height: 80,
  },
  section: {
    marginTop: 40,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: '5%',
  },
  sectionText: {
    fontSize: 16,
    color: '#3e6ced',
    textAlign: 'center',
  },
  versionText: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SettingHome;
