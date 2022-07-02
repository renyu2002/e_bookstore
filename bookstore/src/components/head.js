import React from "react";

export class Bar extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            page:props.page,
        }
    }

    render() {
        return (
            <section className="bar">
                <div className="bar-frame">
                    <ul className="breadcrumbs">
                        <li><a href='/#/home'>Home</a></li>
                        <li>{this.state.page}</li>
                    </ul>
                </div>
            </section>
        );
    }
}

export class Page extends React.Component{

    render(){
        return(
            <div className="top-bar top-bar-add">
               <ul className="paging">
                    <li className="prev"><a href="#">prev</a></li>
                    <li><a href="#">1</a></li>
                    <li className="active"><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li className="next"><a href="#">next</a></li>
                </ul>
            </div>
        );
    }
}

class Checkout extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            num:props.num,
            total:props.total,
        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                num:nextProps.num,
                total:nextProps.total,
            }
        )
    }

    render() {
        return (
            <div className="checkout">
                <span>{this.state.num} products,<span className="pink">{this.state.total}</span></span>
                <a href="/#/cart" className="btn btn_checkout">Checkout</a>
            </div>
        );
    }
}

export class SearchLi extends React.Component{
    render() {
        return (
            <div className="ul_search li">
                <a className="search" href="#"><span>search</span></a>
                <form method="get" className="searchform" action="#">
                    <input type="text" className="field" name="s" id="s"
                           placeholder="What are you looking for?"/>
                    <input type="submit" className="submit" value=""/>
                    <div className="clear"></div>
                </form>
            </div>
        );
    }
}

export class HeadOfPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            num:props.num,
            total:props.total,
        }

    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                num:nextProps.num,
                total:nextProps.total,
            }
        )
    }


    render() {
        return (
            <div className="header-holder">
                <header id="header">
                    <span className="logo"><a href='/#/home'>e-book</a></span>
                    <div className="tools-nav_holder">
                        <ul className="tools-nav">
                            <li><a href="/#/accountfinal">My account</a></li>
                            <li className="login"><a onClick={()=>{
                                localStorage.removeItem("id")
                                window.location.replace("http://localhost:3000/?#/");
                            }}>Log out</a></li>
                        </ul>
                        <Checkout num={this.state.num} total={this.state.total} />
                    </div>
                    <div className="clear"></div>
                    <a className="menu_trigger" href="#">menu</a>
                    <nav id="nav">
                        <ul className="navi">
                            <li className="search_li">
                                <SearchLi />
                            </li>
                            <li><a href='/#/books' >Our collection</a></li>

                            <li><a href='/#/books'>Top products</a></li>

                            <li><a href='/#/books'>Best sellers</a></li>

                            <li><a href='/#/books' >Promotions</a></li>
                        </ul>
                    </nav>
                </header>
            </div>
        );
    }
}

export class AdministratorHeadOfPage extends React.Component{

    render() {
        return (
            <div className="header-holder">
                <header id="header">
                    <span className="logo"><a href='/#/home'>e-book</a></span>
                    <div className="tools-nav_holder">
                        <ul className="tools-nav">
                            <li><a href="/#/accountfinal">My account</a></li>
                            <li className="login"><a onClick={()=>{
                                localStorage.removeItem("id")
                                window.location.replace("http://localhost:3000/?#/");
                            }}>Log out</a></li>
                        </ul>
                    </div>
                    <div className="clear"></div>
                    <a className="menu_trigger" href="#">menu</a>
                    <nav id="nav">
                        <ul className="navi">
                            <li className="search_li">
                                <SearchLi />
                            </li>
                            <li><a href='/#/usermanagement' >User Management</a></li>

                            <li><a href='/#/bookmanagement'>Book Management</a></li>

                            <li><a href='/#/ordermanagement'>Order Management</a></li>

                            <li><a href='/#/booksalesranking'>Book Sales Ranking</a></li>

                            <li><a href='/#/userpurchaseranking'>User Purchase Ranking</a></li>

                        </ul>
                    </nav>
                </header>
            </div>
        );
    }
}