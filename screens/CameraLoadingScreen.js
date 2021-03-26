import React, {useState} from 'react';
import {View, ProgressBarAndroid, StyleSheet, TextInput, Text} from 'react-native';
import ImagePicker from '../components/ImagePicker'
import axios from 'axios';

const CameraLoadingScreen = props => {
    const [MosquitoID, setMosquitoID] = useState('')
    const [PictureNumber, setPictureNumber] = useState('')
    
    const [uploadProgress, setUploadProgress] = useState();
    const [bgColor, setBgColor] = useState();
    const imgTakenHandler = async(uri) => {
        const data = new FormData();
        //data.append('name', 'testName');
        data.append('MosquitoID', {MosquitoID});
        data.append('PictureNumber', {PictureNumber});
        data.append('image', {
                uri: uri,
                type: 'image/jpeg',
                name: 'testPhotoName'
            }
        );

        const options = {
            onUploadProgress: (progressEvent) => {
                const {loaded, total} = progressEvent;
                let percent = Math.floor((loaded / total)*100)
                setUploadProgress(percent)
                console.log(`Uploading ${loaded}b out of ${total}b ---- ${percent}%`)
            }
        }

        await axios.post("https://appnocrop.azurewebsites.net/get_label",
        data, options).then(res => {
            console.log(res.data);
            const dataResponse = res.data;
            props.navigation.navigate('GetLabelScreen',{
                                species: dataResponse.species,
                                conf_score: dataResponse.confidence_score,
                                uri: uri,
                                bgColor: dataResponse.color_code
                            });
        })

    };

    return(
        <View style={styles.container}>
            <Text>Enter Mosquito Picture Identification Information:</Text>
            <Text>Enter Mosquito ID:</Text>
            <TextInput
                style={styles.input}
                placeholder='e.g. Mosquito123'
                onChangeText={(MosquitoID) => setMosquitoID(MosquitoID)} />
                
            <Text>Enter Picture Number:</Text>
            <TextInput 
                style={styles.input}
                placeholder='e.g. 1'
                onChangeText={(PictureNumber) => setPictureNumber(PictureNumber)} />
                
            <Text>MosquitoID: {MosquitoID}, Picture Number: {PictureNumber}</Text>
        
        
            <View style={styles.screen}>
                <ImagePicker 
                onImageTaken={imgTakenHandler}
                />
                { uploadProgress>0 && 
                    <ProgressBarAndroid 
                        styleAttr="Horizontal" 
                        // indeterminate={false} 
                        progress={uploadProgress/100} 
                        color="#2196F3"
                    /> 
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 5,
        width: 200
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CameraLoadingScreen;