import React, { useLayoutEffect, useState } from 'react';
import { Button, Input, Icon } from 'react-native-elements';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { db, timestamp } from '../lib/firebase';

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState('');

  const createChat = () => {
    db.collection('chats')
      .add({
        chatName: input,
        createdAt: timestamp,
      })
      .then(() => {
        setInput('');
        navigation.goBack();
      })
      .catch((err) => {
        alert(err);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add a new Chat',
    });
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Input
        placeholder="Chat Name"
        onChangeText={(text) => setInput(text)}
        value={input}
        type="text"
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="#000" />
        }
      />
      <Button title="Create new Chat" onPress={createChat} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#fff',
    height: '100%',
  },
});
export default AddChat;
