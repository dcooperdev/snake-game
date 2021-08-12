import firebase from "../utils/firebase";

class AuthService {
  constructor() {
    if (!AuthService.instance) {
      AuthService.instance = this;
    }
    return AuthService.instance;
  }
  async Login(username, password) {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(username, password);
      const { user: { uid }} = response;
      const data = await firebase.firestore().collection('users').doc(uid).get();
      const user = { uid, username, ...data.data() };
      await firebase.firestore().collection('users').doc(uid).update({ loggedin: true })
      this.user = user;
      return user;
    } catch (error) {
      throw error;
    }
  }
  async Signup(username, password, fullName) {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(username, password);
      const { user: { uid }} = response;
      await firebase.firestore().collection('users').doc(uid).set({
        fullName,
        url: '',
        loggedin: true
      })
      const user = { uid, username, fullName };
      this.user = user;
      return user;
    } catch (error) {
      throw error;
    }
  }
  async UpdateProfile(fullName, url) {
    await firebase.firestore().collection('users').doc(this.user.uid).update({
      fullName,
      url
    })
    return {
      ...this.user,
      fullName,
      url,
      loggedin: true
    }
  }
  async AddField(field) {
    await firebase.firestore().collection('users').doc(this.user.uid).update({
      ...field
    })
    return {
      ...this.user,
      loggedin: true
    }
  }
  async Logout() {
    try {
      await firebase.firestore().collection('users').doc(this.user.uid).update({ loggedin: false })
      return await firebase.auth().signOut();
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;