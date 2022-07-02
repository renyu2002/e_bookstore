import {Input, Select, Space, DatePicker} from "antd";
import React from "react";
import {Purchased} from "./myacc";
import { Descriptions } from 'antd';


const { Option } = Select;

const selectBefore = (
    <Select defaultValue="Book Name" className="select-before">
        <Option value="Book Name">Book Name</Option>
        <Option value="Purchase date ">Purchase date </Option>
    </Select>
);


export class PurExcel extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data: props.initialData,
            search: false,
            preSearchData: props.initialData,
            descending: false,
            Item:"Item",
            search1Dis: false,
            search2Dis: false
        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                data: nextProps.initialData,
                search: false,
                preSearchData: nextProps.initialData,
                descending: false,
                Item:"Item",
                search1Dis: false,
                search2Dis: false,
            }
        )
    }

    search1 = (e) => {
        let emm=selectBefore.value;
        let needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({
                data: this.state.preSearchData,
                search1Dis: false,
                search2Dis: false
            });
            return;
        }
        this.setState({search2Dis: true});
        var searchdata = this.state.preSearchData.filter(function (item) {
            return item.book.title.toString().toLowerCase().indexOf(needle) > -1;

        });
        this.setState({data: searchdata});
    };

    search2 = (e) => {
        let emm=selectBefore.value;
        let needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({
                data: this.state.preSearchData,
                search1Dis: false,
                search2Dis: false
                });
            return;
        }
        this.setState({search1Dis: true});
        var searchdata = this.state.preSearchData.filter(function (item) {
            return item.date.toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({data: searchdata});
    };

    sort = (e) => {

        let descending = !this.state.descending;
        let item="Item"+ (this.state.descending ? ' \u2193' : ' \u2191');
        let data=this.state.preSearchData.sort(function (a,b) {
            return descending
                ? (a.name < b.name ? 1 : -1)
                : (a.name > b.name ? 1 : -1);
        });
        this.setState({
            data: data,
            descending: descending,
            Item:item,
        });
    };


    render() {

        const { RangePicker } = DatePicker;

        return (
            <div>
                <div style={{ marginBottom: 16 }} onChange ={this.search1}>
                    <Input addonBefore="Book Title" id="searchbar" disabled={this.state.search1Dis}
                           defaultValue="" />
                </div>
                <div style={{ marginBottom: 16 }} onChange ={this.search2}>
                    <Input addonBefore='Purchase Date' id="searchbar" disabled={this.state.search2Dis}
                           defaultValue="" />
                </div>
                <Space direction="vertical" size={12}>
                    <RangePicker onChange={(dateStrings: [string, string])=>{
                        if(dateStrings===null||dateStrings[0]===null||dateStrings[1]===null){
                            this.setState({
                                data: this.state.preSearchData,
                                search1Dis: false,
                                search2Dis: false
                            });
                            return;
                        }

                        this.setState({
                            search1Dis: true,
                            search2Dis: true
                        });

                        let begin_date = new Date(dateStrings[0]),
                            month1 = '' + (begin_date.getMonth() + 1),
                            day1 = '' + begin_date.getDate(),
                            year1 = begin_date.getFullYear();
                        if (month1.length < 2) month1 = '0' + month1;
                        if (day1.length < 2) day1 = '0' + day1;
                        let begin=new Date([year1, month1, day1].join( '.' ));

                        let end_date = new Date(dateStrings[1]),
                            month2 = '' + (end_date.getMonth() + 1),
                            day2 = '' + end_date.getDate(),
                            year2 = end_date.getFullYear();
                        if (month2.length < 2) month2 = '0' + month2;
                        if (day2.length < 2) day2 = '0' + day2;
                        let end=new Date([year2, month2, day2].join( '.' ));

                        var searchdata = this.state.preSearchData.filter(function (item) {
                            let date=new Date(item.date)
                            return ((date.getTime()-begin.getTime())>=0&&(date.getTime()-end.getTime())<=0);
                        });

                        this.setState({data: searchdata});

                    }
                    }/>
                </Space>
                <table className="list_table">
                    <tbody>
                    <tr>
                        <td className="braun first" onClick={this.sort}>
                            <span>{this.state.Item}</span>
                        </td>
                        <td className="braun price">
                            <span>Price</span>
                        </td>
                        <td className="braun qua"><span>Quantity</span></td>
                        <td className="braun del"><span>Total</span></td>
                        <td className="braun total"><span>Date</span></td>
                        <td className="braun total"><span>OrderID</span></td>
                    </tr>
                    </tbody>
                    {
                        this.state.data.map(
                            function (book) {
                                return <Purchased item={book} key={book.oid}/>
                            })
                    }
                </table>
            </div>
        );
    }
}

