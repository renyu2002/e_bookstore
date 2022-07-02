import React from 'react';

export class LogIn extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            username:props.username,
            password:props.password,
            redirect: true,
        }
    }

    set_username(e){
            this.setState({
                username:e.target.value
            })
    }

    set_password(e){
        this.setState({
            password:e.target.value
        })
    }

    render() {
        return (
            <div id="regDiv" className="login-page">
                <form action="" id="form">
                    <h1 id="hh1">LOGIN IN</h1>
                    <p id="pp">User Name:<input id="inputt" type="text" onChange={this.set_username.bind(this)}/><label id="name_trip"></label></p>

                    <p id="pp">Password:   <input id="inputt" type="password" onChange={(e)=>this.set_password(e)}/><label id="password_trip"></label></p>

                    <div id="butt">
                        <button id='why' htmlType="submit" >
                            <a color={'#6fecec'} onClick={()=>{
                                {
                                    if(this.state.username===""){
                                        alert("Please input username!")
                                        return;
                                    }
                                    if(this.state.password===""){
                                        alert("Please input password!")
                                        return;
                                    }
                                    let infToService={
                                        method:'post',
                                        headers:{
                                            "Content-Type":"application/json"
                                        },
                                        body:JSON.stringify({
                                            "username":this.state.username,
                                            "password":this.state.password,
                                        })
                                    }
                                    fetch("http://localhost:8080/checkuser",infToService)
                                        .then(response => response.json())
                                        .then(data => {
                                            if(data.id===0){
                                                alert("Username or password is wrong! ");
                                            }
                                            else if(data.ban===1){
                                                alert("You are banned. Please contact the administrator for more information");
                                            }
                                            else if(data.administractor===0){
                                                alert("Welcome Back! UserID="+data.id);
                                                localStorage.setItem("id",data.id);
                                                fetch("http://localhost:8080/cartOrders?id="+localStorage.getItem("id"))
                                                    .then(response => response.json())
                                                    .then(data2 => {
                                                        let total = 0;
                                                        for(let i = 0; i < data2.length; i++) {
                                                            total+=parseInt(data2[i].book.price)*parseInt(data2[i].num);
                                                        }
                                                        localStorage.setItem("num",data2.length);
                                                        localStorage.setItem("total","$"+total/100);

                                                    }).catch(function (ex) {
                                                    console.log('parsing failed', ex)
                                                })
                                                window.location.replace("http://localhost:3000/?#/home");
                                            }
                                            else{
                                                alert("Welcome back, Administrator! id="+data.id);
                                                localStorage.setItem("id",data.id);
                                                window.location.replace("http://localhost:3000/?#/usermanagement");
                                             }
                                        }).catch(function (ex) {
                                        console.log('parsing failed', ex)
                                    })

                                }
                            }}>log in</a>
                        </button>
                        <button id='why' htmlType="submit" >
                            <a href={"/#/register"}>register</a>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function Loginpage(){
    return(
       <LogIn/>
    );
}
export default Loginpage;