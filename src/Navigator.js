/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Foundation, MaterialCommunityIcons } from '@expo/vector-icons';

import Splash from './Splash';
import CustomerListHome from './screens/CustomerList/CustomerListHome';
import CustomerReport from './screens/CustomerList/CustomerReport';
import CustomerEdit from './screens/CustomerList/CustomerEdit';
import ReportDetail from './screens/CustomerList/ReportDetail';
import ReportEdit from './screens/CustomerList/ReportEdit';
import CalenderHome from './screens/Calender/CalenderHome';
import EditAppointment from './screens/Calender/EditAppointment';
import Login from './screens/Login/Login';

const CustomerListStack = createStackNavigator(
  {
    CustomerListHome: {
      screen: CustomerListHome,
    },
    CustomerReport: {
      screen: CustomerReport,
    },
    CustomerEdit: {
      screen: CustomerEdit,
    },
    ReportDetail: {
      screen: ReportDetail,
    },
    ReportEdit: {
      screen: ReportEdit,
    },
  },
  {
    initialRouteName: 'CustomerListHome',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#D9534F',
      },
      headerBackTitleVisible: false,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const CalenderStack = createStackNavigator(
  {
    CalenderHome: {
      screen: CalenderHome,
    },
    EditAppointment: {
      screen: EditAppointment,
    },
    CustomerListHome: {
      screen: CustomerListHome,
    },
  },
  {
    initialRouteName: 'CalenderHome',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#D9534F',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const LoginRoute = {
  Login: {
    screen: Login,
  },
};

const LoginSignupNavigator = createStackNavigator(LoginRoute, {
  initialRouteName: 'Login',
  headerMode: 'none',
});

const BottomTabRoutes = {
  CustomerListStack: {
    screen: CustomerListStack,
    navigationOptions: {
      title: 'Customer',
      tabBarIcon: ({ tintColor }) => (
        <Foundation style={{ marginTop: 4, color: tintColor }} name="torsos-all" size={28} />
      ),
    },
  },
  CalenderStack: {
    screen: CalenderStack,
    navigationOptions: {
      title: 'Calender',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name="calendar-clock"
          style={{ marginTop: 8, color: tintColor }}
          size={24}
          color="gray"
        />
      ),
    },
  },
};

const BottomTabNavigator = createBottomTabNavigator(BottomTabRoutes, {
  initialRouteName: 'CustomerListStack',
  tabBarOptions: {
    activeTintColor: '#eb6e3d',
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Splash: Splash,
      LoginSignup: LoginSignupNavigator,
      Main: BottomTabNavigator,
    },
    {
      initialRouteName: 'Splash',
    },
  ),
);
