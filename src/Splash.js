import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const Splash = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('LoginSignup');
    }, 5000);
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#ced99a',
      }}>
      <Text style={{ fontSize: 20 }}>Splash</Text>
    </View>
  );
};

Splash.propTypes = {
  navigation: PropTypes.object,
};

export default Splash;
