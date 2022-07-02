import React from 'react';
import {HeadOfPage} from "../components/head"
import {TotalPay,ShopList} from "../components/cart";
import {Bar} from "../components/head";

const check_out={}
const page_name={page:"cart"}
const shopping_list=[]
export const cart_page={
    checkOut:check_out,
    page_name:page_name.page,
    books: shopping_list,
}

export class CartPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            num:props.checkOut.num,
            total:props.checkOut.total,
            page_name:props.page_name,
            books:props.books,
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

                let total = 0;
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

    }


    render() {
        return (
            <div id="wrapper">
                <div className="wrapper-holder">
                    <HeadOfPage num={this.state.num} total={this.state.total}/>
                    <section className="main">
                        <div className="content">
                            <Bar page={this.state.page_name} />
                            <ShopList books={this.state.books}/>
                            <ul className="list-table" style={{display: "none"}}>
                            </ul>
                            <div className="box_sub_total">
                                <h2 id="pay">Total to pay: {this.state.total}</h2>
                                <a className="btn btn_finalize" onClick={()=>{
                                   fetch("http://localhost:8080/payall?userid="+localStorage.getItem("id"))
                                    window.location.replace("http://localhost:3000/?#/accountfinal");
                                }
                                } href="#/accountfinal">Finalize and pay</a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

function Cartpage(){
    return(<CartPage checkOut={cart_page.checkOut} page_name={cart_page.page_name} books={cart_page.books}/>

    );
}
export default Cartpage;