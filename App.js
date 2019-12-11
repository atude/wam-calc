import React, { useState, useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Colors from './constants/Colors';
import ParentController from './ParentController';
import getFirebase from './firebase/firebaseConfig';
import LoadingItem from './components/LoadingItem';
import LoginScreen from './screens/LoginScreen';
import { AsyncStorage } from 'react-native';

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

  const handleSetSkipAccount = (setSkip) => {
    setSkipAccount(setSkip);
  }

  AsyncStorage.getItem("skipAccount")
  .then((isCheckSkip) => {
    if(isCheckSkip == "true") {
      setSkipAccount("true");
    }

    console.log("isCheckSkip: " + isCheckSkip)
  });
 
  getFirebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      console.log("Auth state changed => " + user.email);
    } else {
      setUser(null);
    }
  });

  return (
    <>
    {(!user && skipAccount == "false") ?
      <LoginScreen handleSetSkipAccount={handleSetSkipAccount}/> 
      :
      <PaperProvider theme={theme}>
        <ParentController email={user ? user.email : null} handleSetSkipAccount={handleSetSkipAccount}/>
      </PaperProvider>
    }
    </>
  );
}
