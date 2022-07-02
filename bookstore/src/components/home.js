import React from "react";

export class HeadAdv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bigImage: props.bigImage,
        }
    }

    render(){
        return(
            <div className="box_images">
                <a href="/#/books">
                    <img src={this.state.bigImage} alt=""/>
                </a>
            </div>
        );
    }

}
export class RightAdv extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            fisImage:props.fisImage,
            secImage:props.secImage,
            thiImage:props.thiImage,
        }
    }

    render() {
        return (
            <ul className="box_image_list">
                <li><a href="/#/books"><img src={this.state.fisImage} alt=""/></a></li>
                <li><a href="/#/books"><img src={this.state.secImage} alt=""/></a></li>
                <li><a href="/#/books"><img src={this.state.thiImage} alt=""/></a></li>
            </ul>
    );
    }
}

export class NewAdded extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            image:props.image,
        }
    }

    render() {
        return (
            <li>
                <div className="item">
                    <div className="image">
                        <a href="/#/book"><img src={this.state.image} alt=""/></a>
                    </div>
                </div>
            </li>
        );
    }
}
