import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

const CustomListItem = () => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>Youtube Chat</ListItem.Title>
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
