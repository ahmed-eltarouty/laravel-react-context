import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProviders";

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser , setToken} = useStateContext();
    const [errors, setErros] = useState()

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email : emailRef.current.value,
            password : passwordRef.current.value
        }
        setErros(null)
        axiosClient.post('/login',payload)
        .then(({data})=>{
            setUser(data.user);
            setToken(data.token)
        })
        .catch(error =>{
            const response = error.response;
            if(response && response.status === 422){
                if(response.data.errors){
                    setErros(response.data.errors)
                }else{
                    setErros({
                        email:[response.data.message]
                    })
                }
            }
        })
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                  <h1 className="title">
                    Login into your account
                  </h1>
                  {errors && <div className="alert">
                        {Object.keys(errors).map(key =>(
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>}
                    <input ref={emailRef} placeholder="Email" type="email" />
                    <input ref={passwordRef} placeholder="Password" type="password" />
                    <button className="btn btn-block" type="sumbit">
                        Login
                    </button>
                    <p className="message">
                        Not Registered ?{" "}
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
