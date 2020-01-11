import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

const Login = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>
      <Button title={'goHome'} onPress={() => props.navigation.navigate('CustomerListHome')} />
      <Button title={'goSignUp'} onPress={() => props.navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
