import React from 'react';
import { StyleSheet, Text, View } from "react-native";


const LoginLoading =()=>{
    return(
        <View style={styles.container}>
            <Text style={styles.bodyText}>
                LBMS....Loading
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        color: '#fff',
        alignItems: 'center'
    },
    bodyText: {
        color: '#000',
        fontSize: 20
    }

})

export default LoginLoading;