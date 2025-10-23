import {React,useState} from 'react'
import { Form, useNavigate } from 'react-router-dom'
import axios from 'axios';

const LoginForm = () => {

    const navigate = useNavigate();

    const [form,setForm] = useState({
        email : '',
        password : ''
    })

    function handleChange(e) {

        const {name,value} = e.target;

        setForm(prev => ({...prev,[name]: value}))

    }

    async function handleSubmit(e) {

        e.preventDefault();

        const payload = {

            email : form.email,
            password : form.password
        }

        try{

            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`,payload);

            if (res.data?.error){
                alert(res.data.error);
                return;
            }
            else{
                // Persist JWT token for authenticated requests
                if (res.data?.token) {
                    localStorage.setItem('token', res.data.token);
                }
                alert('login successful');
                navigate('/dashboard');
            }
        }
        catch(err){
            console.log(err);
            alert("Error Logging In");
        }

    }


  return (
        <form className = "grid gap-2" onSubmit = {handleSubmit}>
            <div className = "text-3xl font-bold mb-4 text-center">
                Login To Your Account
            </div>
            <div className = "text-1xl mb-4 text-center text-gray">
                Enter your credentials below to access your account
            </div>

            <div className = "grid gap-4">
                <div className = "text-1xl font-bold text-left">
                    Email
                </div>
                <input type = "email" 
                name = "email"
                placeholder = "Enter your email" 
                className = "w-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                value = {form.email}
                onChange = {handleChange} 
                required />
                
                <div className = "text-1xl font-bold text-left">
                    Password
                </div>
                <input type = "password" 
                name = "password"
                placeholder = "Enter your password" 
                className = "w-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                value = {form.password}
                onChange = {handleChange} 
                required/>

                <button type = "submit" className = "mt-4 px-6 py-4 rounded-full bg-black font-bold text-3xl text-white hover:bg-gray-8 hover:-translate-y-2 transition-transform border">Login</button>

                <div className = "mt-8 text-1xl items-center justify-center text-center">
                    Don't have an account? <button type = "button" className = "underline hover:-translate-y-1" onClick = {() => {navigate('/signup')}}>Sign Up</button>
                </div>
            </div>
        </form>
  )
}

export default LoginForm