import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import horizontal_logo from"../assets/horizontal_logo.png"
import login_art from"../assets/login_art.png"

function Login() {
    const navigate=useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    useEffect(() => {
        if(localStorage.getItem('token'))navigate("home")
    }, []);
    const login = async(obj)=>{
        axios({
            url:process.env.REACT_APP_BACKEND+'account/account',
            method:'POST',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'token':obj.credential
            }
        }).then((response)=>{
            if(response.data.status==="success"){
                localStorage.setItem('token', obj.credential)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('documents', response.data.documents)
                localStorage.setItem('interviews', response.data.interviews)
                localStorage.setItem('resume', response.data.resume)
                localStorage.setItem('jobpost', response.data.jobpost)
                navigate("home")
            }
            else alert("Failed to login")
        }).catch((error)=>{
            alert("Failed to login")
        })
    }
    const styles={
        screen:{
            width:'100vw',
            height:'100svh',
            display:'flex',
            flexDirection:'column',
            backgroundColor:'white',
        },
        login:{
            display:'flex',
            flexDirection:'column',
            textAlign:'left',
            justifyContent:'center',
            alignItems:'center'
        },
        nonLogo:{
            width:'100%',
            height:'100%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-around'
        },
        logo:{
            display:'flex',
            justifyContent:'left',
            paddingLeft:'0.2in',
            paddingTop:'0.2in'
        },
        nonArt:{
            flexGrow:1, 
            display:'flex', 
            flexDirection:'column'
        },
        bigWelcome:{
            paddingBottom:'0.2in',
            fontSize:'0.4in',
            color:'rgb(58,58,58)',
            fontWeight:'bold'
        },
        smallWelcome:{
            paddingBottom:'0.2in',
            fontSize:'0.2in',
            color:'rgb(89,89,89)'
        }
    }
    return (
      <div style={styles.screen}>
            <div style={styles.logo}><img style={{height:'0.55in'}} src={horizontal_logo}/></div>
            <div style={styles.nonLogo}>
                <div style={styles.login}>
                    <div style={{width: 'fit-content'}}>
                        <div style={styles.bigWelcome}>Welcome to iMock</div>
                        <div style={styles.smallWelcome}>Let's start acing those interviews!</div>
                        <div style={{width:'fit-content'}}>
                            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                                <GoogleLogin 
                                    shape="circle"
                                    size="medium"
                                    onSuccess={(credential)=>login(credential)}
                                />
                            </GoogleOAuthProvider>
                        </div>
                    </div>
                </div>
                {windowWidth>=700 && <div style={styles.login}>
                    <img style={{width:'38vw'}} src={login_art}/>
                </div>}
            </div>
      </div>
    );
}

export default Login;