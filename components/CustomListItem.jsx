import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri: 'https://avatars3.githubusercontent.com/u/14058?s=460&v=4',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{chatName}</ListItem.Title>
        <ListItem.Subtitle
          style={styles.subtitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque,
          velit.
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
