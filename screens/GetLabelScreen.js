import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Image, TouchableOpacity} from 'react-native';

const GetLabelScreen = (props) => {
    const species = props.navigation.state.params.species;
    const conf_score = (parseFloat(props.navigation.state.params.conf_score)*100).toFixed(2) + '%';
    const uri = props.navigation.state.params.uri;
    const bgColor = props.navigation.state.params.bgColor.toString();
    // console.log(typeof bgColor)
    // console.log(bgColor);

    const content = (
        <View style={styles.logoContainer}>
            <Image source={require('../assets/play-button.png')} 
                style={styles.image1} 
                resizeMode='contain'/>
        </View>
    )

    return(
        <View style={styles.screen}>
            <View style={styles.imagePreview}>
            <Image style={styles.image} source={{uri:uri}} resizeMode='cover'/>
            </View>

            <Text style={styles.label}>Label: {species}</Text>
            <Text style={[styles.conf_score, {backgroundColor: bgColor}]}>Confidence Score: {conf_score} </Text>
            <TouchableOpacity onPress={() => props.navigation.push('CameraLoadingScreen')}>
                {content}
            </TouchableOpacity>
       <Button title="Go to Homepage" 
            onPress={() => {
                props.navigation.popToTop()
            }
       }/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        paddingTop: 25,
        // alignContent: 'center',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    logoContainer: {
        paddingTop: 10,
        paddingBottom: 20
    },
    imagePreview:{
        width: '100%',
        height: '45%',
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 2,
        borderColor: 'green'
    },
    image: {
        width: "100%",
        height: '100%'
    },
    image1: {
        paddingTop:15,
        width: '100%',
        height: 100,
        alignSelf: 'center',
        paddingBottom: 10
    },
    label: {
        width: '90%',
        fontSize: 24,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#08c431',
        color: 'white',
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'center',
        alignSelf: 'center'

    },

    conf_score: {
        width: '60%',
        textAlign: 'center',
        // backgroundColor: {bgColor},
        fontSize: 18,
        padding:5,
        marginBottom: 20,
        alignSelf: 'center'
    },

});

export default GetLabelScreen;