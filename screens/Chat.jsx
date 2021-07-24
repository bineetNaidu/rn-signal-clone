import React, { useLayoutEffect, useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native';
import { auth, db, timestamp } from '../lib/firebase';

const Chat = ({ navigation, route }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    Keyboard.dismiss();

    if (!input) return;

    await db
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .add({
        message: input,
        timestamp,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      });

    setInput('');
  };

  useLayoutEffect(() => {
    const unsub = db
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id,
          }))
        );
      });

    return unsub;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerBackTitle: null,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Avatar
            size={30}
            rounded
            source={{
              uri:
                messages[messages.length - 1]?.data.photoURL ||
                'https://avatars3.githubusercontent.com/u/14058?s=460&v=4',
            }}
          />
          <Text style={styles.headerName}>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          styles={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
      ),

      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapper}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receiver}>
                    <Avatar
                      size={30}
                      position="absolute"
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        right: -5,
                      }}
                      bottom={-15}
                      right={-5}
                      rounded
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      size={30}
                      rounded
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        left: -5,
                      }}
                      position="absolute"
                      bottom={-15}
                      left={-5}
                      source={{
                        uri: data.photoURL,
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                style={styles.input}
                placeholder="Type your message here"
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerName: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 80,
    marginRight: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  input: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: 'transparent',
    backgroundColor: '#ECECEC',
    padding: 10,
    color: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  receiver: {
    position: 'relative',
    alignSelf: 'flex-end',
    width: 100,
    padding: 15,
    maxWidth: '80%',
    marginBottom: 20,
    marginRight: 15,
    backgroundColor: '#ECECEC',
    borderRadius: 20,
  },
  sender: {
    position: 'relative',
    alignSelf: 'flex-start',
    width: 100,
    padding: 15,
    maxWidth: '80%',
    margin: 15,
    backgroundColor: '#2B86E6',
    borderRadius: 20,
  },
  senderName: {
    color: '#fff',
    fontSize: 10,
    paddingRight: 10,
    left: 10,
  },
  senderText: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15,
  },
  receiverText: {
    color: '#000',
    fontWeight: '500',
    marginLeft: 10,
  },
});

export default Chat;
