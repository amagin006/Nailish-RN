import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Button, Image, TextInput } from 'react-native';
import Firebase from '../../config/Firebase';
import PropTypes from 'prop-types';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassward] = useState('');

  const _onPressLogin = () => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('login');
        props.navigation.navigate('CustomerListHome');
      })
      .catch(error => console.log(error));
  };

  const _onPressSignup = () => {
    props.navigation.navigate('SignUp');
  };

  return (
    <View style={styles.wrapper}>
      <Image style={styles.logoImage} source={require('../../../assets/images/logo1.png')} />
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder={'Enter your email'}
        style={styles.inputTextBox}
      />
      <TextInput
        value={password}
        onChangeText={text => setPassward(text)}
        placeholder={'Enter your password'}
        style={styles.inputTextBox}
      />
      <Button title={'goHome'} onPress={_onPressLogin} />
      <Button title={'goSignUp'} onPress={_onPressSignup} />
    </View>
  );
};

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: width / 1.5,
    height: width / 1.5,
    marginBottom: 80,
  },
  inputTextBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    padding: 10,
    marginBottom: 20,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
