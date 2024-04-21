import React, { useState } from 'react'
import { useDataService } from '../services/DataService';
import { baseURL } from '../config/config';
import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import AssignDesg from './AssignDesg';
import { useLoaderService } from '../services/LoaderService';
import AssignDesgComponent from './AssignDesgComponent';

export default function ViewEmployeeDetails() {
    const { setSharedData, getSharedData } = useDataService();
    const { setLoadingFlag, getLoadingData } = useLoaderService()
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState('');
    const [userInfromation, setUserInfromation] = useState([]);
    const [popupShow, setPopupShow] = useState(false)
    const [error, setError] = useState({
        usernameError: {
            hasError: false,
            errorMessage: ''
        },
        userIdError: {
            hasError: false,
            errorMessage: ''
        },
        roleError: {
            hasError: false,
            errorMessage: ''
        }
    })
    function onChangeInput(e, fieldName) {
        if (fieldName === 'username') {
            setUsername(e.target.value)
            validateRequest(fieldName, e.target.value)
        }
        if (fieldName === 'userId') {
            setUserId(e.target.value)
            validateRequest(fieldName, e.target.value)
        }
        if (fieldName === "role") {
            setRole(e.target.value);
            validateRequest(fieldName, e.target.value)
        }
    }

    function validateRequest(fieldName, value) {
        if (fieldName === 'username') {
            if (value !== '') {
                console.log(value)
                let regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]*$/
                if (!regex.test(value)) {
                    setError(prevValue => ({
                        ...prevValue,
                        usernameError: { hasError: true, errorMessage: "Username should contain at least one number and one alphabet." }
                    }))
                } else if (value > 0 && value < 8) {
                    setError(prevValue => ({
                        ...prevValue,
                        usernameError: { hasError: true, errorMessage: "Length Should Be 10." }
                    }))
                } else {
                    setError(prevValue => ({
                        ...prevValue,
                        usernameError: { hasError: false, errorMessage: "" }
                    }))
                }
                console.log(error)
            } else {
                setError(prevValue => ({
                    ...prevValue,
                    usernameError: { hasError: false, errorMessage: "" }
                }))
            }
        }
        if (fieldName === 'userId') {
            if (value !== '') {
                let useridRegex = /^\d+$/
                if (!useridRegex.test(value)) {
                    setError(prevValue => ({ ...prevValue, userIdError: { hasError: true, errorMessage: 'Should be a number' } }))
                } else if (value > 0 && value < 10) {
                    setError(prevValue => ({ ...prevValue, userIdError: { hasError: true, errorMessage: 'Should be of Length 10.' } }))
                } else {
                    setError(prevValue => ({ ...prevValue, userIdError: { hasError: false, errorMessage: '' } }))
                }
            } else {
                setError(prevValue => ({
                    ...prevValue,
                    userIdError: { hasError: false, errorMessage: "" }
                }))
            }
        }
    }

    async function onSearch(e) {
        e.preventDefault();
        let userData = JSON.parse(getSharedData() ? getSharedData() : localStorage.getItem('userData'))
        if (error.usernameError.hasError || error.userIdError.hasError) {
            alert('Entered Query are not valid')
        } else if (userId === '' && username === '' && role === '') {
            alert('Enter atleast one Search Query')
        }
        else {
            setLoadingFlag(true)
            let queryReq = {
                userid: error.userIdError.hasError ? '' : userId,
                role: role.length > 0 ? role : '',
                username: error.usernameError.hasError ? '' : username
            }

            let header = {
                'Authorization': userData['token']
            }
            let url = baseURL + 'api/EMS/getUserData'
            await axios.post(url, queryReq, { headers: header }).then((response) => {
                console.log("Response from server", response)
                setLoadingFlag(false)
                if (response.data.success == true) {
                    //toast.success(response.data.message ? response.data.message : 'User Data Fetched Succesfull...')
                    alert(response.data.message ? response.data.message : 'User Data Fetched Succesfull...')
                    let data = response.data.data
                    setUserInfromation(prevValue => ({
                        ...prevValue, data
                    }))
                    //console.log('userInfo =>',userInfromation)
                } else {
                    alert(response.data.message)
                    //toast.warning(response.data.message)
                    setUserInfromation([])
                }
            }).catch((err) => {
                setLoadingFlag(false)
                console.log(e)
                alert("Something went wrong")
                //toast.error("Something went wrong")
            })
        }
    }

    async function onClickEdit(e, userid) {
        console.log(userid)
    }

    async function onClickAssign(e) {
        e.preventDefault()
        setPopupShow(true)
    }
    const str = 'hi'
    return (
        <>
            <div>
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">View Employee Details</h1>
                    </div>
                </header>
                <div className="container mx-auto p-4">
                    <div className="bg-white-200 p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-4">Enter Search Criteria</h2>
                        <div className="flex flex-col md:flex-row md:items-center">
                            <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <input id="username" type="text" className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={username} onChange={(e) => onChangeInput(e, 'username')} onBlur={(e) => onChangeInput(e, 'username')} />
                                {error.usernameError.hasError && <p><small style={{ color: 'red' }}>{error.usernameError.errorMessage}</small></p>}
                            </div>
                            <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4">
                                <label htmlFor="userid" className="block text-sm font-medium text-gray-700">User ID</label>
                                <input id="userid" type="text" className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={userId} onChange={(e) => onChangeInput(e, 'userId')} onBlur={(e) => onChangeInput(e, 'userId')} />
                            </div>
                            <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4">
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">User Role</label>
                                <select id="role" className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={role} onChange={(e) => onChangeInput(e, 'role')}>
                                    <option value=''>--Select--</option>
                                    <option value='ADMIN'>Admin</option>
                                    <option value='SUBADMIN'>Sub-Admin</option>
                                    <option value='USER'>User</option>
                                </select>
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0" style={{
                                position: "relative",
                                top: "11px"
                            }} onClick={(e) => onSearch(e)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5-5m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <hr></hr>
                    <br></br>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Uaer Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        User Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        User Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Assign Role
                                    </th>
                                </tr>
                            </thead>
                            {userInfromation.data?.length > 0 && <tbody>
                                {userInfromation.data?.map((user, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.role}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.userId}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" style={{ cursor: 'pointer' }} onClick={(e) => onClickEdit(e, user.userId)}>Edit</a>
                                            {/* <span /> */}
                                            {/* <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" style={{ cursor: 'pointer', position: 'relative', left: '17px' }} onClick={(e) => onClickAssign(e)}>Assign Designation</a> */}
                                        </td>
                                        {user.role!='ADMIN' && <td>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={(e) => onClickAssign(e)}
                                            >
                                                Open Popup
                                            </button>
                                            {popupShow && <AssignDesgComponent isOpen={popupShow} onClose={() => setPopupShow(false)} user={user}></AssignDesgComponent>}
                                        </td> }
                                    </tr>
                                ))}
                            </tbody>}
                            {userInfromation.length == 0 && <h1>NO Data Found</h1>}
                        </table>
                    </div>
                    {/* <AssignDesg isOpen={popupShow} onClose={() => setPopupShow(false)}>
                        {/* <h2 className="text-lg font-bold">Assign Designation To User</h2>
                        <p>Modal Content Goes Here</p> 
                    </AssignDesg> */}
                </div>
            </div>
            {/* <ToastContainer></ToastContainer> */}
        </>
    )
}
