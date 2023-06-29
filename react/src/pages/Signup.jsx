import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProviders";
import axiosClient from "../axios-client";

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors , setErrors] = useState(null)
    const {setUser,setToken} = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        setErrors(null)
        // console.log(payload)
        axiosClient.post("/signup",payload)
        .then(({data}) =>{
          setUser(data.user);
          setToken(data.token);
        })
        .catch(error => {
          const response = error.response;
          if(response && response.status === 422){
            console.log(response.data.errors);
            setErrors(response.data.errors)
          }
        })
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Sign up for free</h1>

                    {errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}    
                    </div>}

                    <input ref={nameRef} placeholder="Full Name" type="text" />
                    <input
                        ref={emailRef}
                        placeholder="Email Address"
                        type="email"
                    />
                    <input
                        ref={passwordRef}
                        placeholder="Password"
                        type="password"
                    />
                    <input
                        ref={passwordConfirmationRef}
                        placeholder="Password Confirmation"
                        type="password"
                    />
                    <button className="btn btn-block" type="sumbit">
                        Sign Up
                    </button>
                    <p className="message">
                        Already Registered ?<Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
