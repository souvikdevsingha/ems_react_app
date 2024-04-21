import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { baseURL } from '../config/config';
import { useLoaderService } from '../services/LoaderService';

export default function AddEmployee() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('')
    const [permissionConsent, setPermissionConsent] = useState('')
    const [username, setUsername] = useState('')
    const { setLoadingFlag, getLoadingData } = useLoaderService()
    const [checkbox,setCheckbox] = useState(false)
    var allValid = true
    const [formError, setFormError] = useState({
        firstNameError: {
            hasError: false,
            errorMessage: ''
        },
        lastNameError: {
            hasError: false,
            errorMessage: ''
        },
        emailError: {
            hasError: false,
            errorMessage: ''
        },
        passwordError: {
            hasError: false,
            errorMessage: ''
        },
        roleError: {
            hasError: false,
            errorMessage: ''
        },
        consentError: {
            hasError: false,
            errorMessage: ''
        },
        userNameError: {
            hasError: false,
            errorMessage: ''
        },
        allValidate: false
    })
    function handleChange(e, fieldName) {
        if (fieldName == 'firstName') {
            let fname = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase())
            setFirstName(fname)
            validateInput(fieldName)
        }
        if (fieldName == 'lastName') {
            let lname = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase())
            setLastName(lname);
            validateInput(fieldName)
        }
        if (fieldName == 'email') {
            setEmail(e.target.value)
            validateInput(fieldName)
        }
        if (fieldName == 'password') {
            setPassword(e.target.value)
            validateInput(fieldName)
        }

        if (fieldName == 'role') {
            setRole(e.target.value)
            validateInput(fieldName, e.target.value)
        }

        if (fieldName == 'permissionConsent') {
            setPermissionConsent(e.target.value)
            validateInput(fieldName, e.target.value)
        }

        if (fieldName === 'username') {
            setUsername(e.target.value)
            validateInput(fieldName)
        }
    }

    function validateInput(fieldName, targetvalue = '') {
        if (fieldName == 'firstName') {
            var textRegex = /^[a-zA-Z ]+$/
            if (firstName.length == 0) {
                setFormError(prevValue => ({
                    ...prevValue,
                    firstNameError: { hasError: true, errorMessage: 'First Name not be empty' }
                }))
                console.log(formError)
            } else if (!textRegex.test(firstName)) {
                //setFormError(...formError,{firstNameError:{hasError:true,errorMessage: "Only letters are allowed"}} ) 
                setFormError(prevValue => ({
                    ...prevValue,
                    firstNameError: { hasError: true, errorMessage: 'Only letters are allowed' }
                }))
            } else if (firstName.length < 4) {
                //setFormError(...formError,{firstNameError:{hasError:true,errorMessage: "First Name Should be of length 8"}} )
                setFormError(prevValue => ({
                    ...prevValue,
                    firstNameError: { hasError: true, errorMessage: 'First Name Should be of length 4' }
                }))
            } else {
                //setFormError(...formError,{firstNameError:{hasError:false,errorMessage: ""}} )
                setFormError(prevValue => ({
                    ...prevValue,
                    firstNameError: { hasError: false, errorMessage: '' }
                }))
            }
        }
        if (fieldName == 'lastName') {
            var testRegex = /^[a-zA-Z ]+$/
            if (lastName.length == 0) {
                //setFormError(...formError,{lastNameError:{hasError:true,errorMessage: 'Last Name not be empty'}} )
                setFormError(prevValue => ({
                    ...prevValue,
                    lastNameError: { hasError: true, errorMessage: 'Last Name not be empty' }
                }))
            } else if (!testRegex.test(lastName)) {
                setFormError(prevValue => ({
                    ...prevValue,
                    lastNameError: { hasError: true, errorMessage: "Only letters are allowed" }
                }))
                //setFormError(...formError,{lastNameError:{hasError:true,errorMessage: "Only letters are allowed"}} ) 
            } else {
                setFormError(prevValue => ({
                    ...prevValue,
                    lastNameError: { hasError: false, errorMessage: "" }
                }))
                //setFormError(...formError,{lastNameError:{hasError:false,errorMessage: ""}} )
            }
        }
        if (fieldName === 'email') {
            let emailregex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
            if (email.length === 0) {
                setFormError(prevValue => ({
                    ...prevValue,
                    emailError: { hasError: true, errorMessage: 'Email not be empty' }
                }))
            } else if (!emailregex.test(email)) {
                setFormError(prevValue => ({
                    ...prevValue,
                    emailError: { hasError: true, errorMessage: 'Enter a Valid Email Address' }
                }))
            } else if (email.length < 8 && email.length > 0) {
                setFormError(prevValue => ({
                    ...prevValue,
                    emailError: { hasError: true, errorMessage: 'Email address must contain atleast 8 Character' }
                }))
            } else {
                setFormError(prevValue => ({
                    ...prevValue,
                    emailError: { hasError: false, errorMessage: '' }
                }))
            }
        }
        if (fieldName === 'password') {
            if (password.length == 0) {
                setFormError(prevValue => ({
                    ...prevValue,
                    passwordError: { hasError: true, errorMessage: 'Password not be empty' }
                }))
            } else if (password.length > 0 && password.length < 8) {
                setFormError(prevValue => ({
                    ...prevValue,
                    passwordError: { hasError: true, errorMessage: 'Password Length Should be 8 Character' }
                }))
            } else {
                setFormError(prevValue => ({
                    ...prevValue,
                    passwordError: { hasError: false, errorMessage: '' }
                }))
            }
        }
        if (fieldName === 'role') {
            console.log("role in validate =>", role)
            if (targetvalue == '') {
                setFormError(prevValue => ({
                    ...prevValue,
                    roleError: { hasError: true, errorMessage: 'Please Select A Valid Role' }
                }))
            } else {
                setFormError(prevValue => ({
                    ...prevValue,
                    roleError: { hasError: false, errorMessage: '' }
                }))
            }
        }
        if (fieldName === 'permissionConsent') {
            if (targetvalue == '') {
                setFormError(prevValue => ({
                    ...prevValue,
                    consentError: { hasError: true, errorMessage: 'Please Select A Value' }
                }))
            } else {
                setFormError(prevValue => ({
                    ...prevValue,
                    consentError: { hasError: false, errorMessage: '' }
                }))
            }
        }
        if (fieldName === 'username') {
            let usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]*$/;
            if (username.length == 0) {
                setFormError(prevValue => ({
                    ...prevValue,
                    userNameError: { hasError: true, errorMessage: 'User Name not be empty' }
                }))
            } else if (!usernameRegex.test(username)) {
                setFormError(prevValue => ({
                    ...prevValue,
                    userNameError: { hasError: true, errorMessage: 'Not a valid Username (eg. abc1234)' }
                }))
            } else if (username.length < 8) {
                setFormError(prevValue => ({
                    ...prevValue,
                    userNameError: { hasError: true, errorMessage: 'User Name Should be of length 8' }
                }))
            } else {
                setFormError(prevValue => ({
                    ...prevValue,
                    userNameError: { hasError: false, errorMessage: '' }
                }))
            }
        }
    }

    async function onSubmitForm(event) {
        event.preventDefault();
        if (firstName.length == 0 || lastName.length == 0 || email.length == 0 || password.length == 0
            || role.length == 0 || permissionConsent.length == 0 || username.length === 0) {
            toast.error("All fields are required!")
        }
        else if (!formError.firstNameError.hasError || !formError.lastNameError.hasError || !formError.emailError.hasError
            || !formError.passwordError.hasError || !formError.roleError.hasError || !formError.consentError.hasError ||
            !formError.userNameError.hasError) {
            setLoadingFlag(true)
            let requestPayload = {
                "username": username,
                "email": email,
                "password": password,
                "role": role,
                "haveAllPermission": permissionConsent,
                "name": firstName + ' ' + lastName
            }
            let url = baseURL + 'api/EMS/createUser'
            await axios.post(url, requestPayload).then((response) => {
                setLoadingFlag(false)
                if (response.data.success === true) {
                    toast.success('User created successfully...');
                    onreset(event)
                } else {
                    toast.warning(response.data.message)
                }
            })
                .catch((err) => {
                    setLoadingFlag(false)
                    if (err) {
                        toast.error("Something went wrong!");
                    }
                })
        }
    }

    function onreset(e = null) {
        setUsername(''); setEmail(''); setFirstName(''); setLastName('');
        setPassword(''); setRole(''); setPermissionConsent('')
    }

    const generatePassword = (e) => {
        //e.preventDefault()
        setCheckbox(e.target.checked)
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 9; i++) {
            result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        if(e.target.checked){
            setPassword(result)
            setFormError(prevValue => ({
                ...prevValue,
                passwordError: { hasError: false, errorMessage: '' }
            }))
        }else{
            setPassword('')
        }
    }

    return (
        <>
            <div className="min-h-full">
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Employee Details</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <form action='#' onSubmit={onSubmitForm}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    value={firstName} onChange={(e) => handleChange(e, 'firstName')} onBlur={(e) => handleChange(e, 'firstName')}
                                                />
                                                {formError.firstNameError.hasError && <small style={{ color: 'red' }}>{formError.firstNameError.errorMessage}</small>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    value={lastName} onChange={(e) => handleChange(e, 'lastName')} onBlur={(e) => handleChange(e, 'lastName')}
                                                />
                                                {formError.lastNameError.hasError && <small style={{ color: 'red' }}>{formError.lastNameError.errorMessage}</small>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    value={email} onChange={(e) => handleChange(e, 'email')} onBlur={(e) => handleChange(e, 'email')}
                                                />
                                                {formError.emailError.hasError && <small style={{ color: 'red' }}>{formError.emailError.errorMessage}</small>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>
                                            <div className="mt-2" style={{ width: '500px' }}>
                                                <input
                                                    type="text"
                                                    name="password"
                                                    id="password"
                                                    autoComplete="family-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    value={password} onChange={(e) => handleChange(e, 'password')} onBlur={(e) => handleChange(e, 'password')} disabled={checkbox}
                                                />
                                                <input type='checkbox' value={checkbox} onClick={(e) => generatePassword(e)} /> <label><small>Auto Generate Password</small></label>
                                                <br></br>
                                                {formError.passwordError.hasError && <small style={{ color: 'red' }}>{formError.passwordError.errorMessage}</small>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                                Username
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    autoComplete="family-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    value={username} onChange={(e) => handleChange(e, 'username')} onBlur={(e) => handleChange(e, 'username')}
                                                />
                                                {formError.userNameError.hasError && <small style={{ color: 'red' }}>{formError.userNameError.errorMessage}</small>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                                Role
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="role"
                                                    name="role"
                                                    autoComplete="role-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    value={role} onChange={(e) => handleChange(e, 'role')}
                                                >
                                                    <option value=''>--Select--</option>
                                                    <option value='ADMIN'>Admin</option>
                                                    <option value='SUBADMIN'>Sub-Admin</option>
                                                    <option value='USER'>User</option>
                                                </select>
                                                {formError.roleError.hasError && <small style={{ color: 'red' }}>{formError.roleError.errorMessage}</small>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="permissionConsent" className="block text-sm font-medium leading-6 text-gray-900">
                                                Have All Permission
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="permissionConsent"
                                                    name="permissionConsent"
                                                    autoComplete="permissionConsent-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    value={permissionConsent} onChange={(e) => handleChange(e, 'permissionConsent')}
                                                >
                                                    <option value=''>--Select--</option>
                                                    <option value='true'>True</option>
                                                    <option value='false'>False</option>
                                                </select>
                                                {formError.consentError.hasError && <small style={{ color: 'red' }}>{formError.consentError.errorMessage}</small>}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={(e) => onreset(e)}>
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
            <ToastContainer></ToastContainer>
        </>
    )
}
