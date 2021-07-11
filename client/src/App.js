import "./App.css";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import AddPost from "./AddPost";
import Location from "./Location";
import Signup from "./Signup";
import Trusted from "./Trusted";
import Settings from "./Settings";
import Messages from "./Messages";
import Reset from "./Reset";
import Search from './Search';
import StoryReel from './StoryReel';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <>
          <div className="login">
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/reset" exact>
              <Reset />
            </Route>
            <Route path="/SignUp" exact>
              <Signup />
            </Route>
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
            <Route path="/trusted">
              <Trusted />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/storyReel">
              <StoryReel />
            </Route>
            <Route path="/messages">
              <Messages />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
