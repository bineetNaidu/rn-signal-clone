import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { auth } from '../lib/firebase';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('Home');
      }
    });

    return unsub;
  }, []);

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      alert(error.message);
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image
        source={{
          uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png',
        }}
        style={styles.image}
      />
      <View style={styles.input}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="Login!" />
      <Button
        containerStyle={styles.button}
        onPress={() => navigation.navigate('Register')}
        type="outline"
        title="Register?"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  image: {
    width: 200,
    height: 200,
  },
  input: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

export default Login;
