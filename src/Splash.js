import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

import firebase from './config/Firebase';

const Splash = props => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user login=================', user);
        props.navigation.navigate('CustomerListHome');
      } else {
        console.log('user logout--------------', user);
        props.navigation.navigate('LoginSignup');
      }
    });
  });

  return (
    <View style={styles.splash}>
      <Image
        style={styles.splashImage}
        resizeMode="contain"
        source={require('../assets/images/splash/splash.png')}
      />
    </View>
  );
};

Splash.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: '100%',
    height: '100%',
  },
});

export default Splash;
