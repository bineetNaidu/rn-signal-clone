import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Chat = ({ navigation, route }) => {
  return (
    <View>
      <Text>I am the CHAT SCREEN</Text>
      <Text>{JSON.stringify(route.params, null, 2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Chat;
