import React, { useEffect, useState } from 'react'
import { baseURL } from '../config/config';
import axios from "axios";
import { useLoaderService } from '../services/LoaderService';

export default function AssignDesgComponent({ isOpen, onClose, children, user }) {
    console.log('user=>', user)
    const [data, setData] = useState([]);
    const { setLoadingFlag, getLoadingData } = useLoaderService()
    useEffect(() => {
        setLoadingFlag(true)
        let storageData = JSON.parse(localStorage.getItem('userData'))
        console.log(storageData['token'])
        const fetchData = async () => {
            try {
                let url = baseURL + 'api/EMS/fetchData'
                let reqpayload = {
                    userid: user.userId
                }
                let header = {
                    'Authorization': storageData['token']
                }
                const response = await axios.post(url, reqpayload,{headers:header});
                setLoadingFlag(false)
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoadingFlag(false)
            }
        };

        fetchData();
    }, []);
    const [formData, setFormData] = useState({
        userid: user.userId,
        role: user.role,
        designation: '',
        reporter: '',
    });

    const designationArray = [
        { name: 'Manager', roleCode: 'MGR' },
        { name: 'Assistent Manager', roleCode: 'ASM' },
        { name: 'Junior Developer', roleCode: 'JDV' },
        { name: 'Senior Developer', roleCode: 'SRDV' },
        { name: 'Team Lead', roleCode: 'TL' },
        { name: 'Head', roleCode: 'HED' },
    ]

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        if(formData.designation==='' || formData.reporter===''){
            alert('Please Enter Details Properly')
        }else{
            setLoadingFlag(true)
            let reportername = data.find(user => user.userId === formData.reporter);
            let role_code = designationArray.find(roledata=> roledata.name === formData.designation)
            let storageData = JSON.parse(localStorage.getItem('userData'))
            let header = {
                'Authorization': storageData['token']
            }
            let req = {
                designation : formData.designation,
                userId : formData.userid,
                role : formData.role,
                assignedBy : storageData['username'],
                reporterId : formData.reporter,
                repoterName : reportername.name,
                rolecode : role_code.roleCode
            }
            let url = baseURL+'api/EMS/assignedRole'
            axios.post(url ,req ,{headers:header}).then(res=>{
                console.log(res)
                if(res.data.status==true){
                    alert(res.data.message)
                    //onClose()
                }else{
                    alert(res.data.message)
                }
                setLoadingFlag(false)
            }).catch(error=>{
                setLoadingFlag(false)
                console.log(error)
                alert('Something Went Wrong....')
            })
        }
    }
    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Popup Content</h2>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="flex mb-4">
                        <div className="w-1/2 mr-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                User ID:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="userid"
                                type="text"
                                placeholder="Enter your userid"
                                name="userid"
                                value={formData.userid}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="w-1/2 ml-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Role:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="role"
                                type="text"
                                placeholder="Enter your role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <div className="w-1/2 mr-2">
                            <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation:</label>
                            <select
                                id="designation"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none w-full"
                            >
                                <option value="">--Select Designation--</option>
                                {designationArray.map((data) => (
                                    <option key={data.roleCode} value={data.name}>{data.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/2 ml-2">
                            <label htmlFor="reporter" className="block text-sm font-medium text-gray-700">Reporter:</label>
                            <select
                                id="reporter"
                                name="reporter"
                                value={formData.reporter}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none w-full"
                            >
                                <option value="">--Select Reporter--</option>
                                {data.map((val)=>(
                                    <option key={val.userId} value={val.userId}>{val.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* Add select fields here similarly */}
                    <button
                        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                    <button
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        style={{
                            position:'relative',
                            left:'14px'
                        }}
                        onClick={onClose}
                    >
                        Close
                    </button>
                </form>
            </div>
        </div>
    )
}
