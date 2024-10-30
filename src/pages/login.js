import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login() {
    const navigate=useNavigate();
    useEffect(() => {
      //if(localStorage.getItem('email'))navigate("home")
    }, []);
    const login = async () => {
        navigate("home")
    };
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
            <div style={styles.logo}><img style={{height:'0.7in'}} src={require("../assets/horizontal_logo.png")}/></div>
            <div style={styles.nonLogo}>
                <div style={styles.login}>
                    <div style={{width: 'fit-content'}}>
                        <div style={styles.bigWelcome}>Welcome to iMock</div>
                        <div style={styles.smallWelcome}>Let's start acing those interviews!</div>
                        <img style={{width:'2in'}} src={require("../assets/login_btn.png")} onClick={login}/>
                    </div>
                </div>
                <div style={styles.login}>
                    <img style={{width:'38vw'}} src={require("../assets/login_art.jpg")}/>
                </div>
            </div>
      </div>
    );
}

export default Login;