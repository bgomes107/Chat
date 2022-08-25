import React from 'react';
import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';


const Chat = ({ navigation }) => {

    const [messages, setMessages] = useState([]);

    const signOutNow = () => {
        signOut(auth).then(() => {
            // saida bem sucedida
            navigation.replace('Login')
        }).catch((error) => {
            // ocorreu um erro
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL,
                        }}
                    />
                </View>
            ),

            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={signOutNow}>
                    <Text>sair</Text>
                </TouchableOpacity>
            )
        })

        // chat em tempo real
        // const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
        // const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
        //     snapshot.docs.map(doc => ({
        //         _id: doc.data()._id,
        //         createdAt: doc.data().createdAt.toDate(),
        //         text: doc.data().text,
        //         user: doc.data().user
        //     }))
        // ));

        // return () => {
        //     unsubscribe();
        // };
        
    }, [navigation]);

    //chat simulado
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Olá, tudo bem?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []);

    // botao de enviar mensagem
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const { _id, createdAt, text, user } = messages[0]

        addDoc(collection(db, 'chats'), { _id, createdAt, text, user });
    }, []);

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
            }}
        />
    );
};

export default Chat;