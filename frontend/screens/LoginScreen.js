import { StyleSheet, Text,  View, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { signin } from '../queries/auth.js'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js';
import Divider from 'react-native-divider';
import { successToast, errorToast } from '../components/Toaster.js';
import LoadingButton from '../components/buttons/LoadingButton.js'
import ValidatingTextInput from '../components/text-inputs/ValidatingTextInput.js'
import PasswordTextInput from '../components/text-inputs/PasswordTextInput.js';
import Button from '../components/buttons/Button.js';
import FacebookSigninButton from '../components/buttons/auth/FacebookSigninButton.js';
import GoogleSigninButton from '../components/buttons/auth/GoogleSigninButton.js';
import colors from '../config/colors.js';


const LoginScreen = ({ setUser, navigation }) => {
    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");

    const handleSignin = async () => {  
        await signin({ 
            username: username,
            password: password,
        }).then(result => {
            successToast({ text1: `Logined is as ${username}` });
            setUser({
                username: username, 
                cookie: result.cookie,
            });
        }).catch( err => {
            console.log(err);
            if(err.response)
                errorToast({ text1: err.response.data });
            else if(err.message)
                errorToast({ text1: err.message });
        } )
    }

    return <View style={styles.container}>
        <StatusBar style="auto"/>
        <SafeAreaView>
            <Text style={styles.titleFont}>Allin Chaskisqan Kay</Text>
            <Text style={styles.translationFont}>( Welcome )</Text>
            <ValidatingTextInput
                styleTextInput={styles.inputFontSize}
                styleContainer={styles.input}
                onChangeText={onChangeUsername}
                validate={false}
                placeholder="username"
                autoCapitalize="none"
                value={username} />
            <PasswordTextInput 
                styleTextInput={styles.inputFontSize}
                styleContainer={styles.input}
                onChangeText={onChangePassword}
                value={password} />
            <LoadingButton title="Login"
                styleButton={styles.horizontalMargin}
                onPress={handleSignin} />
            <Divider style={styles.horizontalMarginDivider}
                orientation={'center'}>with</Divider>
            <View style={styles.row}>
                <FacebookSigninButton/>
                <GoogleSigninButton/>
            </View>
            <Divider style={styles.horizontalMarginDivider}
                orientation={'center'}>or</Divider>
            <Button onlyText={true}
                styleText={styles.signUpBtn}
                title="Create Account"
                onPress={()=>{ navigation.navigate('Signup') }}
            />
        </SafeAreaView>
    </View>
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        //alignContent: 'space-around',
        //justifyContent: 'space-evenly',
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 15,
    },
    input: {
        alignSelf: 'center',
        height: 40,
        width:  200,
        margin: 12,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        shadowOpacity: 100,
        shadowRadius: 2,
        shadowOffset: {
            width: 200,
            height: -9,
        },
    },
    inputFontSize: {
        fontSize: 16,
    },
    signUpBtn:{
        fontSize: 17,
    },
    titleFont: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.btnGreen, 
        marginLeft: 25,
        marginTop: 30,
    },
    translationFont: {
        fontSize: 15,
        color: '#808080', // gray
        alignSelf: 'flex-end',
        marginRight: 30,
        marginBottom: 25,
    },
    horizontalMargin:{
        marginBottom: 30,
        marginTop: 10,
    },
    horizontalMarginDivider:{
        marginBottom: 20,
        marginTop: 10,
    },
});

