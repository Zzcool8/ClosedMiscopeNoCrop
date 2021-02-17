/*
This module sets up navigation in the app
This helps switch from one screen to the next
All screens in the app must be imported here
*/

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import CategoriesScreen from '../screens/CategoriesScreen';
import CameraScreen from '../screens/CameraScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import CameraLoadingScreen from '../screens/CameraLoadingScreen'
import GetLabelScreen from '../screens/GetLabelScreen'

const ByteSightNavigator = createStackNavigator({
    WelcomeScreen: WelcomeScreen,
    Categories: CategoriesScreen,
    CameraScreen: CameraScreen,
    CameraLoadingScreen: CameraLoadingScreen,
    GetLabelScreen: GetLabelScreen
}, {headerMode: 'none'});

export default createAppContainer(ByteSightNavigator);