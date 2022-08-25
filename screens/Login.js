import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Input } from "react-native-elements";
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Icon } from "react-native-vector-icons/FontAwesome";

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // abre a tela de registro
    const openRegisterScreen = () => {
        navigation.navigate('Register');
    };

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            navigation.navigate('Chat');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder='Entre com seu e-mail'
                label='E-mail'
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder='Entre com sua senha'
                label='Senha'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.textButton}>entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={openRegisterScreen}>
                <Text style={styles.textButton}>registrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 100,
    },

    button: {
        width: 430,
        height: 45,
        marginTop: 10,
        backgroundColor: '#000',
        borderRadius: 5
    },

    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 6
    }
});

export default Login;