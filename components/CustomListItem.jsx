import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { db } from '../lib/firebase';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    const unsub = db
      .collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMsgs(snapshot.docs.map((doc) => doc.data()));
      });
    return () => {
      unsub();
    };
  }, []);

  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri:
            msgs[0]?.photoURL ||
            'https://avatars3.githubusercontent.com/u/14058?s=460&v=4',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{chatName}</ListItem.Title>
        <ListItem.Subtitle
          style={styles.subtitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {msgs[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
});

export default CustomListItem;