export class UserPurchaseStaticsSelf extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userID:props.id,
            num:0,
            total:0,
            data:[],
            date:"all",
        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                userID:nextProps.id,
                num:0,
                total:0,
                data:[],
                date:"all",
            }
        )
    }

    componentWillMount() {
        fetch("http://localhost:8080/userOrderStaticsAll?userid="+this.state.userID)
            .then(response => response.json())
            .then(data => {

                this.setState({
                    num:data.totalBook,
                    total:data.totalPay,
                    data:data.bookBriefs,
                    date:"all",
                })

            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }


    render() {

        const { RangePicker } = DatePicker;

        return (
            <div>
                <section className="bar">
                    <div className="bar-frame"/>
                </section>
                <section className="bar">
                    <div className="bar-frame">
                        <ul className="breadcrumbs">
                            <li>Purchase statistics</li>
                        </ul>
                        <Space direction="vertical" size={12}>
                            <RangePicker onChange={(dateStrings: [string, string])=>{
                                if(dateStrings===null||dateStrings[0]===null||dateStrings[1]===null){
                                    fetch("http://localhost:8080/userOrderStaticsAll?userid="+this.state.userID)
                                        .then(response => response.json())
                                        .then(data => {

                                            this.setState({
                                                num:data.totalBook,
                                                total:data.totalPay,
                                                data:data.bookBriefs,
                                                date:"all",
                                            })

                                        }).catch(function (ex) {
                                        console.log('parsing failed', ex)
                                    })
                                    return;
                                }

                                let begin_date = new Date(dateStrings[0]),
                                    month1 = '' + (begin_date.getMonth() + 1),
                                    day1 = '' + begin_date.getDate(),
                                    year1 = begin_date.getFullYear();
                                if (month1.length < 2) month1 = '0' + month1;
                                if (day1.length < 2) day1 = '0' + day1;
                                let begin=[year1, month1, day1].join( '.' );

                                let end_date = new Date(dateStrings[1]),
                                    month2 = '' + (end_date.getMonth() + 1),
                                    day2 = '' + end_date.getDate(),
                                    year2 = end_date.getFullYear();

                                if (month2.length < 2) month2 = '0' + month2;
                                if (day2.length < 2) day2 = '0' + day2;

                                let end=[year2, month2, day2].join( '.' );

                                fetch("http://localhost:8080/userOrderStaticsPeriod?userid="+this.state.userID+
                                    "&begin="+begin+
                                    "&end="+end)
                                    .then(response => response.json())
                                    .then(data => {

                                        this.setState({
                                            num:data.totalBook,
                                            total:data.totalPay,
                                            data:data.bookBriefs,
                                            date:begin+" to "+end,
                                        })

                                    }).catch(function (ex) {
                                    console.log('parsing failed', ex)
                                })

                            }
                            }/>
                        </Space>
                    </div>
                </section>
                <Descriptions title="Summary of purchase data" bordered>
                    <Descriptions.Item label="Total Book Quantity">{this.state.num}</Descriptions.Item>
                    <Descriptions.Item label="total Amount">{this.state.total}</Descriptions.Item>
                    <Descriptions.Item label="Start and End Time">{this.state.date}</Descriptions.Item>
                </Descriptions>
                <table className="list_table">
                    <tbody>
                    <tr>
                        <td className="braun first" onClick={this.sort}>
                            <span>Item</span>
                        </td>
                        <td className="braun price">
                            <span>Price</span>
                        </td>
                        <td className="braun qua"><span>Quantity</span></td>
                    </tr>
                    </tbody>
                    {
                        this.state.data.map(
                            function (book) {
                                return(
                                    <tbody >
                                    <tr>
                                        <td className="white first">
                                            <img src={book.bookBrief.image} height="126.75" width="90" alt=""/>
                                            <div className="description">
                                                <h3><a href="/#/book"onClick={()=> {
                                                   localStorage.setItem("item", "" + book.bookBrief.id)
                                                }}>{book.bookBrief.title}</a></h3>
                                                <p>{book.bookBrief.description}</p>
                                            </div>
                                    </td>
                                    <td className="white two">{"$"+book.bookBrief.price/100}</td>
                                    <td className="white three">{book.num}</td>
                                </tr>
                                </tbody>
                                );
                            })
                    }
                </table>
            </div>
        );
    }
}

