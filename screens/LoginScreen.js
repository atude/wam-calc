import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { signInEmail, createAccount } from '../firebase/firebaseFunctions';
import LoadingItem from '../components/LoadingItem';


export default function LoginScreen() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [err, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    const errMsg = await signInEmail(
      credentials.email, 
      credentials.password
    )

    if(!!errMsg) setError(errMsg);
    setIsLoading(false);
  }

  const handleSignUp = async () => {
    setIsLoading(true);
    const errMsg = await createAccount(
      credentials.email, 
      credentials.password,
    )

    if(!!errMsg) setError(errMsg);
    setIsLoading(false);
  }

  return (    
    <ScrollView style={styles.container}>
      {isLoading && <LoadingItem/>}
      <TextInput
        label="Email"
        textContentType="emailAddress"
        value={credentials.email}
        onChangeText={(value) => setCredentials({...credentials, email: value})}
      />
      <TextInput
        label="Password"
        textContentType="password"
        secureTextEntry={true}
        value={credentials.password}
        onChangeText={(value) => setCredentials({...credentials, password: value})}
        error={err ? true : false}
      />
      {isSignup ? 
        <View>
          <Button onPress={handleSignUp}>Sign Up</Button>
          <Button onPress={() => setIsSignup(false)}>Already have an account? Login instead</Button>
        </View>
        :
        <View>
          <Button onPress={handleSignIn}>Login</Button>
          <Button onPress={() => setIsSignup(true)}>Dont have an account? Sign up instead</Button>
        </View>
      }
    </ScrollView>
  );
};

LoginScreen.navigationOptions = {
  title: 'Login',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#fff',
  },
});
