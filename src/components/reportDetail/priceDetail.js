import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import commonStyles from '../../components/styles/commonStyles';

const PriceDetail = ({ menuList, tips }) => {
  const subtotal = menuList
    .map(menuItem => parseInt(menuItem.price))
    .reduce((total, price) => total + price);

  const tipsPrice = tips ? tips : 0;
  const TAX = 0.12;
  const taxTotal = Math.round(subtotal * TAX);
  const total = subtotal + taxTotal + tipsPrice;
  return (
    <>
      <View style={commonStyles.menuWrapper}>
        <Text style={commonStyles.leftColumn}>Subtotal</Text>
        <Text style={commonStyles.price}>{`$ ${subtotal}`}</Text>
      </View>
      <View style={commonStyles.menuWrapper}>
        <Text style={commonStyles.leftColumn}>Tips</Text>
        <Text style={commonStyles.price}>{`$ ${tipsPrice}`}</Text>
      </View>
      <View style={commonStyles.menuWrapper}>
        <Text style={commonStyles.leftColumn}>Tips</Text>
        <Text style={commonStyles.price}>{`$ ${taxTotal}`}</Text>
      </View>
      <View style={[commonStyles.menuWrapper, styles.total]}>
        <Text style={commonStyles.leftColumn}>Total</Text>
        <Text style={commonStyles.price}>{`$ ${total}`}</Text>
      </View>
      <View style={commonStyles.menuWrapper}>
        <Text style={commonStyles.leftColumn}>Payment</Text>
        <Text style={styles.rightText}>Credit card</Text>
      </View>
      <View style={styles.memo}>
        <Text style={styles.memoTitle}>Memo</Text>
        <Text style={styles.memoText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the standard dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived not only five
          centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
      </View>
    </>
  );
};

PriceDetail.propTypes = { menuList: PropTypes.array, tips: PropTypes.number };

const styles = StyleSheet.create({
  total: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#9c9c9c',
  },
  rightText: {
    fontSize: 16,
  },
  memo: {
    marginTop: 10,
  },
  memoTitle: {
    fontSize: 18,
    color: '#9c9c9c',
  },
  memoText: {
    marginTop: 10,
  },
});

export default PriceDetail;
