/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';

import firebase, { db } from '../../config/Firebase';

const CustomerEdit = props => {
  const { navigation } = props;
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [mail, setMail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [birthday, setBirthDay] = useState('');
  const [memo, setMemo] = useState('');
  const [imageUrl, setImageUrl] = useState();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector(state => state.user);

  useEffect(() => {
    navigation.setParams({ onSavePress: _onSavePress });
  }, [firstName]);

  const _onPressUser = () => {
    _getPermissionCameraRoll();
  };

  const _getPermissionCameraRoll = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    _pickImage();
  };

  const _pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result.uri);
      if (!result.cancelled) {
        setImageUrl(result.uri);
      }
    } catch (err) {
      console.log('Error getImagePicker: ', err);
    }
  };

  const _onSavePress = () => {
    if (!firstName) {
      Alert.alert('Please enter first Name');
      return;
    }
    _upLoadPhoto();
  };

  const _upLoadPhoto = async () => {
    // import ImageResizer from 'react-native-image-resizer';
    // todo: it's better to resize before upload image
    setIsLoading(true);
    const metadata = {
      contentType: 'image/jpeg',
    };
    const storage = firebase.storage();
    const imgURI = imageUrl;
    let blob;
    try {
      const response = await fetch(imgURI);
      console.log('responese', response);
      blob = await response.blob();
    } catch (err) {
      console.log('Error to blob: ', err);
    }
    const uploadRef = storage.ref('user').child(`${user.uid}/profile_image`);
    const uploadTask = uploadRef.put(blob, metadata);
    uploadTask.on(
      'state_changed',
      snapshot => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log('progress');
      },
      err => {
        console.log('Error upload: ', err);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          uploadCustomerData(downloadURL);
          console.log('File available at', downloadURL);
        });
      },
    );
  };

  async function uploadCustomerData(downloadURL) {
    const firstLetter = firstName ? firstName.slice(0, 1) : '#';
    try {
      await db
        .collection('users')
        .doc(`${user.uid}`)
        .collection('customer')
        .add({
          firstLetter,
          firstName,
          lastName,
          birthday,
          mobile,
          mail,
          instagram,
          twitter,
          memo,
          profileImg: downloadURL,
        });
    } catch (err) {
      console.log('Error firebase: ', err);
    }
    props.navigation.pop();
    setIsLoading(true);
  }

  // try {
  // const data = await db
  //   .collection('users')
  //   .doc(state.user.uid)
  //   .collection('customer')
  //   .get();
  //   console.log('data', data);
  //   data.forEach(doc => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });
  // } catch (err) {
  //   console.log('Error firebase: ', err);
  // }

  return (
    <KeyboardAwareScrollView extraScrollHeight={20} enableOnAndroid={true}>
      {isLoading && (
        <Modal animationType="fade" transparent={true} visible={isLoading}>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={'#'} />
          </View>
        </Modal>
      )}
      <View style={styles.userIconHeader}>
        <TouchableOpacity onPress={_onPressUser}>
          <Image
            style={styles.userIconImage}
            source={
              imageUrl ? { uri: `${imageUrl}` } : require('../../../assets/images/person1.png')
            }
          />
          <View style={styles.cameraWrapper}>
            <Foundation style={styles.camera} name={'camera'} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.column}>
        <View style={styles.columnLeft}>
          <Image style={styles.columnIcon} source={require('../../../assets/images/person3.png')} />
          <Text>First Name</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setFirstName(text)}
          value={firstName}
          placeholder="First Name"
        />
      </View>
      <View style={styles.column}>
        <View style={styles.columnLeft}>
          <Text style={styles.lastName}>Last Name</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setLastName(text)}
          value={lastName}
          placeholder="Last Name"
        />
      </View>
      <View style={styles.column}>
        <View style={styles.columnLeft}>
          <Image style={styles.columnIcon} source={require('../../../assets/images/phone1.png')} />
          <Text>Mobile Number</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setMobile(text)}
          keyboardType={'numeric'}
          value={mobile}
          placeholder="000-000-0000"
        />
      </View>
      <View style={styles.column}>
        <View style={styles.columnLeft}>
          <Image style={styles.columnIcon} source={require('../../../assets/images/mail1.png')} />
          <Text>Mail Address</Text>
        </View>
        <TextInput
          style={styles.textInput}
          keyboardType={'email-address'}
          onChangeText={text => setMail(text)}
          value={mail}
          placeholder="example@example.com"
        />
      </View>
      <View style={styles.column}>
        <View style={styles.columnLeft}>
          <Image
            style={styles.columnIcon}
            source={require('../../../assets/images/instagram2.png')}
          />
          <Text>Instagram</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setInstagram(text)}
          value={instagram}
          placeholder="Instagram"
        />
      </View>
      <View style={styles.column}>
        <View style={styles.columnLeft}>
          <Image style={styles.columnIcon} source={require('../../../assets/images/twitter.png')} />
          <Text>Twitter</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setTwitter(text)}
          value={twitter}
          placeholder="Twitter"
        />
      </View>
      <View style={styles.column}>
        <View style={styles.columnLeft}>
          <Image
            style={styles.columnIcon}
            source={require('../../../assets/images/birthday.png')}
          />
          <Text>Birth Day</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setBirthDay(text)}
          value={birthday}
        />
      </View>
      <View style={styles.memo}>
        <Text>Memo</Text>
        <TextInput
          style={styles.memoTextInput}
          onChangeText={text => setMemo(text)}
          multiline
          numberOfLines={2}
          value={memo}
          placeholder="something..."
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

CustomerEdit.propTypes = { navigation: PropTypes.object };

CustomerEdit.navigationOptions = screenProps => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={screenProps.navigation.getParam('onSavePress')}
        style={styles.headerRightSave}>
        <Text style={styles.headerRightText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  headerRightSave: {
    marginRight: 20,
  },
  headerRightText: {
    color: '#fff',
    fontSize: 16,
  },
  userIconHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#FFEEAD',
  },
  userIconImage: {
    width: 180,
    height: 180,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 90,
  },
  cameraWrapper: {
    position: 'absolute',
    bottom: -10,
    right: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
    width: 54,
    height: 54,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#E2E8ED',
  },
  camera: {
    color: '#589fed',
    fontSize: 30,
  },
  column: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 16,
    borderBottomColor: '#E2E8ED',
  },
  columnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 170,
    paddingHorizontal: '4%',
  },
  columnIcon: {
    width: 20,
    height: 20,
    marginRight: 14,
  },
  lastName: {
    marginLeft: 35,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
  },
  memo: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: '4%',
  },
  memoTextInput: {
    flex: 1,
    marginTop: 10,
  },
});

export default CustomerEdit;
