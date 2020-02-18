import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ReportMenuList = ({ menuList }) => {
  return (
    <View style={styles.menuWrapper}>
      <Text style={styles.leftColumn}>Menu</Text>
      <View style={styles.rightColumn}>
        {menuList.map((menuItem, index) => {
          return (
            <View style={styles.menuItemRow} key={index}>
              <View style={[styles.menuItemBg, { backgroundColor: `${menuItem.bgcolor}` }]}>
                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.menuItemText}>
                  {menuItem.menuItem}
                </Text>
              </View>
              <Text style={styles.price}>$ {menuItem.price}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

ReportMenuList.propTypes = { menuList: PropTypes.array };

const styles = StyleSheet.create({
  menuWrapper: {
    marginHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  menuItemRow: {
    marginBottom: 10,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemBg: {
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  price: {
    fontSize: 16,
    width: 80,
    textAlign: 'right',
  },
  leftColumn: {
    width: '20%',
  },
  rightColumn: {
    width: '50%',
  },
});

export default ReportMenuList;
