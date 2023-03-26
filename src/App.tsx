import { useAuthState } from "react-firebase-hooks/auth";
import Auth from "./Auth";
import EventCreationForm from "./Components/EventCreation";
import Loader from "./Components/Loader/Loader";
import UserEvents from "./Components/UserEvents";
import { auth } from "./firebase";
import globalStyles from "./global.module.css";
const signOut = () => {
  auth.signOut();
};

function App() {
  const [user, loadingUser] = useAuthState(auth);
  const showLogin = !user && !loadingUser;
  return (
    <>
      <Loader show={loadingUser} />
      {showLogin && <Auth />}
      {user && (
        <div>
          <h1>Welcome, {user.displayName || user.email}!</h1>
          <button onClick={signOut}>Sign Out</button>
          <EventCreationForm userId={user.uid} />
        </div>
      )}
      {user && <UserEvents userId={user.uid} />}
    </>
  );
}

export default App;
