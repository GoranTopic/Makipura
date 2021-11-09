import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';
import { StyleSheet } from 'react-native';
import Button from '../Button.js';
import { BASE_API, FACEBOOK_OATH_CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSigninButton(){
    const [result, setResult] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
        }
    }, [response]);

    return (
        <Button
            style={styles.button}
            disabled={!request}
            title="Google"
            onPress={() => { 
                promptAsync();
            }}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#DB4437', // Google red
        width: '40%',
        paddingVertical: 11,
        paddingHorizontal: 16,
    },
});

