import LoginScreen from './view/screen/LoginScreen'
export default function LoginScreenAuth(){
    async function loginEmailPassword(email, password) {
    // Create an anonymous credential
        const credentials = Realm.Credentials.emailPassword(email, password);
        try {
      // Authenticate the user
        const user = await LoginScreen.registerUser(credentials);
        // `App.currentUser` updates to match the logged in user
        console.assert(user.id === app.currentUser.id);
        return user;
     } catch (err) {
        console.error("Failed to log in", err);
        }
    
  
  const user = await loginEmailPassword("joe.jasper@example.com", "passw0rd");
  console.log("Successfully logged in!", user); }
}
  