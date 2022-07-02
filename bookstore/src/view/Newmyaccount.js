import React from 'react';
import {HeadOfPage, SearchLi} from "../components/head";
import {UserInf} from "../components/myacc";
import {PurExcel} from "../components/purexcel";


const data=[];
const check_out={}
const userinfo=[]

export class MaAccountPagesFinal extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            num:props.checkOut.num,
            total:props.checkOut.total,
            userinfo:props.userinfo,
            data:props.data,
        }

    }

    componentWillMount(){
        fetch("http://localhost:8080/orders?&id="+localStorage.getItem("adid"))
            .then(response => response.json())
            .then(data => {
                for(let k=0;k<data.length;k++)
                    for(let m=0;m<data[k].orderItems.length;m++) {
                        data[k].orderItems[m].date = data[k].dateT.date
                        data[k].orderItems[m].orderId = data[k].orderId
                    }

                let arr=[]
                for(let j=0;j<data.length;j++)
                    arr = arr.concat(data[j].arr = data[j].orderItems)
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

        fetch("http://localhost:8080/user?userid="+localStorage.getItem("adid"))
            .then(response => response.json())
            .then(data => {
                // alert("data:" + data);
                this.setState({
                    userinfo: data,
                });
            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    render() {
        return (
            <div id="wrapper">
                <div className="wrapper-holder">
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

                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

function MaAccountpagefinal(){
    return(
        <MaAccountPagesFinal checkOut={check_out} userinfo={userinfo} data={data} />
    );
}
export default MaAccountpagefinal;