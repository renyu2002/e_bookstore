import React, { Component } from 'react';
import {HeadOfPage,Bar} from "../components/head";
import {BookBuy,BookDetail,BookInfo} from "../components/book_detail";
import { Button } from 'antd';
import { Tag } from 'antd';

import "../CSS/all.css"
import "../CSS/fancySelect.css"
import "../CSS/jquery-ui-1.10.4.custom.css"
import "../CSS/jquery.bxslider.css"
import "../CSS/screen.css"
import "../CSS/uniform.css"
import "../CSS/PIE.htc"
import '../CSS/tab.css'

const page_name="Book Page"


//data, all empty now
const check_out={}

export const book_page={
    checkOut:check_out,
    page_name:page_name,
    name:"",
    writer: "",
    price:"",
    book_and_con:"",
    writer_info:"",
    image: "",
    comments: []
}


export class BookDetailPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            num:props.checkOut.num,
            total:props.checkOut.total,
            page_name:props.page_name,
            name:props.name,
            writer:props.writer,
            price:props.price,
            book_and_con:props.book_and_con,
            writer_info:props.writer_info,
            comments:props.comments,
            image:props.image,
            id:props.id,
            inventory: props.inventory,
            isbn:props.isbn
        }
    }

    componentWillMount(){
        fetch("http://localhost:8080/bookdetail"+"?bookid="+localStorage.getItem("item"))
            .then(response => response.json())
            .then(data => {

                this.setState({
                    id:data.id,
                    image:data.image,
                    name:data.title,
                    price:data.price,
                    writer:data.author,
                    book_and_con:data.content,
                    writer_info:data.writer,
                    inventory: data.inventory,
                    isbn:data.isbn

                });

            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })

        fetch("http://localhost:8080/comments"+"?bookid="+localStorage.getItem("item"))
            .then(response => response.json())
            .then(data => {

                this.setState({
                    comments:data
                });

            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })

        this.setState({
            num:localStorage.getItem("num"),
            total:localStorage.getItem("total"),

        })

    }

    render() {
        if(this.state.inventory!==0)
            return (
                <div id="wrapper">
                    <div className="wrapper-holder">
                     <HeadOfPage num={this.state.num} total={this.state.total}/>

                        <section className="main">
                            <div className="content">
                             <Bar page={this.state.page_name} />
                             <div className="details-info">
                                 <div class="slid_box"  style={{position: "absolute"}}>
                                       <img  src={this.state.image} width={300}/>
                                    </div>
                                   <div className="description" stytle={{position: "absolute"}}>
                                       <BookInfo isbn={this.state.isbn} inventory={this.state.inventory} name={this.state.name} writer={this.state.writer} price={"$"+this.state.price/100}/>
                                       <div className="section">
                                           <form className="form-sort page" action="cart.html">
                                               <fieldset>
                                                   <div className="row">
                                                       <div className="clear"></div>
                                                    </div >
                                                    <div className="checkout" >
                                                    <a className="btn btn_checkout" onClick={()=>{
                                                        fetch("http://localhost:8080/addorder"+"?bookid="+this.state.id+"&userid="+localStorage.getItem("id"))
                                                            .then(response => response.json())
                                                            .then(data => {

                                                               if(data==="INSERT")
                                                                 alert("The book has been put into your cart! ");
                                                               else if(data==="inventory_empty")
                                                                   alert("sorry,Not enough stock of this book");
                                                               else
                                                                   alert("The book has already in your cart! ");
                                                             window.location.replace("http://localhost:3000/?#/cart");

                                                           }).catch(function (ex) {
                                                          console.log('parsing failed', ex)
                                                       })
                                                    }}>add to cart</a>
                                                   </div>
                                             </fieldset>
                                           </form>
                                     </div>
                                       <BookDetail book_and_con={this.state.book_and_con} writer_info={this.state.writer_info}
                                                comments={this.state.comments}/>
                                  </div>
                                 <div className="clear"></div>
                               </div>
                         </div>
                      </section>
                    </div>
               </div>
            );
        else
            return (
                <div id="wrapper">
                    <div className="wrapper-holder">
                        <HeadOfPage num={this.state.num} total={this.state.total}/>

                        <section className="main">
                            <div className="content">
                                <Bar page={this.state.page_name} />
                                <div className="details-info">
                                    <div class="slid_box"  style={{position: "absolute"}}>
                                        <img  src={this.state.image} width={300}/>
                                    </div>
                                    <div className="description" stytle={{position: "absolute"}}>
                                        <BookInfo isbn={this.state.isbn} inventory={this.state.inventory} name={this.state.name} writer={this.state.writer} price={"$"+this.state.price/100}/>
                                        <div className="section">
                                            <form className="form-sort page" action="cart.html">
                                                <fieldset>
                                                    <div className="row">
                                                        <div className="clear"></div>
                                                    </div >
                                                    <div className="checkout" >
                                                        <Button type="primary" disabled>add to cart</Button>
                                                        <Tag color="#f50">Currently Out of Stock</Tag>
                                                    </div>
                                                </fieldset>
                                            </form>
                                        </div>
                                        <BookDetail book_and_con={this.state.book_and_con} writer_info={this.state.writer_info}
                                                    comments={this.state.comments}/>
                                    </div>
                                    <div className="clear"></div>

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            );

    }
}

function Bookpage(){
    return(<BookDetailPage checkOut={book_page.checkOut} page_name={book_page.page_name}
                      name={book_page.name} writer={book_page.writer} price={book_page.price}
                      book_and_con={book_page.book_and_con} writer_info={book_page.writer_info}
                      image={book_page.image} comments={book_page.comments}/>);
}
export default Bookpage;