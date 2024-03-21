import "./login.css"
// import Logo from "../../assets/header.png"
import NavBar from "../../components/NavBar/NavBar";
import img from "../../assets/header.png";
import React, { useState, useEffect } from 'react';
import CLogin from "../connections/Login";
import { saveToken } from "../authentication/authentication";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../authentication/authentication";
const Login = () => {
    const navigate = useNavigate();
    const [message,setMessage] = useState();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
        };

        handleResize(); // Initial check

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
        
    }, []);

    useEffect(()=>{
        const checkLogin = async()=>{
        
        const isLogged= await isLoggedIn();
        if(isLogged===true){
          navigate("/admin")
        }
      } 
      checkLogin();
    });
    const form = () => {
        return (

            <div className="row g-0">
                <div className="col-12 col-md-6 text-bg-primary" style={{ col: "#5957f9" }}>
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="col-10 col-xl-8 py-3">
                            <img className="img-fluid rounded mb-4" loading="lazy" src={img} width="100%" height="80" alt="BootstrapBrain Logo" />
                            <hr className="border-primary-subtle mb-4" />

                            <h2 className="h1 mb-4">Admin login</h2>
                            <p className="lead m-0">Seamless Assessment Gate Application</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="card-body p-3 p-md-4 p-xl-5">
                        <div className="row">
                            {message !==undefined? <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Oops!</strong> {message}
                            </div> :<></>}
                           
                            <div className="col-12">
                                <div className="mb-5">
                                    <h3>Log in</h3>
                                </div>
                            </div>
                        </div>
                        <form action="#!" onSubmit={LoginNow}>
                            <div className="row gy-3 gy-md-4 overflow-hidden">
                                <div className="col-12">
                                    <label htmlFor="text" className="form-label">Email <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" name="username" id="username" placeholder="Username" required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                                    <input type="password" className="form-control" name="password" id="password" autoComplete="on" required />
                                </div>
                                <div className="col-12">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="remember_me" id="remember_me" />
                                        <label className="form-check-label text-secondary" htmlFor="remember_me">
                                            Keep me logged in
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-grid">
                                        <button className="btn bsb-btn-xl btn-primary" type="submit" width="100%" >Log in now</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    const LoginNow = (e) => {
        e.preventDefault();
        const userName = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const response = async () => { 
            const res=await CLogin(userName, password);
            console.log(res)
            if(res.err === true){
                if(res.response.status === 401){
                    console.log("___________")
                    setMessage(res.response.data.message);
                }
                
            }
            else{
                saveToken(res.response.data.token);
                navigate("/admin");
            }
         };
        response();
    }
    return (
        <>
            <NavBar width="100%" />
            <section className="p-3 p-md-4 p-xl-5">
                <div className="container">
                    {isMobile ? form() : <div className="card" >
                        {form()}
                    </div>}

                </div>
            </section>
        </>
    )
}
export default Login;