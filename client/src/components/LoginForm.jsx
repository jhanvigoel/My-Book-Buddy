import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext.jsx';

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

    const { login } = useContext(AuthContext);
    const [submitting,setSubmitting] = useState(false);
    const [error,setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        if (!form.email || !form.password){
            setError('Please fill in both fields');
            return;
        }
        setSubmitting(true);
        try {
            const result = await login(form.email, form.password);
            if (!result?.success) {
                setError(result?.error?.message || 'Login failed');
                return;
            }
            navigate('/dashboard');
        } catch (err){
            setError(err?.message || 'Unexpected error');
        } finally {
            setSubmitting(false);
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

            {error && (
                <div className="px-4 py-3 mb-4 rounded bg-red-100 text-red-700 text-sm">
                    {error}
                </div>
            )}

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

                                <button
                                    type = "submit"
                                    disabled={submitting}
                                    className = "mt-4 px-6 py-4 rounded-full bg-black font-bold text-3xl text-white hover:bg-gray-800 hover:-translate-y-2 transition-transform border disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Logging in...' : 'Login'}
                                </button>

                <div className = "mt-8 text-1xl items-center justify-center text-center">
                    Don't have an account? <button type = "button" className = "underline hover:-translate-y-1" onClick = {() => {navigate('/signup')}}>Sign Up</button>
                </div>
            </div>
        </form>
  )
}

export default LoginForm