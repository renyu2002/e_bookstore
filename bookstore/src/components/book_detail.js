import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import { Button } from 'antd';


export class BookInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            name:props.name,
            writer:props.writer,
            price:props.price,
            inventory:props.inventory,
            isbn:props.isbn
        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                name:nextProps.name,
                writer:nextProps.writer,
                price:nextProps.price,
                inventory:nextProps.inventory,
                isbn:nextProps.isbn
            }
        )
    }

    render() {
        return (
            <div className="head">
                <h1 className="title">{this.state.name}</h1>
                <h3>{this.state.writer}</h3>
                <h2>{this.state.price}</h2>
                <h3>{this.state.inventory+" remaining"}</h3>
                <h3>{"ISBN: "+this.state.isbn}</h3>
            </div>
        );
    }
}

export class BookBuy extends React.Component{
    render() {
            return (
                <div className="section">
                    <form className="form-sort page" action="cart.html">
                        <fieldset>
                            <div className="row">
                                <label htmlFor="page">Quantity:</label>
                                <select id="page">
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                                <div className="clear"></div>
                            </div>
                            <Button type="primary" disabled>Add to cart</Button>
                        </fieldset>
                    </form>
                </div>
            );
    }
}

export class Comment extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            commenter:props.commenter,
            time:props.time,
            com_content:props.com_content,
        }
    }

    render() {
        return (
            <li>
                <p className="name">{this.state.commenter}, {this.state.time}</p>
                <li style={{whiteSpace: 'pre-line'}}>{
                    this.state.com_content
                }</li>
            </li>
        );
    }
}

export class BookDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            book_and_con:props.book_and_con,
            writer_info:props.writer_info,
            comments:props.comments,
        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                book_and_con:nextProps.book_and_con,
                writer_info:nextProps.writer_info,
                comments:nextProps.comments
            }
        )
    }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="- - -Book and Content- - -|">
                        <div id="tabs-1">
                            <li style={{whiteSpace: 'pre-line'}}>{this.state.book_and_con}</li>
                        </div>
                    </Tab>
                    <Tab eventKey="profile" title="- - -the writer- - -|">
                        <div id="tabs-2">
                            <div id="tabs-1">
                                <li style={{whiteSpace: 'pre-line'}}>{
                                    this.state.writer_info
                                }</li>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="contact" title="- - -comments- - -">
                        <ul className="reviews">
                            {
                                this.state.comments.map(
                                    function (comment) {
                                        return <Comment commenter={comment.name} time={comment.time}
                                                        com_content={comment.comment}/>
                                    })
                            }
                        </ul>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
