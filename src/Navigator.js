import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Splash from './Splash';
import CustomerListHome from './screens/CustomerList/CustmerListHome';
import CalenderHome from './screens/Calender/CalenderHome';
import Login from './screens/Login/Login';
import SignUp from './screens/Login/SignUp';

const LoginRoute = {
  Login: {
    name: 'Login',
    screen: Login,
  },
  SignUp: {
    name: 'SignUp',
    screen: SignUp,
  },
};

const LoginSignupNavigator = createStackNavigator(LoginRoute, {
  initialRouteName: 'Login',
  headerMode: 'none',
});

const BottomTabRoutes = {
  CustomerListHome: {
    name: 'CustomerListHome',
    screen: CustomerListHome,
    navigationOptions: {
      title: 'Customer',
    },
  },
  CalenderHome: {
    name: 'CalenderHome',
    screen: CalenderHome,
    navigationOptions: {
      title: 'Calender',
    },
  },
};

const BottomTabNavigator = createBottomTabNavigator(BottomTabRoutes, {
  initialRouteName: 'CustomerListHome',
  tabBarOptions: {
    color: '#85b4ff',
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
