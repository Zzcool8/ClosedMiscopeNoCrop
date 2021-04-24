/**
 * This is the Image / Camera component of the app
 */

import React, {useState} from 'react';
import {View, Button, Text, StyleSheet, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
//import {Camera} from 'expo-camera';
import Colors from '../constants/Colors';

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();
    const verifyPermissions = async() => {
        //First ask for permissions to use the native device's camera
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
    
    const takeImageHandler = async() => {
        const hasPermissions = await verifyPermissions();
        //Make sure the user has permissions to use the camera app
        if (!hasPermissions){
            return;
        }

        //Launch camera from here
        const image = await ImagePicker.launchCameraAsync({
            // allowsEditing: true,
            // aspect: [16, 9],
            quality: 1
        });
        if(!image.cancelled){
            // console.log("Done taking pic");
            // console.log(image);
            setPickedImage(image.uri);
            props.onImageTaken(image.uri);
        }
    };

    const pickImageHandler = async () => {
        const hasPermissions = await verifyPermissions();
        //Make sure the user has permissions to use the camera app
        if (!hasPermissions){
            return;
        }
        let image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
        //   allowsEditing: true,
        //   aspect: [4, 3],
          quality: 1
        });
    
        if(!image.cancelled){
            setPickedImage(image.uri);
            props.onImageTaken(image.uri);
        }
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
                    <View>
                    <View style={styles.buttonView}>
                        <Button  title='Take A Picture' 
                        color={Colors.primary}
                        onPress={takeImageHandler}
                        />
                    </View>

                    <View style={styles.buttonView}>
                        <Button title='Select an Image' 
                        color={Colors.primary}
                        onPress={pickImageHandler}
                        />
                    </View>
                        
                    </View>
                    
                ) 
                :
                // (<Button title='Retake Image' 
                // color={Colors.primary}
                // onPress={takeImageHandler}
                // />) 
                null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        width:'100%',
        height: '50%'
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
    },

    buttonView: {
        padding: 10,
        margin: 10
    }
})

export default ImgPicker;