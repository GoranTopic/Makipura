import React  from 'react';
import Toast, { SuccessToast, BaseToast, ErrorToast } from 'react-native-toast-message';

export function successToast(props){
    const { type = 'success',
        text1 = 'success',
        topOffset= 100,
    } = props;
    Toast.show({ type, text1, topOffset, ...props });
}

export function errorToast(props){
    const { type = 'error',
        text1 = 'error',
        topOffset= 100,
    } = props;
    Toast.show({ type, text1, topOffset, ...props });
}

export function infoToast(props){
    const { type = 'info',
        text1 = 'info',
        topOffset= 100,
    } = props;
    Toast.show({ type, text1, topOffset, ...props });
}

// App.jsx

/*
    1. Create the config
    */
export const toastConfig = {
    /* Overwrite 'success' type,
        by modifying the existing `BaseToast` component */
    success: (props) => (
        <SuccessToast
            {...props}
            style={{ borderLeftColor: 'green' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '600'
            }}
        />
    ),
    /* Overwrite 'error' type,
        by modifying the existing `ErrorToast` component */
    error: (props) => (
        <ErrorToast
            {...props}
            style={{ 
                borderLeftColor: 'green' ,
                color: 'blue', 
                borderLeftWidth: 50,
            }}
            contentContainerProps={{
                color: 'blue', 
                borderLeftWidth: 50,
            }}
            contentContainerStyle={{ 
                paddingHorizontal: 5,
            }}
            text1Style={{
                fontSize: 16,
                fontWeight: '600'
            }}
            text2Style={{
                fontSize: 15
            }}
        />
    ),
    /* Or create a completely new type - `tomatoToast`,
        building the layout from scratch.
        I can consume any custom `props` I want.
        They will be passed when calling the `show` method (see below) */
    tomatoToast: ({ text1, props }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    )
}

