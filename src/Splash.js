import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

const Splash = () => {
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
