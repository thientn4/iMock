import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Account() {
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
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'white'
        },
        container:{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'
        },
        btn:{
            color:'white',
            padding:'0.03in',
            borderRadius:'0.075in',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            fontSize:'0.2in',
            userSelect:'none',
            width:'100%'
        }
    }
    return (
      <div style={styles.screen}>
        <div style={styles.container}>
            <img style={{width:'1.4in',paddingBottom:'0.25in'}} src={require("../assets/vertical_logo.png")}/>
            <b>ntmthien01@gmail.com</b>
            <b style={{color:'rgb(102,153,255)'}}>free plan</b>
            <div style={{...styles.btn,backgroundColor:'rgb(102,153,255)',marginTop:'0.4in',marginBottom:'0.1in'}}>sign out</div>
            <div style={{...styles.btn,backgroundColor:'rgb(255,124,128)',marginBottom:'0.25in'}}>premium upgrade</div>
            <u style={{color:'rgb(102,153,255)'}}>what is in premium?</u>
            <img style={{width:'0.5in',paddingTop:'0.45in'}} src={require("../assets/cancel_blue_btn.png")}  onClick={()=>navigate("../home")}/>
        </div>
      </div>
    );
}

export default Account;