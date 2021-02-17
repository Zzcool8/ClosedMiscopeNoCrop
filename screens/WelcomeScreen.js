/**This is the Welcome screen of the app */

import React from 'react';
import {View,TouchableOpacity, Text, Button, Image,StyleSheet} from 'react-native';
import Header from '../components/Header'

const WelcomeScreen = props => {
    const content = (
        <View style={styles.logoContainer}>
            <Image source={require('../assets/play-button.png')} 
                style={styles.image1} 
                resizeMode='contain'/>
        </View>
    )
    return(
        <View style={styles.screen}>
            <Header title="Welcome to ByteSight"/>
            <TouchableOpacity onPress={() => props.navigation.navigate('CameraLoadingScreen')}>
                {content}
            </TouchableOpacity>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/bs-logo.png')} 
                style={styles.image} 
                resizeMode='contain'/>
            </View>
        </View>
       
    )
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        paddingTop: 25
        // alignContent: 'center',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    logoContainer: {
        paddingTop: 20
    },
    image: {
        width: '100%',
        height: 400,
        alignSelf: 'center'
    },
    image1: {
        paddingTop:20,
        width: '100%',
        height: 150,
        alignSelf: 'center'
    }
});

export default WelcomeScreen;