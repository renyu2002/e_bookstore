import React from 'react';
import "../CSS/all.css"
import "../CSS/fancySelect.css"
import "../CSS/jquery-ui-1.10.4.custom.css"
import "../CSS/jquery.bxslider.css"
import "../CSS/screen.css"
import "../CSS/uniform.css"
import "../CSS/PIE.htc"
import {HeadOfPage,Bar,Page} from "../components/head"
import {Book} from"../components/books_products"
import {Input} from "antd";
import { Pagination } from 'antd';

const check_out={}

export const books_page={books:[],name:"product results",checkOut:check_out}

export class BooksPageList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            books:props.books,
        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                books:nextProps.books,
            }
        )
    }

    render() {
        return (
            <ul className="item-product">
                {
                    this.state.books.map(
                        function (book_) {
                            return <Book image={book_.image} name={book_.title} price={"$"+book_.price/100} id={book_.id} key={book_.id}/>
                        })
                }
            </ul>
        );
    }
}

export class BooksPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            books:props.books,
            name:props.name,
            num:props.checkOut.num,
            total:props.checkOut.total,
            page:1,
            totalSize:0,
            pageSize:8,
            search:false,
            needle:""
        }
    }

    componentWillMount(){
        if(localStorage.getItem("id")==null){
            alert("please log in first")
            window.location.replace("http://localhost:3000/?#/");
            return;
        }
        fetch("http://localhost:8080/bookspage?pageNum=1")
            .then(response => response.json())
            .then(data => {
                // alert("data:" + data);
                this.setState({
                    books: data.content,
                    totalSize:data.totalElements
                });
            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })

        this.setState({
                num:localStorage.getItem("num"),
                total:localStorage.getItem("total"),

        })
    }

    search = (e) => {
        let needle = e.target.value.toLowerCase();
        if (!needle)
            fetch("http://localhost:8080/bookspage?pageNum=1")
                .then(response => response.json())
                .then(data => {
                    // alert("data:" + data);
                    this.setState({
                        books: data.content,
                        totalSize:data.totalElements,
                        page: 1,
                        search:false,
                        needle:""
                    });
                }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
        else
            fetch("http://localhost:8080/searchByTitle?pageNum=1&needle="+needle)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        books: data.books,
                        totalSize:data.total,
                        page: 1,
                        search:true,
                        needle:needle
                    });
                }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
    };

    render() {
        return (
            <div id="wrapper">
                <div className="wrapper-holder">
                    <HeadOfPage num={this.state.num} total={this.state.total}/>
                    <section className="main">
                        <div className="content">
                           <Bar page={this.state.name} />
                            <div style={{ marginBottom: 16 }} onChange ={this.search}>
                                <Input addonBefore='Book Name' id="searchbar"
                                       defaultValue="" />
                            </div>
                            <BooksPageList books={this.state.books}/>
                            <div className="top-bar top-bar-add"  >
                                <Pagination defaultCurrent={1} total={this.state.totalSize} defaultPageSize={this.state.pageSize}
                                            onChange={(page, pageSize)=>{
                                                if(!this.state.search)
                                                    fetch("http://localhost:8080/bookspage?pageNum="+page)
                                                        .then(response => response.json())
                                                        .then(data => {
                                                            this.setState({
                                                                books: data.content,
                                                                page: page,
                                                            });
                                                        }).catch(function (ex) {
                                                        console.log('parsing failed', ex)
                                                    })
                                                else
                                                    fetch("http://localhost:8080/searchByTitle?pageNum="+page+"&needle="+this.state.needle)
                                                        .then(response => response.json())
                                                        .then(data => {
                                                            this.setState({
                                                                books: data.books,
                                                                totalSize:data.total,
                                                                page: page,
                                                                pageSize:pageSize
                                                            });
                                                        }).catch(function (ex) {
                                                        console.log('parsing failed', ex)
                                                    })
                                            }} style={{float:'right'}}/>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

function Bookspage()
    {
        return(
            <BooksPage books={books_page.books} name={books_page.name} checkOut={books_page.checkOut}/>
        );
    }
export default Bookspage;