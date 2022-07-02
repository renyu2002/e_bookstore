import React from 'react';
import {AdministratorHeadOfPage} from "../components/head";
import {OrderListOfOrderManagement} from "../components/orderManagement";

const data=[];
const check_out={}
const userinfo=[]

export class OrderManagement extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:props.data,
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
                    fetch("http://localhost:8080/allorder")
                        .then(response => response.json())
                        .then(data => {
                            for(let k=0;k<data.length;k++)
                                for(let m=0;m<data[k].orderItems.length;m++) {
                                    data[k].orderItems[m].date = data[k].dateT.date
                                    data[k].orderItems[m].orderId = data[k].orderId
                                    data[k].orderItems[m].username = data[k].user.username
                                    data[k].orderItems[m].userID = data[k].user.id

                                }

                            let arr=[]
                            for(let j=0;j<data.length;j++)
                                arr = arr.concat(data[j].orderItems)

                            // alert("data:" + data);
                            this.setState({
                                data: arr,

                            });
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
                    <div className="search_li">
                    </div>
                    <section className="main">
                        <div className="content">
                            <section className="bar">
                                <div className="bar-frame"/>
                            </section>
                            <OrderListOfOrderManagement initialData={this.state.data}/>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

function OrderManagementPage(){
    return(
        <OrderManagement checkOut={check_out} userinfo={userinfo} data={data} />
    );
}
export default OrderManagementPage;