import React, { useState, useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Colors from './constants/Colors';
import ParentController from './ParentController';
import getFirebase from './firebase/firebaseConfig';
import LoginScreen from './screens/LoginScreen';
import { AsyncStorage, } from 'react-native';

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
  const [isMainLoading, setIsMainLoading] = useState(true);
  const [isSkipLoading, setIsSkipLoading] = useState(true);
  const [skipAccount, setSkipAccount] = useState("false");

  const handleSetSkipAccount = async (setSkip) => {
    await AsyncStorage.setItem("skipAccount", setSkip);
    setSkipAccount(setSkip);
  }

  useEffect(() => {
    setIsSkipLoading(true);
    const setSkipProcess = async () => {
      const isCheckSkip = await AsyncStorage.getItem("skipAccount");

      if (isCheckSkip && isCheckSkip === "true") {
        setSkipAccount("true");
      } else {
        setSkipAccount("false");
      };
    };

    setSkipProcess();
    setIsSkipLoading(false);
  }, [skipAccount]);
 
  useEffect(() => {
    getFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log("Auth state changed => " + user.email);
      } else {
        setUser(null);
      }
  
      setIsMainLoading(false);
    });
  }, []);
 
  return (
    <PaperProvider theme={theme}>
    {(!user && skipAccount === "false") ?
      <LoginScreen isMainLoading={isMainLoading || isSkipLoading} handleSetSkipAccount={handleSetSkipAccount}/> 
      :
      <ParentController email={!!user ? user.email : null} handleSetSkipAccount={handleSetSkipAccount}/>
    }
    </PaperProvider>
  );
}
