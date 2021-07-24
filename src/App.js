import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Login from './Pages/loginPage/login';
import Register from './Pages/registerPage/register';
import Home from './Pages/homePage/home';
import Routing from './Pages/navigationPage/navigation';

function App() {
  return (
    <Routing/>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    //   <Login/>
    //   <Register/>
    //   <Home/>
    // </div>
  );
}

export default App;
