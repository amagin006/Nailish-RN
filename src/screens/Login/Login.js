import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Button,
  Image,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Firebase from '../../config/Firebase';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassward] = useState('');
  const [emailPassError, setEmaiPassError] = useState(false);

  const _onPressLogin = () => {
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('login');
        props.navigation.navigate('CustomerListHome');
      })
      .catch(error => {
        console.log('Error signInWithEmailAndPassword: ', error);
        setEmaiPassError(true);
      });
  };

  const _onPressSignup = () => {
    props.navigation.navigate('SignUp');
  };

  const borderColor = emailPassError ? { borderColor: '#d61d00' } : { borderColor: '#ccc' };
  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.contentWrapper}>
        <Image style={styles.logoImage} source={require('../../../assets/images/logo1.png')} />
        {emailPassError && <Text style={styles.errorText}>Email or Password is wrong.</Text>}
        <View style={[styles.inputTextBox, borderColor]}>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder={'Enter your email'}
            onFocus={() => setEmaiPassError(false)}
          />
        </View>
        <View style={[styles.inputTextBox, borderColor]}>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={text => setPassward(text)}
            placeholder={'Enter your password'}
            onFocus={() => setEmaiPassError(false)}
          />
          <Ionicons style={styles.eyeIcon} name={password ? 'md-eye-off' : 'md-eye'} size={26} />
        </View>
        <Button title={'goHome'} onPress={_onPressLogin} />
        <Button title={'goSignUp'} onPress={_onPressSignup} />
      </KeyboardAvoidingView>
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
  contentWrapper: {
    width: '80%',
  },
  logoImage: {
    alignSelf: 'center',
    width: width / 1.5,
    height: width / 1.5,
    marginBottom: 80,
  },
  inputTextBox: {
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },
  errorText: {
    color: '#d61d00',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  eyeIcon: {
    paddingTop: 3,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
