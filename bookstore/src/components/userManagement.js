import React from "react";

export class UserList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userID: props.userID,
            username: props.username,
            books: props.books,
            purchase:props.purchase,
            isAdministrator:(props.isAdministrator===1)?' Yes ':'   No   ',
            banOrNot:(props.banOrNot===1)?' Unban ':'   Ban   ',

        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                userID: nextProps.userID,
                username: nextProps.username,
                books: nextProps.books,
                purchase:nextProps.purchase,
                isAdministrator:(nextProps.isAdministrator==='1')?' Is ':'   Not   ',
                banOrNot:(nextProps.banOrNot==='1')?' Unban ':'   Ban   ',
            }
        )
    }

    render() {
            return (
                <tbody>
                <tr>
                    <td className="white two">{this.state.userID}</td>
                    <td className="white two" ><a href="/#/admyaccount" onClick={()=>{
                        localStorage.setItem("adid",this.state.userID)
                    }
                    }>{this.state.username}</a></td>
                    <td className="white two">{this.state.books}</td>
                    <td className="white two">{this.state.purchase}</td>
                    <td className="white two">{this.state.isAdministrator}</td>
                    <td className="white last" onClick={()=>{
                        if(this.state.isAdministrator===' Yes '){
                            alert("you cannot ban yourself or another administrator")
                            return;
                        }
                            if(this.state.banOrNot==='   Ban   '){
                            this.setState({banOrNot:' Unban '});
                            fetch("http://localhost:8080/banuser?userid="+this.state.userID);
                        }
                        else{
                            fetch("http://localhost:8080/unbanuser?userid="+this.state.userID);
                            this.setState({banOrNot:'   Ban   '})
                        }
                    }} >
                        <div className="row">
                            <a className="btn btn_checkout" style={{whiteSpace:'pre',color:'#87d068'}}>{this.state.banOrNot}</a>
                        </div>
                    </td>
                </tr>
                </tbody>
            );

    }
}


export class UserListTitle extends React.Component{
    render() {
        return (
            <tbody>
            <tr>
                <td className="braun price"><span>UserID</span></td>
                <td className="braun price"><span>Username</span></td>
                <td className="braun qua"><span>Email</span></td>
                <td className="braun total"><span>Tele</span></td>
                <td className="braun total"><span>Is Administrator</span></td>
                <td className="braun last"><span>Ban/Unban</span></td>
            </tr>
            </tbody>
        );
    }
}

export class Users extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            users:props.users,
        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                users:nextProps.users,
            }
        )
    }

    render() {
        return (
            <table className="list_table">
                <UserListTitle />
                {
                    this.state.users.map(
                        function (user) {
                            return <UserList userID={user.id} username={user.username} books={user.email}
                                             purchase={user.telephone} banOrNot={user.ban} isAdministrator={user.administractor} />
                        })
                }
            </table>
        );
    }
}