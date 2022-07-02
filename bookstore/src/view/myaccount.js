import React from 'react';
import {HeadOfPage, SearchLi} from "../components/head";
import {UserInf} from "../components/myacc";
import {PurExcel, UserPurchaseStaticsSelf} from "../components/purexcel";


const data=[];
const check_out={}
const userinfo=[]

export class AccountPagesFinal extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            num:props.checkOut.num,
            total:props.checkOut.total,
            userinfo:props.userinfo,
            data:props.data,
            number:0,
            payment:0
        }

    }

    componentWillMount(){
        if(localStorage.getItem("id")==null){
            alert("please log in first")
            window.location.replace("http://localhost:3000/?#/");
            return;
        }
        fetch("http://localhost:8080/cartOrders?id="+localStorage.getItem("id"))
            .then(response => response.json())
            .then(data => {

                var total=0;
                for(let i = 0; i < data.length; i++) {
                    total+=parseInt(data[i].book.price)*parseInt(data[i].num);
                }

                this.setState({
                    books: data,
                    num:data.length,
                    total:"$"+total/100,

                })

                localStorage.setItem("num",data.length);
                localStorage.setItem("total","$"+total/100);


            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
        fetch("http://localhost:8080/orders?&id="+localStorage.getItem("id"))
            .then(response => response.json())
            .then(data => {
                for(let k=0;k<data.length;k++)
                    for(let m=0;m<data[k].orderItems.length;m++) {
                        data[k].orderItems[m].date = data[k].dateT.date
                        data[k].orderItems[m].orderId = data[k].orderId
                    }

                let arr=[]
                for(let j=0;j<data.length;j++)
                    arr = arr.concat(data[j].orderItems)
                let number=0;
                let payment=0;
                for(let i = 0; i < arr.length; i++) {
                    payment+=parseInt(arr[i].book.price)*parseInt(arr[i].num);
                    number+=arr[i].num;
                }
                // alert("data:" + data);
                this.setState({
                    data: arr,
                    payment:payment,
                    number:number

                });
            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })

        fetch("http://localhost:8080/user?userid="+localStorage.getItem("id"))
            .then(response => response.json())
            .then(data => {
                // alert("data:" + data);
                this.setState({
                    userinfo: data,
                });
            }).catch(function (ex) {console.log('parsing failed', ex)
            })
    }

    render() {
        return (
            <div id="wrapper">
                <div className="wrapper-holder">
                    <HeadOfPage num={this.state.num} total={this.state.total}/>
                    <div className="search_li">

                        <SearchLi />
                    </div>
                    <section className="main">
                        <div className="content">
                            <UserInf userinfo={this.state.userinfo}/>
                            <section className="bar">
                                <div className="bar-frame"/>
                            </section>
                            <section className="bar">
                                <div className="bar-frame">
                                    <ul className="breadcrumbs">
                                        <li>Purchased list </li>
                                    </ul>
                                </div>
                            </section>

                            <PurExcel initialData={this.state.data}/>

                            <UserPurchaseStaticsSelf id={localStorage.getItem("id")}/>
                        </div>
                    </section>


                    {/*<div className="box_sub_total">*/}
                    {/*    <h2 id="pay">Total number of books: {this.state.number}</h2>*/}
                    {/*    <h2 id="pay">Total payment: {"$"+this.state.payment/100}</h2>*/}
                    {/*</div>*/}

                </div>
            </div>
        );
    }
}

function Accountpagefinal(){
    return(
        <AccountPagesFinal checkOut={check_out} userinfo={userinfo} data={data} />
    );
}
export default Accountpagefinal;