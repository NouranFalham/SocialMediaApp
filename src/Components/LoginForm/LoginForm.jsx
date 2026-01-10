import { faArrowRight, faCalendar, faEnvelope, faLock, faSpinner, faUser, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useFormik } from "formik";
import {  Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as yup from 'yup'
import FormInput from "../ui/FormInput/FormInput";
import Divider from "../ui/Divider/Divider";
import SocialBtns from "../ui/SocialBtns/SocialBtns";
import { useContext, useState } from "react";
import {  AuthContext } from "../../assets/Context/Auth.context/Auth.context";

export default function LoginForm() {

    const {token, setToken} =useContext(AuthContext)

    const [wrongInfo, SetWrongInfo] = useState(null)

    const navigate = useNavigate()

    const passwordRegex =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

    const LoginSchema = yup.object({
        email: yup
        .string()
        .required("*email is required")
        .email("*email is invalid"),
        password: yup
        .string()
        .required("*password is required")
        .matches(passwordRegex ,"*password must be minimum eight characters, \n at least one upper case English letter, one lower case English letter, \n one number and one special character"),
    })

    async function handleSubmit(values){
        try{
            const options = {
            url: "https://linked-posts.routemisr.com/users/signin",
            method: "POST",
            data: values
        }
        let {data} = await axios.request(options)
        console.log(data)
        if(data.message === 'success'){
            toast.success("Welcome Back")
            setToken(data.token)
            localStorage.setItem("token" , data.token)
            setTimeout(()=>{
                navigate('/')
            }, 5000 )
        }
    }
    catch(error) {
        SetWrongInfo(error.response.data.error)
    }

    }
    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema: LoginSchema,
        onSubmit: handleSubmit
    })
console.log(formik)
    
    return (
        <>
            <div className="login-form bg-gray-100 py-8 min-h-screen flex justify-center items-center">
                <form className="bg-white lg:min-w-lg py-6 px-10 rounded-2xl shadow space-y-5" onSubmit={formik.handleSubmit}>
                    <header className="text-center space-y-3 mb-3">
                        <h2 className="text-3xl font-bold ">Sign in</h2>
                        <p>Don't have an account? <Link to="/signup" className="text-blue-600 ">Sign up</Link></p>
                    </header>

                    <SocialBtns/>

                    <Divider text={'or continue with email'}/>

                    <div className="form-controls space-y-1">

                        <FormInput
                        type={'email'}
                        id={'email'}
                        name={'email'}
                        labelText={'Email address'}
                        placeholder={"name@example.com" }
                        icon={faEnvelope}
                        value={formik.values.email}
                        onChange={(e)=>{
                            formik.handleChange(e);
                            SetWrongInfo(null)
                        }}
                        onBlur={formik.handleBlur}
                        error={formik.errors.email}
                        touched={formik.touched.email}
                        />

                        <FormInput
                        type={'password'}
                        id={'password'}
                        name={'password'}
                        labelText={'Password'}
                        placeholder={"Enter your password"  }
                        icon={faLock}
                        value={formik.values.password}
                        onChange={(e)=>{
                            formik.handleChange(e);
                            SetWrongInfo(null)
                        }}
                        onBlur={formik.handleBlur}
                        error={formik.errors.password}
                        touched={formik.touched.password}
                        />
                        
                    </div>
                    {wrongInfo? <p className="text-red-500">{wrongInfo}</p>: null} 

                    <button type="submit" disabled={!(formik.isValid && formik.dirty ) || formik.isSubmitting} className="btn w-full py-3 bg-linear-to-r from-blue-950 to-blue-800 border-none text-white font-bold disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-500">
                        {formik.isSubmitting? <>
                        <span>Logging in..</span>
                        <FontAwesomeIcon icon={faSpinner} spin/>
                        </>:
                        <><span>Log in</span>
                        <FontAwesomeIcon icon={faArrowRight}/></>}
                    </button>

                </form>
            </div>
        </>
    )
}
