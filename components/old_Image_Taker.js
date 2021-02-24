/**
 * This module uses another camera module for expo. Not used in the app yet
 */

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import Colors from '../constants/Colors'

const ImageTaker = props => {
    const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async() => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (result.status !== 'granted'){
        Alert.alert(
            'Insufficient Permissions',
            'You need to grant camera permissions',
            [{text: 'Okay'}]);
        return false;
        }
    return true;
    };

    const imageHandler = async() => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions){
            return;
        }
        const image = await Camera.takePictureAsync({
            // allowsEditing: true,
            // aspect: [16, 9],
            quality: 1
        });

        setPickedImage(image.uri);
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
            { !pickedImage ? (
                <Text>No image Picked Yet</Text>
            )
                : (
                <Image style={styles.image} source={{uri:pickedImage}}/>
                )
            }
                 
            </View>
            {
                !pickedImage ? (
                    <Button title='Take Image' 
                    color={Colors.primary}
                    onPress={imageHandler}
                    />
                ) 
                :
                (<Button title='Retake Image' 
                color={Colors.primary}
                onPress={imageHandler}
                />) 
            }
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        width:'100%'
    },
    imagePreview:{
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: "100%",
        height: '100%'
    }
})
export default ImageTaker;