import React from "react";

export class CartList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            image: props.image,
            name: props.name,
            description: props.description,
            price:props.price,
            number:props.number,
            total:(parseInt(props.price)*parseInt(props.number)),
            delete:false,
            id:props.id,
        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                image: nextProps.image,
                name: nextProps.name,
                description: nextProps.description,
                price:nextProps.price,
                number:nextProps.number,
                total:(parseInt(nextProps.price)*parseInt(nextProps.number)),
                delete:false,
                id:nextProps[0],
            }
        )
    }

    change_number(){
        let pre=parseInt(this.state.number);
        this.setState({number:(pre+1)});
        this.setState({total:(pre+1)*parseInt(this.state.price.substr(1))});
        fetch("http://localhost:8080/updateorder?orderid"+this.state.id+"&number="+this.state.number);

    }

    delete_li(){
        this.setState({delete:true});
    }

    render() {
            return (
                <tbody>
                <tr>
                    <td className="white first">
                        <img src={this.state.image} height="126.75" width="90" alt=""/>
                        <div className="description">
                            <h3><a href="#/book">{this.state.name}</a></h3>
                            <p>{this.state.description}</p>
                        </div>
                    </td>
                    <td className="white two">{"$"+this.state.price}</td>
                    <td className="white three">
                        <div className="row">
                            <div className="checkout">
                                <a className="btn btn_add" onClick={()=>{
                                    if(parseInt(this.state.number)===1){
                                        fetch("http://localhost:8080/deleteorder?itemId="+this.state.id)
                                        window.location.reload();
                                        return
                                    }
                                    let pre=parseInt(this.state.number);
                                    this.setState({number:(pre-1)});
                                    this.setState({total:(pre-1)*parseInt(this.state.price)});
                                    fetch("http://localhost:8080/updateorder?itemId="+this.state.id+"&number="+(pre-1))
                                        .then(response => response.json())
                                        .then(data => {
                                           if(data==="inventory_empty")
                                               alert("sorry,Not enough stock of this book")
                                            else
                                               window.location.reload();
                                        }).catch(function (ex) {
                                        console.log('parsing failed', ex)
                                    })
                                }}>-</a>
                                <a><span>{this.state.number}</span></a>
                                <a className="btn btn_add" onClick={()=>{
                                    let pre=parseInt(this.state.number);
                                    this.setState({number:(pre+1)});
                                    this.setState({total:(pre+1)*parseInt(this.state.price)});
                                    fetch("http://localhost:8080/updateorder?itemId="+this.state.id+"&number="+(pre+1))
                                        .then(response => response.json())
                                        .then(data => {
                                            if(data==="inventory_empty")
                                                alert("sorry,Not enough stock of this book")
                                            else
                                                window.location.reload();
                                        }).catch(function (ex) {
                                        console.log('parsing failed', ex)
                                    })
                                }}>+</a>
                            </div>
                        </div>
                    </td>
                    <td className="white four">${this.state.total}</td>
                    <td className="white last" onClick={()=>{
                        fetch("http://localhost:8080/deleteorder?itemId="+this.state.id);
                        window.location.reload();

                        this.forceUpdate();

                    }}>
                        <div className="row">
                            <a className="btn-delete" href="#/cart">delete</a>
                        </div>
                    </td>
                </tr>
                </tbody>
            );
    }
}

export class TotalPay extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            total:props.total,
        }
    }

    render() {
        return (
            <div className="box_sub_total">
                <h2 id="pay">Total to pay: {this.state.total}</h2>
                <a className="btn btn_finalize" href="#/cart">Finalize and pay</a>
            </div>
        );
    }
}

export class ListTitle extends React.Component{
    render() {
        return (
            <tbody>
            <tr>
                <td className="braun first">
                    <span>Item</span>
                </td>
                <td className="braun price">
                    <span>Price</span>
                </td>
                <td className="braun qua"><span>Quantity</span></td>
                <td className="braun total"><span>Total</span></td>
                <td className="braun last"></td>
            </tr>
            </tbody>
        );
    }
}

export class ShopList extends React.Component{
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
            <table className="list_table">
                <ListTitle />
                {
                    this.state.books.map(
                        function (book) {
                            return <CartList image={book.book.image} name={book.book.title} description={book.book.description}
                                             price={book.book.price/100} number={book.num} id={book.itemId}/>
                        })
                }
            </table>
        );
    }
}