import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";

export default function SignIn({ closePopup }) {

    useEffect(() => {
        // Add class to disable scrolling
        document.body.style.overflow = 'hidden';

        // Cleanup function to remove class
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const closemodel = () => {
        closePopup();
    };

    const { navigate } = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().email("Invalid email address*").required("Required*"),
            password: Yup.string().min(8, "Password should have at least 8 characters*").max(40, "Password should have at most 40 characters*").required("Required*"),
        }),

        onSubmit: (values, { setSubmitting }) => {
            const { username, password } = values;

            axios.post("http://localhost:8000/imager/login", { username, password })
                .then(() => {
                    alert("You have signed in successfully");
                    navigate('/profile');
                })
                .catch((err) => {
                    console.error(err);
                    alert("Sign in failed. Please check your credentials and try again.");
                    navigate('/profile');
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    })

    return (
        <div
            id="maincnt"
            onClick={closemodel}
            className="w-screen h-screen top-0 bottom-0 left-0 right-0 fixed flex justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="bg-slate-800 p-10 rounded-2xl mx-auto my-auto relative">

                <button className="bg-slate-700 px-1.5 py-1.5 rounded-md text-amber-300 font-bold hover:outline outline-1 absolute top-6 right-6"
                    onClick={closePopup}
                ><IoClose />
                </button>

                <h1 className="font-bold text-amber-300 text-3xl flex justify-center -mt-6 mb-6">Log In</h1>
                <form className="text-amber-300 text-start text-lg" onSubmit={formik.handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="username" className="block mb-1.5">Username :</label>
                        <input
                            id="username"
                            type="text"
                            className="text-neutral-200 w-96 outline-0 bg-slate-800 border-b-2 h-10 ps-3 border-neutral-200 focus:bg-slate-900 "
                            {...formik.getFieldProps('username')}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="text-red-500">{formik.errors.username}</div>
                        ) : null}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-1.5">Password :</label>
                        <input
                            id="password"
                            type="password"
                            className="text-neutral-200 w-96 outline-0 bg-slate-800 border-b-2 h-10 ps-3 border-neutral-200 focus:bg-slate-900"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <button type="submit" className="bg-slate-700  px-5 py-1.5 mt-3 rounded-md text-amber-300 font-bold hover:outline outline-1" disabled={formik.isSubmitting}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}
