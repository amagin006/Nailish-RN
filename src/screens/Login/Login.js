import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { RoundButton } from '../../components/button/button';
import { firebaseAuth } from '../../config/Firebase';
import {
  userLoginWithPass,
  googleLogin,
  createUser,
  failedConfirm,
} from '../../redux/actions/auth';
import commonStyles from '../../components/styles/commonStyles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [forgetEmail, setForgetEmail] = useState('');
  const [password, setPassward] = useState('');
  const [isPasswordInVisible, setIsPasswordInVisible] = useState(true);
  const [emailPassError, setEmaiPassError] = useState(false);
  const [forgetEmailError, setForgetEmailError] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isForgetModalVisible, setIsForgetModalVisible] = useState(false);
  const [isSendSuccess, setIsSendSuccess] = useState(false);
  const [isSendLoading, setIsSendLoading] = useState(false);
  const [createFailedMessage, setCreateFailedMessage] = useState('');
  const [loginFailedMessage, setLoginFailedMessage] = useState('');

  const dispatch = useDispatch();
  const reduxState = useSelector(state => state);

  useEffect(() => {
    const { auth } = reduxState;
    if (auth.createFailedMessage) {
      setCreateFailedMessage(auth.createFailedMessage);
    } else {
      setCreateFailedMessage('');
    }
    if (auth.loginFailedMessage) {
      setLoginFailedMessage(auth.loginFailedMessage);
    } else {
      setLoginFailedMessage('');
    }
  }, [reduxState.auth]);

  const _onLoginWithEmail = () => {
    if (email && password) {
      dispatch(userLoginWithPass(email, password));
    } else {
      setEmaiPassError(true);
    }
  };

  const _googleLogin = () => {
    dispatch(googleLogin());
  };

  const _onCreateUser = () => {
    dispatch(createUser(email, password));
  };

  const _onSignup = () => {
    setIsSignup(true);
  };

  const _onResetPassword = async () => {
    setIsSendLoading(true);
    try {
      await firebaseAuth.sendPasswordResetEmail(forgetEmail);
      setForgetEmail('');
      setIsSendSuccess(true);
    } catch (error) {
      console.log('Error forgetPassword send email: ', error);
      setForgetEmailError(true);
    }
    setIsSendLoading(false);
  };

  const _onResetCancel = () => {
    setIsForgetModalVisible(false);
    setForgetEmailError(false);
    setForgetEmail('');
  };

  const borderColor =
    emailPassError || forgetEmailError ? { borderColor: '#d61d00' } : { borderColor: '#ccc' };

  return (
    <SafeAreaView style={styles.wrapper}>
      {reduxState.auth.isLoadingLogin ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#9c9c9c" />
        </View>
      ) : (
        <>
          {isForgetModalVisible ? (
            <Modal
              animationType="fade"
              transparent={true}
              visible={isForgetModalVisible}
              onRequestClose={() => setIsForgetModalVisible(false)}>
              <View style={styles.modalBack}>
                <View style={styles.modalInner}>
                  {isSendLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <ActivityIndicator size="large" color="#9c9c9c" />
                    </View>
                  ) : isSendSuccess ? (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16, color: '#32a852', marginBottom: 60 }}>
                        An email has been sent to the address you have provided.{'\n'}Please check
                        your email
                      </Text>
                      <RoundButton
                        onPress={() => {
                          setIsForgetModalVisible(false);
                          setIsSendSuccess(false);
                        }}
                        color={'#96CEB4'}
                        text={'OK'}
                        round
                      />
                    </View>
                  ) : (
                    <>
                      <Text style={styles.modalTitleText}>Reset your password</Text>
                      <Text style={styles.resetPassDiscText}>
                        Enter the email you use for Nailish, and we&apos;ll help you create a new
                        password.
                      </Text>
                      <View style={styles.modalInnerbox}>
                        <View>
                          {forgetEmailError ? (
                            <Text style={styles.errorText}>Email is invalid.</Text>
                          ) : (
                            <View style={styles.space} />
                          )}
                          <View style={[styles.inputTextBox, borderColor]}>
                            <TextInput
                              style={styles.textInput}
                              value={forgetEmail}
                              onChangeText={text => setForgetEmail(text)}
                              placeholder={'Enter your email'}
                              onFocus={() => setForgetEmailError(false)}
                              autoCapitalize={'none'}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={styles.modalButtonBox}>
                        <RoundButton onPress={_onResetPassword} color={'#96CEB4'} text={'Send'} />
                        <RoundButton onPress={_onResetCancel} color={'#ff9999'} text={'Cancel'} />
                      </View>
                    </>
                  )}
                </View>
              </View>
            </Modal>
          ) : createFailedMessage || loginFailedMessage ? (
            <Modal
              animationType="fade"
              transparent={true}
              visible={createFailedMessage || loginFailedMessage ? true : false}
              onRequestClose={() => dispatch(failedConfirm())}>
              <View style={styles.modalBack}>
                <View style={[styles.modalInner, { justifyContent: 'space-around' }]}>
                  <View>
                    <Text style={styles.createFaliedText}>
                      {createFailedMessage || loginFailedMessage}
                    </Text>
                    <Text style={styles.createFaliedText}>Please try again</Text>
                  </View>
                  <RoundButton
                    onPress={() => dispatch(failedConfirm())}
                    color={'#96CEB4'}
                    text={'OK'}
                  />
                </View>
              </View>
            </Modal>
          ) : null}
          <Image
            style={styles.logoImage}
            resizeMode={'contain'}
            source={require('../../../assets/images/logo2.png')}
          />
          <View style={styles.inner}>
            {emailPassError ? (
              <Text style={styles.errorText}>Email or Password is wrong.</Text>
            ) : (
              <View style={styles.space} />
            )}
            <View style={[styles.inputTextBox, borderColor]}>
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder={'Enter your email'}
                onFocus={() => setEmaiPassError(false)}
                autoCapitalize={'none'}
              />
            </View>
            <View style={[styles.inputTextBox, borderColor]}>
              <TextInput
                style={styles.textInput}
                value={password}
                onChangeText={text => setPassward(text)}
                placeholder={'Enter your password'}
                onFocus={() => setEmaiPassError(false)}
                secureTextEntry={isPasswordInVisible}
                autoCapitalize={'none'}
              />
              <TouchableOpacity onPress={() => setIsPasswordInVisible(!isPasswordInVisible)}>
                <Ionicons
                  style={styles.eyeIcon}
                  name={isPasswordInVisible ? 'md-eye-off' : 'md-eye'}
                  size={26}
                />
              </TouchableOpacity>
            </View>
            {isSignup ? (
              <RoundButton onPress={_onCreateUser} color={'#2482bd'} text={'Create Account'} />
            ) : (
              <>
                <TouchableOpacity
                  style={styles.forgetButton}
                  onPress={() => setIsForgetModalVisible(true)}>
                  <Text style={styles.forgetText}>Forget password?</Text>
                </TouchableOpacity>
                <RoundButton onPress={_onLoginWithEmail} color={'#96CEB4'} text={'Login'} />
              </>
            )}
            <View style={styles.border} />
            <TouchableOpacity style={styles.googleSingButton} onPress={_googleLogin}>
              <Image
                style={styles.googleImage}
                resizeMode={'contain'}
                source={require('../../../assets/images/google_signin_btn.png')}
              />
            </TouchableOpacity>
            <View style={styles.signUpBox}>
              <Text style={styles.signUpleftText}>
                {isSignup ? 'Already have account?' : "Don't have an account?"}
              </Text>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={isSignup ? () => setIsSignup(false) : _onSignup}>
                <Text style={styles.signUpButtonText}>{isSignup ? 'Sign in' : 'Sign up'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  inner: {
    width: '80%',
    marginTop: 30,
  },
  logoImage: {
    alignSelf: 'center',
    height: 80,
    marginTop: '18%',
  },
  inputTextBox: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 5 : 0,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingVertical: 8,
  },
  errorText: {
    color: '#d61d00',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  space: {
    marginBottom: Platform.OS === 'ios' ? 25 : 27,
  },
  eyeIcon: {
    paddingTop: 3,
  },
  forgetButton: {
    alignSelf: 'center',
    marginBottom: 6,
    borderBottomColor: '#424242',
    borderBottomWidth: 1,
  },
  forgetText: {
    color: '#424242',
    paddingBottom: 3,
  },
  signButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#96CEB4',
    marginTop: 10,
    borderRadius: 18,
    marginHorizontal: 20,
  },
  createButton: {
    backgroundColor: '#2482bd',
  },
  singButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  border: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cfcfcf',
  },
  googleSingButton: {
    width: '48%',
    marginTop: -20,
    alignSelf: 'center',
  },
  googleImage: {
    width: '100%',
  },
  signUpButton: {
    alignSelf: 'center',
    borderBottomColor: '#344dd9',
    borderBottomWidth: 1,
  },
  signUpBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpleftText: {
    color: '#7d7d7d',
    marginRight: 6,
  },
  signUpButtonText: {
    color: '#344dd9',
  },
  modalBack: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInner: {
    backgroundColor: '#fff',
    width: '90%',
    height: '60%',
    paddingHorizontal: '5%',
    borderRadius: 20,
  },
  modalTitleText: {
    fontSize: 26,
    color: commonStyles.baseTextColor,
    marginVertical: 30,
  },
  modalInnerbox: {
    flex: 1,
    justifyContent: 'space-around',
  },
  resetPassDiscText: {
    color: commonStyles.baseTextColor,
  },
  modalButtonBox: {
    marginBottom: 40,
  },
  modalCancelButton: {
    backgroundColor: '#ff9999',
    marginTop: 20,
  },
  createFaliedText: {
    fontSize: 18,
    marginBottom: 10,
    color: commonStyles.baseTextColor,
    textAlign: 'center',
  },
});

export default Login;
