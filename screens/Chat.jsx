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

  const sendMessage = () => {
    Keyboard.dismiss();

    db.doc(route.params.id).collection('messages').add({
      message: input,
      timestamp,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput('');
  };

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
              uri: 'https://avatars3.githubusercontent.com/u/14058?s=460&v=4',
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
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>I am the CHAT SCREEN</Text>
      <Text>{JSON.stringify(route.params, null, 2)}</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapper}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView>{/* The Chat! */}</ScrollView>
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
});

export default Chat;
