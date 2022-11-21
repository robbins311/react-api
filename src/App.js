// import logo from './logo.svg';
import "./App.css";
// import ReactAsyncUsers from "./ReactAsyncUsers";
import Users from "./Users";
import { UsersProvider } from "./UsersCotnext";

function App() {
  return (
    <>
      <UsersProvider>
        <Users />
      </UsersProvider>
      {/* <ReactAsyncUsers /> */}
    </>
  );
}

export default App;
