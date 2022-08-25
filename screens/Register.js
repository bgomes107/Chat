import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    // registra o usuario
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name,
                    photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
                })
                    .then(() => {
                        alert('Registered, please login.');
                    })
                    .catch((error) => {
                        alert(error.message);
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Entre com seu nome'
                label='Nome'
                value={name}
                onChangeText={text => setName(text)}
            />
            <Input
                placeholder='Entre com seu e-mail'
                label='E-mail'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder='Entre com sua senha'
                label='Senha'
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Input
                placeholder='Insira sua foto'
                label='Arquivo de foto'
                value={avatar}
                onChangeText={text => setAvatar(text)}
            />
            <TouchableOpacity style={styles.button} onPress={register}>
                <Text style={styles.textButton}>registrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 100
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
})

export default Register;