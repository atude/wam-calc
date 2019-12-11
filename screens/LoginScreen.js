import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, TextInput, } from 'react-native-paper';
import { signInEmail, createAccount } from '../firebase/firebaseFunctions';
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

  const handleSkipSignIn = () => {
    props.handleSetSkipAccount(1);
    console.log("set to true");
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
      <Image style={styles.loginIcon} source={require('../assets/images/loginicon.png')} />
      
      {props.isMainLoading ? 
        <LoadingItem isLoading={true}/>
      :
        (
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
          <Text
            type="error"
            style={styles.errorText}
          >
            {err}
          </Text>
          {isSignup ? 
            <View>
              <Button 
                style={styles.buttonMain} 
                mode="outlined" 
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
                mode="outlined" 
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
        )
      }
      
    </View>
  );
};

LoginScreen.navigationOptions = {
  title: 'Login',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tintColor,
    alignItems: "stretch",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    padding: 50,
  }, 
  buttonMain: {
    margin: 6,
    padding: 8,
    backgroundColor: "#fff",
    color: Colors.tintColor
  },
  switchTypeText: {
    flexWrap: "wrap",
    color: "#fff",
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
    color: Colors.warningBackground
  }
});
