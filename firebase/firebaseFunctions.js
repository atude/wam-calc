import getFirebase from './firebaseConfig';

const usersRef = getFirebase.firestore().collection("users");

export const signInEmail = async (email, password) => {
  return await getFirebase.auth().signInWithEmailAndPassword(email, password)
  .catch(error => {
    const { code, message } = error;
    console.error(message);
    return(message);
  });
}

export const createAccount = async (email, password) => {
  //Create auth details
  return await getFirebase.auth().createUserWithEmailAndPassword(email, password)
  .then((credentials) => {
    //Create firestore doc for user
    usersRef.doc(email).set({
      terms: null
    });

    console.log("Made new user => " + credentials.user.email);
  })
  .catch((error) => {
    const { code, message } = error;
    console.error(message);
    return(message);
  });
}

export const signOut = () => {
  getFirebase.auth().signOut().then(() => {
    console.log("Signed out");
  }).catch(error => {
    console.log(error.message);
  });
}