import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import { auth, db } from '../lib/firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsub = db.collection('chats').onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((d) => ({
          id: d.id,
          data: d.data(),
        }))
      );
    });
    return () => {
      unsub();
    };
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', { id, chatName });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Signal',
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: 'black',
      headerTitleStyle: { color: 'black' },
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={async () => {
              await auth.signOut();
              navigation.replace('Login');
            }}
          >
            <Avatar
              rounded
              source={{
                uri:
                  auth.currentUser?.photoURL ??
                  'https://avatars3.githubusercontent.com/u/14058?s=460&v=4',
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <AntDesign name="camerao" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AddChat')}>
            <SimpleLineIcons name="pencil" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={data.chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 20,
  },
  headerRight: {
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
  },
  container: {
    height: '100%',
  },
});

export default Home;
