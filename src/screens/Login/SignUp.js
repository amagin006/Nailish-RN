import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

const SignUp = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>
      <Button title={'goHome'} onPress={() => props.navigation.navigate('CustomerListHome')} />
      <Button title={'goBack'} onPress={() => props.navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({});

SignUp.propTypes = {
  navigation: PropTypes.object,
};

export default SignUp;
