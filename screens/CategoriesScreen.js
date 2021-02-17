/**This module is for access to the various services offered by ByteSight
 * 
 * Currently there is only one service which is Speciating Mosquitoes
 * Could be other services like data analysis, etc
 */

import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const CategoriesScreen = props => {
    return(
        <View style={styles.screen}>
            <Text>Find A Service</Text>
            <Button title="Speciate Mosquito" onPress={() =>{
                props.navigation.navigate({routeName: 'CameraScreen'});
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

export default CategoriesScreen;