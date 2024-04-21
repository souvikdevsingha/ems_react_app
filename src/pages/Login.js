import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { baseURL } from "../config/config";
import { useNavigate } from "react-router-dom";
import { useDataService } from '../services/DataService';
import { useLoaderService } from "../services/LoaderService";
//import configuration from "..
export default function Login({isLoggedIn,setLoginFlag,setLoginUserData}) {
    const { setSharedData, getSharedData } = useDataService();
    const { setLoadingFlag, getLoadingData } = useLoaderService()
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errorPair,setErrorPair] = useState(
      {
        hasError : false,
        errorMessgae : ''
      }
    )
    const [passwordError,setPasswordError] = useState({
      hasPasswordError : false,
      errorMessgae :''
    })
    const [userNameErrorType, setUserNameErrorType] = useState({
      isNumeric : true,
      isAlphaNumeric : true
    })
    const alpaNumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]*$/;
    const numericRegex = /^\d+$/;
    const navigate = useNavigate()
    function onUserNameChange(e){
      e.preventDefault();
      setUsername(e.target.value)
      validateInput('username')
    }

    function onPasswordChange(e){
      e.preventDefault();
      setPassword(e.target.value)
      validateInput('password')
    }

    function validateInput(fieldName){
      if(fieldName==='username'){
        if(username.length===0){
          setErrorPair({hasError:true,errorMessgae:'Username cannot be empty'})
        }else{
          let isAlphaNumeric = alpaNumericRegex.test(username)
          let isNumeric = numericRegex.test(username);
          setUserNameErrorType({
            isNumeric : isNumeric,
            isAlphaNumeric : isAlphaNumeric
          })
          if(userNameErrorType.isAlphaNumeric === false && userNameErrorType.isNumeric===false){
            setErrorPair({
              hasError: true, errorMessgae : "Enter a Valid Username"
            })
          }else if (username.length<8){
            setErrorPair({
              hasError: true, errorMessgae : "Minium Length Would be 8 character"})
          }else{
            setErrorPair({
              hasError: false, errorMessgae : ""
            })
          }
        }
      }
      if(fieldName==='password'){
        if(password.length===0){
          setPasswordError({
            hasPasswordError : true,
            passwordErrorMessage : 'Password cannot be empty'
          })
        }else if(password.length<8){
          setPasswordError({
            hasPasswordError : true,
            errorMessgae : "Password must be of length 8 character"
          })
        }else{
          setPasswordError({
            hasPasswordError : false,
            errorMessgae : ""
          })
        }
      }
    }

    async function onsubmit(e){
      e.preventDefault();
      validateInput('username')
      validateInput('password')
      if(errorPair.hasError===true || passwordError.hasPasswordError ===true){
        toast.error(errorPair.hasError?errorPair.errorMessgae : passwordError.passwordErrorMessage)
      }else{
      setLoadingFlag(true)
        let request = {
          searchvalue : username,
          password : password
        }
        let uri = baseURL+'api/EMS/login';
        await axios.post(uri,request).then((response)=>{
          console.log("Response from server", response)
          setLoadingFlag(false)
          if(response.data.success===true){
            setLoginFlag(true)
            setSharedData(JSON.stringify(response.data.data[0]))
            setLoginUserData(response.data.data[0])
            toast.success("Logged in Successfully")
            navigate('/dashboard')
          }else{
            setLoginFlag(false)
            setLoginUserData(response.data.data[0])
            toast.error("Invalid Username or Password")
          }
        }).catch(err=>{
          console.log("Error in login ", err)
          setLoadingFlag(false)
          if(err){
            setLoginFlag(false)
            setLoginUserData([])
            toast.error("Server Error Please try again after some time")
          }
        })
      }
    }
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" method="POST">
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username / User Id
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={username} onChange={e =>onUserNameChange(e)} onBlur={e=>onUserNameChange(e)}
                  />
                </div>
                {errorPair.hasError && <p style={{color:'red'}}>{errorPair.errorMessgae}</p>}
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={password} onChange={e =>onPasswordChange(e)} onBlur={e=>onPasswordChange(e)}
                  />
                </div>
                {passwordError.hasPasswordError && <p style={{color : 'red'}}>{passwordError.errorMessgae}</p>}
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={e => onsubmit(e)}
                >
                  Sign in
                </button>
              </div>
            </form>
  
            {/* <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </a>
            </p> */}
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </>
    )
  }
  