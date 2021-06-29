import "./App.css";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import AddPost from "./AddPost";
import Location from "./Location";
import Signup from "./Signup";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <>
          <div className="login">
            <Login />
            <Signup />
          </div>
        </>
      ) : (
        <>
          <div className="app1">
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/addpost">
              <AddPost />
            </Route>
            <Route path="/location">
              <Location />
            </Route>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
