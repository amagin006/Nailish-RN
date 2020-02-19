import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import commonStyles from '../styles/commonStyles';

const ReportMenuList = ({ menuList, style }) => {
  return (
    <View style={style}>
      <View style={commonStyles.menuWrapper}>
        <Text style={commonStyles.leftColumn}>Menu</Text>
        <View style={commonStyles.rightColumn}>
          {menuList.map((menuItem, index) => {
            return (
              <View style={styles.menuItemRow} key={index}>
                <View style={[styles.menuItemBg, { backgroundColor: `${menuItem.bgcolor}` }]}>
                  <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.menuItemText}>
                    {menuItem.menuItem}
                  </Text>
                </View>
                <Text style={commonStyles.price}>$ {menuItem.price}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

ReportMenuList.propTypes = { menuList: PropTypes.array, style: PropTypes.object };

const styles = StyleSheet.create({
  menuItemRow: {
    marginBottom: 8,
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
  leftColumn: {
    width: '20%',
  },
  rightColumn: {
    width: '50%',
  },
});

export default ReportMenuList;
