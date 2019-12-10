import React, { useState } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Colors from './constants/Colors';
import ParentController from './ParentController';
import getFirebase from './firebase/firebaseConfig';
import LoadingItem from './components/LoadingItem';
import LoginScreen from './screens/LoginScreen';

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
  const [loading, setLoading] = useState(true);

  getFirebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
      console.log("Auth state changed => " + user.email);
    } else {
      setUser(null);
    }

    setLoading(false);
  });

  if(loading) return <LoadingItem/>;
  if(!user) return <LoginScreen/>;

  return (
    <PaperProvider theme={theme}>
      <ParentController email={user.email}/>
    </PaperProvider>
  );
}
