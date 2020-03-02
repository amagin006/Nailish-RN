import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Button = ({ style, color, text, deleteButton, onPress }) => {
  const buttonColor = deleteButton
    ? styles.deleteColor
    : color
    ? { backgroundColor: `${color}` }
    : styles.defaltColor;
  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress} style={[styles.buttonWrapper, buttonColor]}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

Button.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
  color: PropTypes.string,
  deleteButton: PropTypes.bool,
  onPress: PropTypes.func,
};

Button.defaltProps = {
  deleteButton: false,
};

const styles = StyleSheet.create({
  buttonWrapper: {
    marginVertical: 10,
    borderRadius: 10,
  },
  defaltColor: {
    backgroundColor: '#36a4e3',
  },
  deleteColor: {
    backgroundColor: '#de1421',
  },
  text: {
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Button;
