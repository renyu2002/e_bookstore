import React from "react";
import {Descriptions} from "antd";
import { Input, Select } from 'antd';
const { Option } = Select;

export class UserInf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:props.userinfo.username,
            telenum:props.userinfo.telephone,
            live:props.userinfo.live,
            userID:props.userinfo.id,
            email:props.userinfo.email,
            addre:props.userinfo.address,
        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                username:nextProps.userinfo.username,
                telenum:nextProps.userinfo.telephone,
                live:nextProps.userinfo.live,
                userID:nextProps.userinfo.id,
                email:nextProps.userinfo.email,
                addre:nextProps.userinfo.address,
            }
        )
    }

    render(){
        return(
            <Descriptions title="User Info">
                <Descriptions.Item label="UserName">{this.state.username}</Descriptions.Item>
                <Descriptions.Item label="Telephone">{this.state.telenum}</Descriptions.Item>
                <Descriptions.Item label="Live">{this.state.live}</Descriptions.Item>
                <Descriptions.Item label="UserID">{this.state.userID}</Descriptions.Item>
                <Descriptions.Item label="Email">{this.state.email}</Descriptions.Item>

                <Descriptions.Item label="Address">{this.state.addre}</Descriptions.Item>
            </Descriptions>
        );
    }
}

export class Purchased extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:props.item.itemId,
            book_id:props.item.book.id,
            image: props.item.book.image,
            name: props.item.book.title,
            price:props.item.book.price,
            description: props.item.book.description,
            number:props.item.num,
            total:parseInt(props.item.num)*parseInt(props.item.book.price),
            data:props.item.date,
            orderId:props.item.orderId,
            edit_comments:false,
        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                id:nextProps.item.itemId,
                book_id:nextProps.item.book.id,
                image: nextProps.item.book.image,
                name: nextProps.item.book.title,
                price:nextProps.item.book.price,
                description: nextProps.item.book.description,
                number:nextProps.item.num,
                total:parseInt(nextProps.item.num)*parseInt(nextProps.item.book.price),
                data:nextProps.item.date,
                orderId:nextProps.item.orderId,
                edit_comments:false,
            }
        )
    }

    showEditor = (e) => {
        let co=this.state.total;
        this.setState({
            edit_comments: true,
            comments: (
                <form onSubmit={(e)=>{

                        e.preventDefault();
                        let input = e.target.firstChild;
                        let data = input.value;

                        this.setState({
                            edit: false,
                            total: data,
                        });

                        // fetch("http://localhost:8080/updatecomment?orderid="+this.state.id+"&newcomment="+data);


                }}>
                    <input type="text" defaultValue={co}/>
                </form>
            ),
        });
    };
    save = (e) => {
        e.preventDefault();
        let input = e.target.firstChild;
        let data = input.value;

        this.setState({
            edit: false,
            total: data,
        });

        fetch("http://localhost:8080/updatecomment?orderid="+this.state.id+"&newcomment="+data);

    };

    render() {
        return (
            <tbody >
            <tr>
                <td className="white first">
                    <img src={this.state.image} height="126.75" width="90" alt=""/>
                    <div className="description">
                        <h3><a href="/#/book"onClick={()=> {
                            localStorage.setItem("item", "" + this.state.book_id)
                        }}>{this.state.name}</a></h3>
                        <p>{this.state.description}</p>
                    </div>
                </td>
                <td className="white two">{"$"+this.state.price/100}</td>
                <td className="white three">{this.state.number}</td>
                <td className="white two" onDoubleClick={this.showEditor} >{"$"+this.state.total/100}</td>
                <td className="white four">{this.state.data}</td>
                <td className="white four">{this.state.orderId}</td>
            </tr>
            </tbody>
        );
    }
}


export class Excel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, // [row index, cell index],
            search: false,
            preSearchData: null,
        };
    }

    sort = (e) => {
        let column = e.target.cellIndex;
        let data = this.state.data.slice();
        let descending = this.state.sortby === column && !this.state.descending;
        data.sort(function (a, b) {
            return descending
                ? (a[column] < b[column] ? 1 : -1)
                : (a[column] > b[column] ? 1 : -1);
        });
        this.setState({
            data: data,
            sortby: column,
            descending: descending,
        });
    };

    showEditor = (e) => {
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex,
            }
        });
    };

    save = (e) => {
        e.preventDefault();
        let input = e.target.firstChild;
        let data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this.setState({
            edit: null,
            data: data,
        });
    };

    toggleSearch = () => {
        if (this.state.search) {
            this.setState({
                data: this.preSearchData,
                search: false,
            });
            this.preSearchData = null;
        } else {
            this.preSearchData = this.state.data;
            this.setState({
                search: true,
            });
        }
    };

    search = (e) => {
        let needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({data: this.preSearchData});
            return;
        }
        let idx = e.target.dataset.idx;
        let searchdata = this.preSearchData.filter(function (row) {
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({data: searchdata});
    };

    render = () => {
        return (
            <div>
                {this.renderToolbar()}
                {this.renderTable()}
            </div>
        );
    };

    renderToolbar = () => {
        return (
            <div className="toolbar">
                <button className="btn btn_checkout" onClick={this.toggleSearch}>   Click here to Search   </button>
            </div>
        );
    };

    renderSearch = () =>  {
        if (!this.state.search) {
            return null;
        }
        return (
            <tr onChange={this.search}>
                {this.props.headers.map(function (ignore, idx) {
                    return <td key={idx} width={100}><input type="text" data-idx={idx}/></td>;
                })}
            </tr>
        );
    };

    renderTable = () => {
        return (
            <table className="list_table">
                <thead onClick={this.sort}>
                <tr>{
                    this.props.headers.map(function (title, idx) {
                        if (this.state.sortby === idx) {
                            title += this.state.descending ? ' \u2193' : ' \u2191';
                        }
                        return <td className="braun price" key={idx}>{title}</td>;
                    }, this)
                }</tr>
                </thead>
                <tbody onDoubleClick={this.showEditor}>
                {this.renderSearch()}
                {this.state.data.map(function (row, rowidx) {
                    return (
                        <tr key={rowidx}>{
                            row.map(function (cell, idx) {
                                let content = cell;
                                let edit = this.state.edit;
                                if (edit && edit.row === rowidx && edit.cell === idx) {
                                    content = (
                                        <form onSubmit={this.save}>
                                            <input type="text" defaultValue={cell}/>
                                        </form>
                                    );
                                }
                                return <td className="white three" key={idx} data-row={rowidx}>{content}</td>;
                            }, this)}
                        </tr>
                    );
                }, this)}
                </tbody>
            </table>
        );
    }
};