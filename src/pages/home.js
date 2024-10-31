import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import logo from"../assets/logo.png"
import cancel_btn from"../assets/cancel_btn.png"
import account_blue_btn from"../assets/account_blue_btn.png"
import account_btn from"../assets/account_btn.png"

function Home() {
    const navigate=useNavigate();
    const [questions,setQuestions]=useState([])
    const [records,setRecords]=useState([])
    const [pageType,setPageType]=useState("Questions")
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
        setQuestions([
            {
                question:"Tell me about the time when you worked for Power Settlement. Name some challenges you faced and how you handled them.",
                origin:"Resume"
            },
            {
                question:"Tell me about the time when you worked for Power Settlement. Name some challenges you faced and how you handled them.",
                origin:"Resume"
            },
            {
                question:"Tell me about the time when you worked for Power Settlement. Name some challenges you faced and how you handled them.",
                origin:"Post"
            },
            {
                question:"Tell me about the time when you worked for Power Settlement. Name some challenges you faced and how you handled them.",
                origin:"Post"
            },
            {
                question:"Tell me about the time when you worked for Power Settlement. Name some challenges you faced and how you handled them.",
                origin:null
            },
            {
                question:"Tell me about the time when you worked for Power Settlement.",
                origin:null
            },
            {
                question:"Tell me about the time when you worked for Power Settlement. Name some challenges you faced and how you handled them.",
                origin:null
            },
            {
                question:"Tell me about the time when you worked for Power Settlement. Name some challenges you faced and how you handled them.",
                origin:null
            }
        ])
        setRecords([
            {
                timestamp:"10/27/2024 - 10:30am",
                expire:1,
                time:3600,
                questionCount:10
            },
            {
                timestamp:"10/27/2024 - 10:30am",
                expire:7,
                time:60,
                questionCount:10
            },
            {
                timestamp:"10/27/2024 - 10:30am",
                expire:7,
                time:30,
                questionCount:10
            },
            {
                timestamp:"10/27/2024 - 10:30am",
                expire:7,
                time:62,
                questionCount:10
            },
            {
                timestamp:"10/27/2024 - 10:30am",
                expire:7,
                time:3602,
                questionCount:10
            },
            {
                timestamp:"10/27/2024 - 10:30am",
                expire:7,
                time:3660,
                questionCount:10
            },
            {
                timestamp:"10/27/2024 - 10:30am",
                expire:7,
                time:5420,
                questionCount:10
            }
        ])
    }, []);
    const styles={
        screen:{
            height:'100svh',
            display:'flex',
            flexDirection:'column',
            backgroundColor:'white',
            fontSize:'0.2in',
            position:'relative',
        },
        selectBox:{
            flexGrow:1,
            borderRadius:'0.075in',
            borderColor:'grey',
            border:'solid thin grey',
            height:'0.4in',
            color:'rgb(87,87,87)',
            textAlign:'center'
        },
        page:{
            display:'flex',
            flexDirection:'row',

            
            position: 'absolute',
            top: windowWidth>=700?0:'0.6in',
            bottom: 0,
        },
        half:{
            width:windowWidth>=700?'50vw':'100vw',
            display:'flex',
            flexDirection:'column'
        },
        header:{
            height:'fit-content',
            display:'flex',
            flexDirection:'row',
            padding:'0.1in'
        },
        inputBox:{
            flexGrow:1,
            marginRight:'0.1in',
            borderRadius:'0.075in',
            borderColor:'grey',
            border:'solid thin grey',
            paddingRight:'0.1in',
            paddingLeft:'0.1in',
        },
        smallBtn:{
            color:'white',
            paddingLeft:'0.15in',
            paddingRight:'0.15in',
            borderRadius:'0.075in',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            userSelect:'none'
        },
        recordTitle:{
            flexGrow:1,
            color:'white',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center'
        },
        list:{
            overflowY:'auto',
            flexGrow:1
        },
        footer:{
            height:'fit-content',
            display:'flex',
            flexDirection:'column',
            marginTop:'0.1in',
            userSelect:'none'
        },
        footerRow:{
            display:'flex',
            flexDirection:'row',
            padding:'0.1in',
            paddingTop:0,
            height:'0.4in'
        },
        bigBtn:{
            color:'white',
            paddingLeft:'0.15in',
            paddingRight:'0.15in',
            borderRadius:'0.075in',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            flexGrow:1,
            userSelect:'none'
        },
        listItem:{
            backgroundColor:'white',
            display:'flex',
            flexDirection:'row',
            margin:'0.1in',
            borderRadius:'0.075in'
        },
        questionContent:{
            flexGrow:1,
            textAlign:'left',
            padding:'0.1in'
        },
        deleteBtn:{
            color:'white',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            padding:'0.1in',
            fontSize:'0.2in',
            userSelect:'none',
            borderTopRightRadius:'0.075in',
            borderBottomRightRadius:'0.075in'
        }
    }
    function fromSeconds(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const hoursStr = hours===0?'':`${hours} hours `;
        const minutesStr = minutes===0?'':`${minutes} minutes `;
        const secondsStr = seconds===0?'':`${seconds} seconds`;
      
        return hoursStr+minutesStr+secondsStr;
    }
    return (
      <div style={styles.screen}>
        {windowWidth<700 && <div style={{...styles.header, backgroundColor:'rgb(211,211,211)'}}>
            <select style={styles.selectBox} onChange={(event)=>{setPageType(event.target.value)}}>
                <option>Questions</option>
                <option>Records</option>
            </select>
        </div>}
        <div style={styles.page}>
            {(windowWidth>=700 || pageType==="Questions") && <div style={styles.half}>
                <div style={styles.header}>
                    {windowWidth>=700 && <img style={{height:'0.4in',marginRight:'0.1in'}} src={logo}/>}
                    {windowWidth<700 && <img style={{height:'0.4in',marginRight:'0.1in'}} src={account_blue_btn}  onClick={()=>navigate("../account")}/>}
                    <input style={styles.inputBox} placeholder="Search"/>
                    <div style={{...styles.smallBtn,backgroundColor:'rgb(255,124,128)'}}  onClick={()=>navigate("../countdown")}>Practice</div>
                </div>
                <div style={{...styles.list,backgroundColor:'rgb(211,211,211)'}}>
                    {questions.map((item,index)=>(
                        <div style={styles.listItem} key={index}>
                            <div style={styles.questionContent}>{item.question}<b style={{paddingLeft:'0.15in',color:(item.origin==='Resume'?'rgb(102,153,255)':'rgb(255,124,128)')}}>{item.origin}</b></div>
                            <div style={{...styles.deleteBtn,backgroundColor:'rgb(102,153,255)'}}>X</div>
                        </div>
                    ))}
                </div>
                <div style={styles.footer}>
                    <div style={styles.footerRow}>
                        <input style={styles.inputBox} placeholder="Interview question"/>
                        <div style={{...styles.smallBtn, color:'grey', border:'solid thin grey'}}>Add </div>
                    </div>
                    <div style={styles.footerRow}>
                        <div style={{...styles.bigBtn,backgroundColor:'rgb(102,153,255)',marginRight:'0.05in'}}>Upload resume</div>
                        <div style={{...styles.bigBtn,backgroundColor:'rgb(255,124,128)',marginLeft:'0.05in'}}>Upload job post</div>
                    </div>
                </div>
            </div>}
            {(windowWidth>=700 || pageType==="Records") && <div style={{...styles.half, backgroundColor:'rgb(102,153,255)'}}>
                <div style={{...styles.header, flexDirection:(windowWidth>=700?'row':'row-reverse')}}>
                    <img style={{height:'0.4in'}} src={cancel_btn}/>
                    <div style={styles.recordTitle}>Your record</div>
                    <img style={{height:'0.4in'}} src={account_btn} onClick={()=>navigate("../account")}/>
                </div>
                <div style={{...styles.list,backgroundColor:'rgb(150,220,248'}}>
                    {records.map((item,index)=>(
                        <div style={styles.listItem} key={index}>
                            <div style={styles.questionContent}>
                                <div style={{color:'rgb(102,153,255)'}}><b style={{paddingRight:'0.15in',color:'rgb(87,87,87)'}}>{item.timestamp}</b> {"Expire in "+item.expire+(item.expire<=1?" day":" days")}</div>
                                <div style={{color:'dimgrey'}}>{fromSeconds(item.time)}</div>
                                <div>{item.questionCount+" questions answered and reviewed"}</div>
                            </div>
                            <div style={{...styles.deleteBtn,backgroundColor:'rgb(255,124,128)'}}>X</div>
                        </div>
                    ))}
                </div>
                <div style={{...styles.footer,color:'white',fontSize:'0.2in',margin:'0.1in'}}>
                    <div>You can now store 1 interview session for free. <u onClick={()=>navigate("../account")}>Upgrade to premium</u> for more storage!</div>
                </div>
            </div>}
        </div>
      </div>
    );
}

export default Home;