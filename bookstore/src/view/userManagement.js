import React from 'react';
import {AdministratorHeadOfPage} from "../components/head"
import {Users} from "../components/userManagement";

const users_list=[]

export class UserManagement extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            users:props.users,
        }
    }

    componentWillMount(){
        if(localStorage.getItem("id")==null){
            alert("please log in first")
            window.location.replace("http://localhost:3000/?#/");
            return;
        }
        fetch("http://localhost:8080/checkAdministrator?userid="+localStorage.getItem("id"))
            .then(response => response.json())
            .then(data => {
               if(data==="no"){
                   alert("Non-administrators do not have permission to access this page")
               }
               else {
                   fetch("http://localhost:8080/usersmanagement")
                       .then(response => response.json())
                       .then(data => {
                           this.setState({
                               users:data,
                           })

                       }).catch(function (ex) {
                       console.log('parsing failed', ex)
                   })
               }
            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    render() {
        return (
            <div id="wrapper">
                <div className="wrapper-holder">
                    <AdministratorHeadOfPage/>
                    <section className="main">
                        <div className="content">
                            <Users users={this.state.users}/>
                            <ul className="list-table" style={{display: "none"}}>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

function UserManagementpage(){
    return(<UserManagement users={users_list}/>);
}
export default UserManagementpage;