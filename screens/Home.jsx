import React, { useLayoutEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import { auth } from '../lib/firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
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
      <ScrollView>
        <CustomListItem />
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
});

export default Home;
