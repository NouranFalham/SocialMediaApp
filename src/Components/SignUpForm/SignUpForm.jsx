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
import { useState } from "react";

export default function SignUpForm() {

    const [accountIsExist , setAccountIsExist]= useState(null)

    const navigate = useNavigate()

    const passwordRegex =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

    const signUpSchema = yup.object({
        name: yup
        .string()
        .required("*name is required")
        .min(3, "*name must be at least 3 characters")
        .max(20, "*name can not be more than 20 characters"),
        email: yup
        .string()
        .required("*email is required")
        .email("*email is invalid"),
        password: yup
        .string()
        .required("*password is required")
        .matches(passwordRegex ,"*password must be minimum eight characters, \n at least one upper case English letter, one lower case English letter, \n one number and one special character"),
        rePassword: yup
        .string()
        .required("*confirm password is required")
        .oneOf([yup.ref('password')], "*password & confirm password must be same"),
        dateOfBirth: yup
        .string()
        .required("*date of birth is required"),
        gender: yup
        .string()
        .required("*gender is required")
        .oneOf(['male','female'], 'please select a valid gender'),
    })

    async function handleSubmit(values){
        try{
            const options = {
            url: "https://linked-posts.routemisr.com/users/signup",
            method: "POST",
            data: values
        }
        let {data} = await axios.request(options)
        console.log(data)
        if(data.message === 'success'){
            toast.success("Account created successfully")
            setTimeout(()=>{
                navigate('/login')
            }, 5000 )
        }
    }
    catch(error) {
        console.log('Catch errorrrr')
        console.log(error)
        setAccountIsExist(error.response.data.error)
    }

    }
    const formik = useFormik({
        initialValues:{
            name:"",
            email:"",
            password:"",
            rePassword:"",
            dateOfBirth:"",
            gender:""
        },
        validationSchema: signUpSchema,
        onSubmit: handleSubmit
    })
console.log(formik)
    
    return (
        <>
            <div className="signup-form bg-gray-100 py-8 min-h-screen flex justify-center items-center">
                <form className="bg-white lg:min-w-lg py-6 px-10 rounded-2xl shadow space-y-5" onSubmit={formik.handleSubmit}>
                    <header className="text-center space-y-3 mb-3">
                        <h2 className="text-3xl font-bold ">Create account</h2>
                        <p>Already have an account? <Link to="/login" className="text-blue-600 ">Sign in</Link></p>
                    </header>

                    <SocialBtns/>

                    <Divider text={'or continue with email'}/>

                    <div className="form-controls space-y-1">
                        <FormInput
                        type={'test'}
                        id={'name'}
                        name={'name'}
                        labelText={'Full Name'}
                        placeholder={"Enter your full name" }
                        icon={faUser}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.name}
                        touched={formik.touched.name}
                        />

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
                            setAccountIsExist(null)
                        }}
                        onBlur={formik.handleBlur}
                        error={formik.errors.email}
                        touched={formik.touched.email}
                        />
                        {accountIsExist? <p className="text-red-500">*{accountIsExist}</p>:null}

                        <FormInput
                        type={'password'}
                        id={'password'}
                        name={'password'}
                        labelText={'Password'}
                        placeholder={"Create a strong password"  }
                        icon={faLock}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.password}
                        touched={formik.touched.password}
                        />

                        <FormInput
                        type={'password'}
                        id={'rePassword'}
                        name={'rePassword'}
                        labelText={'Confirm password'}
                        placeholder={"Re-enter your password" }
                        icon={faLock}
                        value={formik.values.rePassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.rePassword}
                        touched={formik.touched.rePassword}
                        />
                        
                        <div className="flex items-center gap-3 *:grow">

                            <FormInput
                                type={'date'}
                                id={'dateOfBirth'}
                                name={'dateOfBirth'}
                                labelText={'Date of birth'}
                                icon={faCalendar}
                                value={formik.values.dateOfBirth}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.dateOfBirth}
                                touched={formik.touched.dateOfBirth}
                            />

                            <div className="gender">
                                <label htmlFor="gender" className="text-sm mb-1">Gender</label>
                                <div className="relative">
                                    <select id="gender"
                                    className="form-control"
                                    name="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    >
                                        <option>Select your gender</option>
                                        <option>male</option>
                                        <option>female</option>
                                    </select>
                                    <FontAwesomeIcon icon={faVenusMars} className=" text-sm text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"/>
                                </div>
                                {formik.errors.gender && formik.touched.gender? <p className="text-red-500">{formik.errors.gender}</p>:""}
                            </div>

                        </div>
                    </div>

                    <button type="submit" disabled={!(formik.isValid && formik.dirty ) || formik.isSubmitting || accountIsExist} className="btn w-full py-3 bg-linear-to-r from-blue-950 to-blue-800 border-none text-white font-bold disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-500">
                        {formik.isSubmitting? <>
                        <span>Creating your account</span>
                        <FontAwesomeIcon icon={faSpinner} spin/>
                        </>:
                        <><span>Create account</span>
                        <FontAwesomeIcon icon={faArrowRight}/></>}
                    </button>

                </form>
            </div>
        </>
    )
}
