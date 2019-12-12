import React, { useState, useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Colors from './constants/Colors';
import ParentController from './ParentController';
import getFirebase from './firebase/firebaseConfig';
import LoginScreen from './screens/LoginScreen';
import { AsyncStorage, } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.tintColor,
    accent: Colors.tintColor,
  }
};

export default function App(props) {
  const [user, setUser] = useState(null);
  const [skipAccount, setSkipAccount] = useState("false");
  const [isMainLoading, setIsMainLoading] = useState("true");

  const handleSetSkipAccount = (setSkip) => {
    setSkipAccount(setSkip);
  }

  const initLoad = async () => {
    const cacheLogo = await Asset.fromModule(require('./assets/images/loginicon.png')).downloadAsync();

    const isCheckSkip = await AsyncStorage.getItem("skipAccount");
    if(isCheckSkip == "true") {
      setSkipAccount("true");
    }

    console.log("isCheckSkip: " + isCheckSkip);

    getFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log("Auth state changed => " + user.email);
      } else {
        setUser(null);
      }
    });
  } 
 
  if(isMainLoading == "true") {
    return (
      <AppLoading
        startAsync={initLoad}
        onFinish={() => setIsMainLoading("false")}
        onError={console.warn}    
      />
    );
  }

  return (
    <PaperProvider theme={theme}>
    {(!user && skipAccount == "false") ?
      <LoginScreen handleSetSkipAccount={handleSetSkipAccount}/> 
      :
      <ParentController email={user ? user.email : null} handleSetSkipAccount={handleSetSkipAccount}/>
    }
    </PaperProvider>
  );
}
