/**This page directs a user to take images */

import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const CameraScreen = props => {
    return(
        <View style={styles.screen}>
            <Text>Camera Screen</Text>
            <Button title="Take a picture" onPress={() =>{
                props.navigation.navigate({routeName: 'CameraLoadingScreen'});
            }
        }/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CameraScreen;
