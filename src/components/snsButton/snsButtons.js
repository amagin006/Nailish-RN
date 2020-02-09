import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const snsButtons = ({ user }) => {
  return (
    <View style={styles.snsWrapper}>
      <TouchableOpacity disabled={!user.tel} style={!user.tel && styles.snsIconDisable}>
        <Image
          resizeMode={'contain'}
          style={styles.snsIcon}
          source={require('../../../assets/images/tel2.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity disabled={!user.mail} style={!user.mail && styles.snsIconDisable}>
        <Image
          resizeMode={'contain'}
          style={styles.snsIcon}
          source={require('../../../assets/images/mail4.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity disabled={!user.instagram} style={!user.instagram && styles.snsIconDisable}>
        <Image
          resizeMode={'contain'}
          style={styles.snsIcon}
          source={require('../../../assets/images/instagram2.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity disabled={!user.twitter} style={!user.twitter && styles.snsIconDisable}>
        <Image
          resizeMode={'contain'}
          style={styles.snsIcon}
          source={require('../../../assets/images/twitter.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

snsButtons.propTypes = { user: PropTypes.object };

const styles = StyleSheet.create({
  snsWrapper: {
    width: 165,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  snsIconDisable: {
    opacity: 0.3,
  },
  snsIcon: {
    width: 30,
    height: 30,
  },
});

export default snsButtons;
