import React, {useState} from 'react';
import {View, ProgressBarAndroid, StyleSheet} from 'react-native';
import ImagePicker from '../components/ImagePicker'
import axios from 'axios';

const CameraLoadingScreen = props => {
    const [uploadProgress, setUploadProgress] = useState();
    const [bgColor, setBgColor] = useState();
    const imgTakenHandler = async(uri) => {
        const data = new FormData();
        data.append('name', 'testName');
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

    )
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CameraLoadingScreen;