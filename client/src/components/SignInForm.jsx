import {React,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosPublic } from '../api/axios';
import { Trophy } from 'lucide-react';

const SignInForm = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    function handleChange(e){
        const {name,value} = e.target;
        setForm(prev => ({...prev,[name]: value}))
    }

    async function handleSubmit(e){

        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const payload = {
            name : form.name,
            email : form.email,
            phone : form.phone,
            password : form.password
        }

        try{
            const res = await axiosPublic.post('/signup',payload);

            if (res.data?.error){
                alert(res.data.error);
                return;
            }
            else{
                alert("Account created");
                navigate('/login');
            }
        }
        catch(err){
            console.log(err);
            alert("Error creating account")
        }
    }

  return (
    
    <form className = "grid gap-2" onSubmit = {handleSubmit}>
            <div className = "text-3xl font-bold mb-4 text-center">
                Make A New Account
            </div>
            <div className = "text-1xl mb-4 text-center text-gray">
                Enter your credentials below to create a new account
            </div>

            <div className = "grid gap-4">
                <div className = "text-1xl font-bold text-left">
                    Name
                </div>
                <input 
                name = "name"
                type = "name" 
                placeholder = "Enter your full Name" 
                className = "w-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                value = {form.name}
                onChange = {handleChange} required/>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className = "text-1xl font-bold text-left">Email</div>
                        <input 
                        name = "email"
                        type="email" 
                        placeholder="Enter your email" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        value = {form.email}
                        onChange = {handleChange} required/>
                    </div>

                    <div>
                        <div className = "text-1xl font-bold text-left">Phone Number</div>
                        <input type="tel" 
                        name = "phone"
                        placeholder="Enter your phone number" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        value = {form.phone}
                        onChange = {handleChange} required/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className = "text-1xl font-bold text-left">Password</div>
                        <input 
                        name = "password"
                        type="password" 
                        placeholder="Enter your password" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        value = {form.password}
                        onChange = {handleChange} required/>
                    </div>

                    <div>
                        <div className = "text-1xl font-bold text-left">Confirm Password</div>
                        <input 
                        name = "confirmPassword"
                        type="password" 
                        placeholder="Confirm your password" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        value = {form.confirmPassword}
                        onChange = {handleChange} required/>
                    </div>
                </div>

                <button type = "submit" className = "mt-4 px-6 py-4 rounded-full bg-black font-bold text-3xl text-white hover:bg-gray-8 hover:-translate-y-2 transition-transform border">SignUp</button>

                <div className = "mt-8 text-1xl items-center justify-center text-center">
                    Already have an account? <button className = "underline hover:-translate-y-1" onClick = {() => {navigate('/login')}}>Sign In</button>
                </div>
            </div>
        </form>
  )
}

export default SignInForm