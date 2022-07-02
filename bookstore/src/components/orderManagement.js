import {Input, Select, Space, DatePicker} from "antd";
import React from "react";

const selectBefore=(
            <Select defaultValue="Book Name" className="select-before" >
                <Select.Option value="Book Name">Book Name</Select.Option>
                <Select.Option value="Purchase date ">Purchase date </Select.Option>
            </Select>
        )


// export class OrderItemOfOrderManagement extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state={
//             id:props.item[0],
//             image: props.item[1],
//             name: props.item[2],
//             price:props.item[3],
//             description: props.item[4],
//             number:props.item[5],
//             UserID:props.item[6],
//             data:props.item[7],
//             edit_comments:false,
//         }
//     }
//
//     componentWillReceiveProps=(nextProps)=>{
//         this.setState(
//             {
//                 id:nextProps.item[0],
//                 image: nextProps.item[1],
//                 name: nextProps.item[2],
//                 price:nextProps.item[3],
//                 description: nextProps.item[4],
//                 number:nextProps.item[5],
//                 userID:nextProps.item[6],
//                 data:nextProps.data,
//                 edit_comments:false,
//             }
//         )
//     }
//
//     render() {
//         return (
//             <tbody >
//             <tr>
//                 <td className="white two" >{this.state.userID}</td>
//                 <td className="white first">
//                     <img src={this.state.image} height="126.75" width="90" alt=""/>
//                     <div className="description">
//                         <h3><a href="/#/book">{this.state.name}</a></h3>
//                         <p>{this.state.description}</p>
//                     </div>
//                 </td>
//                 <td className="white two">{this.state.price}</td>
//                 <td className="white three">{this.state.number}</td>
//                 <td className="white four">{this.state.data}</td>
//             </tr>
//             </tbody>
//         );
//     }
// }

export class OrderItemOfOrderManagement extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:props.item.book.id,
            image: props.item.book.image,
            name: props.item.book.title,
            price:props.item.book.price,
            description: props.item.book.description,
            number:props.item.num,
            total:parseInt(props.item.num)*parseInt(props.item.book.price),
            data:props.item.date,
            orderId:props.item.orderId,
            edit_comments:false,
            username:props.item.username,
            userID:props.item.userID

        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                id:nextProps.item.book.id,
                image: nextProps.item.book.image,
                name: nextProps.item.book.title,
                price:nextProps.item.book.price,
                description: nextProps.item.book.description,
                number:nextProps.item.num,
                total:parseInt(nextProps.item.num)*parseInt(nextProps.item.book.price),
                data:nextProps.item.date,
                orderId:nextProps.item.orderId,
                edit_comments:false,
                username:nextProps.item.username,
                userID:nextProps.item.userID
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
                        <h3><a href="/#/book" onClick={()=> {
                            localStorage.setItem("item", "" + this.state.id)
                        }}>{this.state.name}</a></h3>
                        <p>{this.state.description}</p>
                    </div>
                </td>
                <td className="white four">
                    <div className="description">
                        <h3><a href="/#/admyaccount" onClick={()=>{
                            localStorage.setItem("adid",this.state.userID)
                        }}>{this.state.username}</a></h3>
                        <p>OrderID: {this.state.orderId}</p>
                    </div>
                </td>
                <td className="white two">{"$"+this.state.price/100}</td>
                <td className="white three">{this.state.number}</td>
                <td className="white two">{"$"+this.state.total/100}</td>
                <td className="white four">{this.state.data}</td>

            </tr>
            </tbody>
        );
    }
}

export class OrderListOfOrderManagement extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data: props.initialData,
            search: false,
            preSearchData: props.initialData,
            descending: false,
            Item:"Item",
            search1Dis:false,
            search2Dis:false,

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
            }
        )
    }

    search1 = (e) => {
        let emm=selectBefore.value;
        let needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({data: this.state.preSearchData});
            this.setState({search1Dis: false});
            this.setState({search2Dis: false});
            return;
        }
        this.setState({search2Dis: true});
        var searchdata = this.state.preSearchData.filter(function (item) {
            return item.book.title.toLowerCase().indexOf(needle) > -1;
        });
        this.setState({data: searchdata});

    };

    search2 = (e) => {
        let emm=selectBefore.value;
        let needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({data: this.state.preSearchData});
            this.setState({search1Dis: false});
            this.setState({search2Dis: false});

            return;
        }
        this.setState({search1Dis: true});
        var searchdata = this.state.preSearchData.filter(function (item) {
            return item.date.toLowerCase().indexOf(needle) > -1;
        });
        this.setState({data: searchdata});
    };


    render() {
        const { RangePicker } = DatePicker;

        return (
            <div>
                <div style={{ marginBottom: 16 }} onChange ={this.search1}>
                    <Input addonBefore='Book Name' id="searchbar" disabled={this.state.search1Dis}
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
                        <td className="braun price"><span>Item Information</span></td>
                        <td className="braun first">
                            <span>User Information</span>
                        </td>
                        <td className="braun price">
                            <span>Price</span>
                        </td>
                        <td className="braun qua"><span>Quantity</span></td>
                        <td className="braun total"><span>Total</span></td>
                        <td className="braun total"><span>Date</span></td>

                    </tr>
                    </tbody>
                    {
                        this.state.data.map(
                            function (book) {
                                return <OrderItemOfOrderManagement item={book} key={book.oid}/>
                            })
                    }
                </table>
            </div>
        );
    }
}