import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

import commonStyles from '../../components/styles/commonStyles';
import Button from '../../components/button/button';

const ReportEdit = ({ navigation }) => {
  const [mainPhoto, setMainPhoto] = useState(
    'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/imagePlaceholder.png',
  );
  const [selectedPhoto, setSelectedPhoto] = useState(defaultPhotos);

  function onPressSubImage(index) {
    console.log('onPressitem', index);
  }

  const _onPressSelectMenu = () => {
    console.log('onPressSelectMenu');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Image source={{ uri: `${mainPhoto}` }} style={styles.mainPhoto} />
        <View style={styles.subImageWrapper}>
          {selectedPhoto.map((photo, index) => {
            return (
              <TouchableOpacity
                onPress={() => onPressSubImage(index)}
                key={`${index}`}
                style={styles.subImageBox}>
                <Image source={{ uri: `${photo.url}` }} style={styles.subImage} />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={commonStyles.bodyWrapper}>
          <View style={styles.columnWrapper}>
            <Text style={commonStyles.leftColumn}>Visit Date</Text>
            <TextInput style={styles.textInput} />
          </View>
          <View style={styles.columnWrapper}>
            <Text style={commonStyles.leftColumn}>Start Time</Text>
            <TextInput style={styles.textInput} />
          </View>
          <View style={styles.columnWrapper}>
            <Text style={commonStyles.leftColumn}>End Time</Text>
            <TextInput style={styles.textInput} />
          </View>
          <Button onPress={_onPressSelectMenu} text={'Select Menu'} style={styles.selectButton} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

ReportEdit.propTypes = { navigation: PropTypes.object };

const defaultPhotos = [
  {
    id: '1',
    url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/imagePlaceholder.png',
  },
  {
    id: '2',
    url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/imagePlaceholder.png',
  },
  {
    id: '3',
    url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/imagePlaceholder.png',
  },
  {
    id: '4',
    url: 'https://storage.googleapis.com/nailish-firebase.appspot.com/temp/imagePlaceholder.png',
  },
];
const width = Dimensions.get('screen').width;
const subImageSize = width * 0.2;
const styles = StyleSheet.create({
  mainPhoto: {
    width: width,
    height: width,
  },
  subImageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '6%',
    marginBottom: 30,
  },
  subImage: {
    width: subImageSize,
    height: subImageSize,
    backgroundColor: 'red',
    resizeMode: 'contain',
  },
  columnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginVertical: 10,
  },
  textInput: {
    width: 200,
    borderBottomColor: '#9c9c9c',
    borderBottomWidth: 1,
  },
  selectButton: {
    marginVertical: 10,
  },
});

export default ReportEdit;
