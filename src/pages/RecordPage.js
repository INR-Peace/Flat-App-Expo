//0627 시도(tensorflow+expo recording)



import * as React from 'react';
import {Audio} from 'expo-av';
import styled from 'styled-components/native';
import {useEffect, useLayoutEffect,} from "react";
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import * as FileSystem from "expo-file-system/build/FileSystem";
import {Button, View} from "react-native";
import * as tf from '@tensorflow/tfjs'
import {bundleResourceIO, fetch} from "@tensorflow/tfjs-react-native";
import {
    Recording,
    RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4, RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX
} from "expo-av/build/Audio/Recording";
import {RecordingOptions} from "expo-av/build/Audio/Recording";

// 녹음하기 버튼 누르면 ComposePage -> 녹음
// 녹음에서 완료버튼 -> EditPage
// 녹음에서 취소버튼 -> ComposePage
// 보내야할 것은 몇분몇초


//방법1: colab convert_audio_for_model 함수 참고
//The SPICE model needs as input an audio file at a sampling rate of 16kHz and with only one channel (mono).
//(sample_rate: 16000, setChannel:1로 세팅해야 spice model을 사용 can)
//방법2: 다른 API 찾아보기
//



let rr = "";
export const RecordPage = ({toggleButton, navigation}) => {

    // const RECORDING_OPTIONS_PRESET_HIGH_QUALITY: RecordingOptions = {
    //     isMeteringEnabled: true,
    //     android: {
    //         extension: '.wav',
    //         outputFormat: RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    //         audioEncoder: RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    //         sampleRate: 16000,
    //         numberOfChannels: 1,
    //         bitRate: 128000,
    //     },
    //     ios: {
    //         extension: '.caf',
    //         audioQuality: RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
    //         sampleRate: 16000,
    //         numberOfChannels: 1,
    //         bitRate: 128000,
    //         linearPCMBitDepth: 16,
    //         linearPCMIsBigEndian: false,
    //         linearPCMIsFloat: false,
    //     },
    // };

    const [recording, setRecording] = React.useState();
//    const [source, setSource]=React.useState();
    const [sound, setSound] = React.useState();
    const [convert, setConvert] = React.useState();
    const [state, setState] = React.useState({recordingT: false});


    //fitting format for tensorflow model
    // let recordingOption=Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY;
    // try{
    //     recordingOption.android.sampleRate=16000;
    //     recordingOption.android.numberOfChannel=1;
    // }catch (e){
    //     console.log(e);
    // }
    //

    const NUM_INPUT_SAMPLES = -1;  //2048
    const MODEL_SAMPLE_RATE = 16000;
    const PT_OFFSET = 25.58
    const PT_SLOPE = 63.07
    const CONF_THRESHOLD = 0.9;
    const middleA = 440;
    const semitone = 69;


    const noteStrings = [
        "C",
        "C♯",
        "D",
        "D♯",
        "E",
        "F",
        "F♯",
        "G",
        "G♯",
        "A",
        "A♯",
        "B",
    ];

    toggleButton = () => {
        if (state.recordingT) {
            setState({recordingT: false})
        } else {
            setState({recordingT: true})
        }
    };

    useEffect(() => {
        init();

    }, []);

    let model;

    async function loadModel() {


        // handleSuccess(require('./clock.wav'));
        handleSuccess(audio);




    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: '#ffffff',

            headerLeft: ({onPress, tintColor}) => {
                return (
                    <MaterialCommunityIcons
                        name="keyboard-backspace"
                        size={30}
                        style={{marginLeft: 11}}
                        color={tintColor}
                        onPress={onPress}
                    />
                );
            },
            headerRight: ({tintColor}) => (
                <AntDesign
                    name="check"
                    size={30}
                    style={{marginRight: 11}}
                    color={tintColor}
                    onPress={() => navigation.navigate("EditPage")}
                />
            ),
        });
    }, []);

    function getPitchHz(modelPitch) {
        const fmin = 10.0;
        const bins_per_octave = 12.0;
        const cqt_bin = modelPitch * PT_SLOPE + PT_OFFSET;

        return fmin * Math.pow(2.0, (1.0 * cqt_bin / bins_per_octave))
    }

    async function init() {
    //
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'flat/download',{intermediates:true});
    //
    //     try {
    //         await tf.ready();
    //         console.log("Model is ready!");
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    //
    //     //
    //     // const modelJson=require('../../assets/model/model.json');
    //     // const modelWeights1=require('C:/Users/user/INR-peace/Flat-App/assets/model/group1-shard1of3.bin');
    //     // const modelWeights2=require('C:/Users/user/INR-peace/Flat-App/assets/model/group1-shard2of3.bin');
    //     // const modelWeights3=require('C:/Users/user/INR-peace/Flat-App/assets/model/group1-shard3of3.bin');
    //     //
    //     // const model = await tf.loadLayersModel(
    //     //     bundleResourceIO(modelJson, [modelWeights1, modelWeights2,modelWeights3]));
    //
    //
    //
    //     try {
    //         model = await tf.loadGraphModel('https://tfhub.dev/google/tfjs-model/spice/2/default/1', {fromTFHub: true});
    //         console.log("Model loaded!");
    //
    //
    //     } catch (error) {
    //         console.log("error", error);
    //     }

    //
    //
    //
    //
    }


    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            // await recording.prepareToRecordAsync(recordingOption);
            // await recording.prepareToRecordAsync({
            //     android: {sampleRate:16000,
            //     numberOfChannels:1,
            //     outputFormat: RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            //     audioEncoder: RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
            //     extension: '.wav',
            //     bitRate: 128000,
            //recordingOption
            //     }
            // });
            const RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
                isMeteringEnabled: true,
                android: {
                    extension: '.wav',
                    outputFormat: RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
                    audioEncoder: RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    bitRate: 128000, //128000
                },
                ios: {
                    extension: '.caf',
                    audioQuality: RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    bitRate: 128000, //128000
                    linearPCMBitDepth: 16,
                    linearPCMIsBigEndian: false,
                    linearPCMIsFloat: false,
                },
            };

            await recording.prepareToRecordAsync(RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            // setSource(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        let r = Math.random().toString(36).substring(7);
        console.log('Stopping recording..');

        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const recordUri = recording.getURI();
        console.log(recordUri);

        const source= await Audio.Sound.createAsync(
            { uri: recordUri }
        );
        const audio=new Float32Array(source);

        console.log("audio :" +audio);
        console.log("source:"+ source);


        rr = r;
        await FileSystem.moveAsync({from: recordUri, to: FileSystem.documentDirectory + `flat/${r}.wav`});
        const dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + `flat`)
        console.log('Recording stopped and stored at', FileSystem.documentDirectory + `flat/${r}.wav`);

        await handleSuccess(audio);

    }


    async function playSound() {
        console.log('Loading Sound');
        const soundObject = new Audio.Sound();
        console.log(`${rr}.wav`);
        const path = FileSystem.documentDirectory + `flat/${rr}.wav`;
        handleSuccess({path});
        try {
            await soundObject.loadAsync({uri: path});
            await soundObject.playAsync();
        } catch (error) {
            console.log("Error", error);
        }


        // handleSuccess(source);

    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                Audio.Sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    function getNote(frequency) {
        const note = 12 * (Math.log(frequency / middleA) / Math.log(2));
        return Math.round(note) + semitone;
    }


    async function handleSuccess(stream) {

        //model ready & load
        try {
            await tf.ready();
            console.log("Model is ready!");
        } catch (error) {
            console.error(error);}

        try {
            model = await tf.loadGraphModel('https://tfhub.dev/google/tfjs-model/spice/2/default/1', {fromTFHub: true});
            console.log("Model loaded!");
        } catch (error) {
            console.log("error", error);
        }

        //Trying...

        console.log(stream);
        const input = tf.reshape(tf.tensor(stream), [stream.length]) //원래 shape는 2048, shape가 맞지 않다고 나와서 바꾼것.
        console.log(input);
        const output = model.execute({ "input_audio_samples":input});


        const uncertainties = output[0].dataSync();
        const pitches = output[1].dataSync();

        for (let i = 0; i < pitches.length; ++i) {
            let confidence = 1.0 - uncertainties[i];

            if (confidence < CONF_THRESHOLD) {
                let frequency = getPitchHz(pitches[i]);
                if (frequency && onNoteDetected) {
                    const note = getNote(frequency);
                    if (parseInt(note / 12) - 1) {
                        onNoteDetected({
                            name: noteStrings[note % 12],
                            value: note,
                            //  cents: this.getCents(frequency, note),
                            octave: parseInt(note / 12) - 1,
                            frequency: frequency,
                        });
                    }
                }
            }
            console.log(getPitchHz(pitches[i]));

        }
    }


    async function loadMidi() {

        console.log('Loading Sound');
        const soundObject = new Audio.Sound();
        const path = 'https://sheetvision-outputs.s3.ap-northeast-2.amazonaws.com/output.mid';
        // handleSuccess({path});
        try {
            await soundObject.loadAsync(
                {uri: path},
                {shouldPlay: true, androidImplementation: 'MediaPlayer'}
            );
            await soundObject.playAsync();
            console.log('Success!!'+ soundObject);
        } catch (error) {
            console.log("Error", error);
        }
    }

    return (
        <Container>
            <StyledPress
                onPress={recording ? stopRecording : startRecording}
                onPressOut={() => toggleButton()}>
                {state.recordingT ?
                    <MaterialCommunityIcons name="stop" size={50} color="white"/> :
                    <MaterialCommunityIcons name="microphone-settings" size={50} color="white"/>}
            </StyledPress>
            <View style={{paddingTop: 25}}>
                <MaterialCommunityIcons name="play" size={40} color="white" onPress={playSound}/>
            </View>
            <Button title={"Load"} onPress={loadModel}/>
            <Button title={"Listen midi file"} onPress={loadMidi}/>
            {/*<Button title={"Load2"} onPress={handleSuccess(audio)}/>*/}

        </Container>
    );

}

export default RecordPage;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #101010;
`;

const StyledPress = styled.Pressable`
  width: 222px;
  height: 222px;
  border-radius: 111px;
  border-width: 15px;
  border-color: #51CDDE;
  align-items: center;
  justify-content: center;
`;
