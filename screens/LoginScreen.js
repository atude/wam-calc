import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, TextInput, } from 'react-native-paper';
import { signInEmail, createAccount } from '../firebase/firebaseFunctions';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import LoadingItem from '../components/LoadingItem';
import Colors from '../constants/Colors';


export default function LoginScreen(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [err, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogoLoading, setIsLogoLoading] = useState(true);


  const handleSkipSignIn = () => {
    props.handleSetSkipAccount(1);
  }

  const handleSignIn = async () => {
    setIsLoading(true);
    setError("");
    const errMsg = await signInEmail(
      credentials.email, 
      credentials.password
    )

    if(!!errMsg) setError(errMsg);
    setIsLoading(false);
  }

  const handleSignUp = async () => {
    setIsLoading(true);
    setError("");
    const errMsg = await createAccount(
      credentials.email, 
      credentials.password,
    )

    if(!!errMsg) setError(errMsg);
    setIsLoading(false);
  }

  

  return (    
    <View style={styles.container}>
      <Image 
        style={styles.loginIcon} 
        source={require('../assets/images/loginicon.png')} 
        onLoadEnd={() => setTimeout(() => {
          setIsLogoLoading(false)
        }, 1000)} 
      />
      {props.isMainLoading || isLogoLoading ? 
      <LoadingItem isLoading={true}/>
      :    
      <>
        <TextInput
          style={styles.inputMain}
          label="Email"
          textContentType="emailAddress"
          value={credentials.email}
          onChangeText={(value) => setCredentials({...credentials, email: value})}
          error={err ? true : false}
        />
        <TextInput
          style={styles.inputMain}
          label="Password"
          textContentType="password"
          secureTextEntry={true}
          value={credentials.password}
          onChangeText={(value) => setCredentials({...credentials, password: value})}
          error={err ? true : false}
        />
        <Text type="error" style={styles.errorText}>{err}</Text>
        {isSignup ? 
          <View>
            <Button 
              style={styles.buttonMain} 
              mode="contained" 
              onPress={handleSignUp}>
                Sign Up
            </Button>
            <Text 
              style={styles.switchTypeText} 
              onPress={() => setIsSignup(false)}>
                Already have an account? Login instead
            </Text>
          </View>
           : 
          <View>
            <Button 
              style={styles.buttonMain} 
              mode="contained" 
              onPress={handleSignIn}>
                Login
            </Button>
            <Text 
              style={styles.switchTypeText} 
              onPress={() => setIsSignup(true)}>
                Dont have an account? Sign up instead
            </Text>
          </View>
        }
      <Text 
        style={styles.switchTypeTextSkip} 
        onPress={handleSkipSignIn}>
          Skip sign in
      </Text>
      <LoadingItem isLoading={isLoading}/>
      </>
      }
      <View style={styles.firebaseTextContainer}>
        <View>
          <Button disabled mode="text">
            Powered by Firebase
          </Button>
        </View>
        <View>
          <MaterialCommunityIcons
            name="firebase"
            size={30}
            color="#959595"
          />
        </View>
      </View>
    </View>
  );
};

LoginScreen.navigationOptions = {
  title: 'Login',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    padding: 50,
  }, 
  buttonMain: {
    margin: 6,
    padding: 8,
    backgroundColor: Colors.tintColor,
    color: "#fff",
  },
  switchTypeText: {
    flexWrap: "wrap",
    color: Colors.tintColor,
    paddingTop: 20,
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 15,
  },
  switchTypeTextSkip: {
    flexWrap: "wrap",
    color: "#959595",
    paddingTop: 20,
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 15,
  },
  inputMain: {
    marginBottom: 10,
  },
  loginIcon: {
    alignSelf: "center",
    resizeMode: "center",
    marginTop: -75,
  },
  errorText: {
    textAlign: "center",
    padding: 10,
    color: Colors.errorBackground
  },
  firebaseTextContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    position: "absolute",
    bottom: 0,
    marginBottom: 20,
    alignItems: "center",
    alignSelf: "center",
  }
});
