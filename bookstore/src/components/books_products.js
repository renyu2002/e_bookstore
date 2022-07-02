import React from "react";

export class Book extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            image:props.image,
            name:props.name,
            price:props.price,
            id:props.id,
        }
    }

    // fuck(){
    //     localStorage.removeItem("item");
    //     localStorage.setItem("item",""+this.state.id);
    // }


    render() {
        return (
            <li>
                <div className="item">
                    <div className="image">
                        <a href="#/book" onClick={()=> {
                            localStorage.setItem("item", "" + this.state.id)
                        }}><img  src={this.state.image} alt=""/></a>
                    </div>
                    <span className="name"><a href="#/book">{this.state.name}</a></span>
                    <span>{this.state.price}</span>
            </div>
            </li>
        );
    }
}





