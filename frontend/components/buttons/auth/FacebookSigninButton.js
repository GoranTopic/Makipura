import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import { StyleSheet } from 'react-native';
import Button from '../Button.js';
import { BASE_API, FACEBOOK_OATH_CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();

export default function FacebookSigninButton(){

    const [result, setResult] = useState(null);

    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: FACEBOOK_OATH_CLIENT_ID,
        responseType: ResponseType.Code,
    });

    const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync( BASE_API + '/auth/facebook');
        setResult(result);
        console.log(result);
    };

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            console.log('this ran ')
            console.log(code)
        }
    }, [response]);

    return (
        <Button
            style={styles.button}
            disabled={!request}
            title="Facebook"
            onPress={() => { 
                _handlePressButtonAsync();
                //promptAsync();
            }}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3b5998', // facebook blue
        width: '40%',
        paddingVertical: 11,
        paddingHorizontal: 16,
    },
});

