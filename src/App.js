import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import {BrowserRouter as Router,Route,Switch,Routes} from 'react-router-dom';
import Login from './pages/Login';
import { useState } from 'react';
import Header from './header/Header';
import { useDataService } from '../src/services/DataService';
import Dashboard from './pages/Dashboard';
import AddEmployee from './components/addEmployee';
import ViewEmployeeDetails from './components/viewEmployeeDetails';
import Loader from './pages/Loader';
import LoaderComponent from './pages/Loader';
import { useLoaderService } from './services/LoaderService';

function App() {

  const { setSharedData, getSharedData } = useDataService();
  const { setLoadingFlag, getLoadingData } = useLoaderService();
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [accessToken,setAccessToken] = useState('')
  const [loginData,setLoginUserData] = useState('')
  const loadingflag = getLoadingData();
  function setLoginFlag(loginFlag){
    console.log(loginFlag)
    setIsLoggedIn(loginFlag)
  }

  function setLoginData(data){
    console.log('data = ==>',data.token)
    console.log(getSharedData())
    setAccessToken(data.token)
    localStorage.setItem('token',accessToken)
    setLoginUserData(JSON.stringify(data))
    //setLoginUserData(getSharedData())
    setSharedData(JSON.stringify(data))
    setLoginUserData(JSON.stringify(data))
    console.log('login data ->> ',loginData)
    localStorage.setItem('userData',JSON.stringify(data))
  }

  return (
    <>
      <Router>
        {isLoggedIn && <Header></Header>}
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setLoginFlag = {setLoginFlag} setLoginUserData= {setLoginData}></Login>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/addEmployee' element={<AddEmployee></AddEmployee>}></Route>
          <Route path='/view_employee' element={<ViewEmployeeDetails></ViewEmployeeDetails>}></Route>
        </Routes>
      </Router>
      {/* <LoaderComponent></LoaderComponent> */}
      { loadingflag && <LoaderComponent></LoaderComponent> }
    </>
  );
}

export default App;
