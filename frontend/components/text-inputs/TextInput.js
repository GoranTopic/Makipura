import React from 'react';
import { StyleSheet, TextInput as BasicTextInput } from 'react-native';

export default function TextInput(props){
    let { style } = props;
    let styles = [ localStyles.textInput, style ]

    return <BasicTextInput style={styles} {...props}/>
}

const localStyles = StyleSheet.create({
    textInput: {
    },
});

