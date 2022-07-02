import React from 'react';
import "../CSS/register.css"
import { Tag } from 'antd';


export class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            username:"",
            password:"",
            password_again:"",
            live:"",
            address:"",
            email:"",
            telephone:"",

            usernameState:"NOINPUT",
            usernameText:'Please Input username :)',
            usernameColor:'#108ee9',

            passwordState:"NOPASSWORD",
            passwordText:'Please Input password and password(again):)',
            passwordColor:'#108ee9',

            emailState:"NOEMAIL",
            emailText:'Please Input your email:)',
            emailColor:'#108ee9',

            liveInput:true,
            addressInput:true,
            teleNotInput:true,
            emailNotInput:true,
            colorList:['#108ee9','#f50','#87d068'],

        }
    }

    set_username(e){
        let needle=e.target.value
        if(needle===""){
            this.setState({
                username:needle,
                usernameState:"NOINPUT",
                usernameColor:'#108ee9',
                usernameText:'Please Input username :)'
            })
        }
        else {
            fetch("http://localhost:8080/checkduplicate?username=" + needle)
                .then(response => response.json())
                .then(data => {
                    if (data === "Duplicate Username"){
                        this.setState({
                            username: needle,
                            usernameState: "DUP",
                            usernameColor: '#f50',
                            usernameText: 'The username has been used by another user:)'
                        })
                    }
                    else {
                        this.setState({
                            username: needle,
                            usernameState: "RIGHT",
                            usernameColor: '#87d068',
                            usernameText: 'The username can be used :)'
                        })
                    }
                }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
        }
    }

    set_password(e){
        this.setState({
            password:e.target.value,
        },
            ()=>{
                if(this.state.password===""||this.state.password_again===""){
                    this.setState({
                        passwordState:"NOPASSWORD",
                        passwordText:'Please Input password and password(again):)',
                        passwordColor:'#108ee9',
                    })
                }
                else if(this.state.password!==this.state.password_again){
                    this.setState({
                        passwordState:"UNCOMMON",
                        passwordText:'the two passwords are different :)',
                        passwordColor:'#f50',
                    })
                }
                else
                {
                    this.setState({
                        passwordState:"RIGHT",
                        passwordText:'password right :)',
                        passwordColor:'#87d068',
                    })

                }
            })
    }

    set_password_again(e){
        this.setState({
            password_again:e.target.value
        },()=>{
            if(this.state.password===""||this.state.password_again===""){
                this.setState({
                    passwordState:"NOPASSWORD",
                    passwordText:'Please Input password and password(again):)',
                    passwordColor:'#108ee9',
                })
            }
            else if(this.state.password!==this.state.password_again){
                this.setState({
                    passwordState:"UNCOMMON",
                    passwordText:'the two passwords are different :)',
                    passwordColor:'#f50',
                })
            }
            else
            {
                this.setState({
                    passwordState:"RIGHT",
                    passwordText:'password right :)',
                    passwordColor:'#87d068',
                })
            }
        })
    }

    set_live(e){
        this.setState({
            live:e.target.value
        })
    }

    set_address(e){
        this.setState({
            address:e.target.value
        })
    }

    set_email(e){
        this.setState({
            email:e.target.value
        },()=>{
            if(this.state.email===""){
                this.setState({
                    emailState:"NOEMAIL",
                    emailText:'Please Input your email:)',
                    emailColor:'#108ee9',
                })
            }
            else if(!this.state.email.match(/^\w+@\w+\.\w+$/i)&&!this.state.email.match(/^\w+@\w+\.\w+\.\w+$/i)){
                this.setState({
                    emailState:"INVALID",
                    emailText:'Please Input a valid email:)',
                    emailColor:'#f50',
                })
            }
            else
                this.setState({
                    emailState:"RIGHT",
                    emailText:'your email is right:)',
                    emailColor:'#87d068',
                })

        })
    }

    set_telephone(e){
        this.setState({
            telephone:e.target.value
        })
    }

    render() {
        return (
            <div id="regDiv" className="login-page">
                <form action="" id="form">
                    <h1 >Creat Your Account</h1>
                    <p>User Name:<input id="username" type="text" onChange={(e)=>this.set_username(e)}/></p>
                    <div ><Tag  color={this.state.usernameColor}>{this.state.usernameText}</Tag></div>


                    <p>Password: <input id="password" type="password"onChange={(e)=>this.set_password(e)}/><label id="password_trip"></label></p>

                    <p>Password Again: <input id="password" type="password"onChange={(e)=>this.set_password_again(e)}/><label id="password_trip"></label></p>
                    <div ><Tag  color={this.state.passwordColor}>{this.state.passwordText}</Tag></div>

                    <p>Live: <input id="password" type="text"onChange={(e)=>this.set_live(e)}/><label id="password_trip"></label></p>

                    <p>Address: <input id="password" type="text"onChange={(e)=>this.set_address(e)}/><label id="password_trip"></label></p>

                    <p>Telephone: <input id="password" type="text"onChange={(e)=>this.set_telephone(e)}/><label id="password_trip"></label></p>

                    <p>Email: <input id="password" type="text"onChange={(e)=>this.set_email(e)}/><label id="password_trip"></label></p>
                    <div ><Tag  color={this.state.emailColor}>{this.state.emailText}</Tag></div>

                    <div id="butt">
                        <button id='why' htmlType="submit"  >
                            <a onClick={()=>{let flag=1;
                                if(this.state.username===""){
                                    alert("no username");
                                    flag=0;
                                }
                                if(this.state.password!==this.state.password_again){
                                    alert("the two passwords are different");
                                    flag=0;
                                }
                                if(!this.state.email.match(/^\w+@\w+\.\w+$/i)&&!this.state.email.match(/^\w+@\w+\.\w+\.\w+$/i)){
                                    alert("Invalid email format");
                                    flag=0;
                                }
                                if(flag===1){
                                    localStorage.setItem("num",'0');
                                    localStorage.setItem("total","$0");

                                    let infToService={
                                        method:'post',
                                        headers:{
                                            "Content-Type":"application/json"
                                        },
                                        body:JSON.stringify({
                                            "username":this.state.username,
                                            "password":this.state.password,
                                            "live":this.state.live,
                                            "address":this.state.address,
                                            "email":this.state.email,
                                            "telephone":this.state.telephone
                                        })
                                    }
                                    fetch("http://localhost:8080/adduser",infToService)
                                        .then(response => response.json())
                                        .then(data => {
                                            if(data==="Duplicate Username")
                                                alert("Duplicate Username")
                                            else {
                                                alert("welcome")
                                                window.location.replace("http://localhost:3000/?#/");
                                            }

                                        }).catch(function (ex) {
                                        console.log('parsing failed', ex)
                                    })

                                }
                            }}>Creat Account</a>
                        </button>
                        <button id='why' htmlType="submit" >
                            <a href={"/#/"}>Log in</a>
                        </button>

                    </div>
                </form>
            </div>
        );
    }
}

function Registerpage(){
    return(<Register/>);

}
export default Registerpage;