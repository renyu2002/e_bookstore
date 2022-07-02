import React from "react";
import "../CSS/style.css"
import img from'../images/img.png'

export class UserRankingListItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:props.id,
            user_name: props.user_name,
            total_order_number:props.total_order_number,
            total_purchase_money:props.total_purchase_money,
            rank:props.rank,
        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                id:nextProps.id,
                user_name: nextProps.user_name,
                total_order_number:nextProps.total_order_number,
                total_purchase_money:nextProps.total_purchase_money,
                rank:nextProps.rank,
            }
        )
    }

    render() {
        return (
            <tbody>
            <tr>
                <td className="white two" >{this.state.rank}</td>
                <td className="white first">
                    <img src={img} height="126.75" width="126.75" alt=""/>
                    <div className="description">
                        <h3><a  href="/#/admyaccount" onClick={()=>{
                            localStorage.setItem("adid",this.state.id)
                        }}>{this.state.user_name}</a></h3>
                        <p>{"userID:"+this.state.id}</p>
                    </div>
                </td>
                <td className="white two" >{this.state.total_order_number}</td>
                <td className="white two" >{"$"+this.state.total_purchase_money}</td>
            </tr>
            </tbody>
        );
    }
}



export class TitleOfTheUserRankingList extends React.Component{
    render() {
        return (
            <tbody>
            <tr>
                <td className="braun price"><span>Rank</span></td>
                <td className="braun price"><span>User Info</span></td>
                <td className="braun qua"><span>Number of Orders</span></td>
                <td className="braun total"><span>Consumption</span></td>
            </tr>
            </tbody>
        );
    }
}

export class UserRankingList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            preSearchData:props.users,
            users:props.users,
            descending1: false,
            descending2: false,
            orders:"Number of Orders",
            consumption:"Consumption",
        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                preSearchData:nextProps.users,
                users:nextProps.users,
                descending1: false,
                descending2: false,
                orders:"Number of Orders",
                consumption:"Consumption",
            }
        )
    }

    sort1 = (e) => {

        let descending = !this.state.descending1;
        let item="Number of Orders"+ (this.state.descending1 ? ' \u2193' : ' \u2191');
        let data=this.state.preSearchData.sort(function (a,b) {
            return descending
                ? (a.totalNum < b.totalNum ? 1 : -1)
                : (a.totalNum > b.totalNum ? 1 : -1);
        });
        this.setState({
            users: data,
            descending1: descending,
            orders:item,
            consumption:"Consumption"
        });
    };

    sort2 = (e) => {

        let descending = !this.state.descending2;
        let item="Consumption"+ (this.state.descending2 ? ' \u2193' : ' \u2191');
        let data=this.state.preSearchData.sort(function (a,b) {
            return descending
                ? (a.totalPay < b.totalPay ? 1 : -1)
                : (a.totalPay > b.totalPay ? 1 : -1);
        });
        this.setState({
            users: data,
            descending2: descending,
            consumption:item,
            orders:"Number of Orders"
        });
    };

    render() {
        return (
            <table className="list_table">
                <tbody>
                <tr>
                    <td className="braun price"><span>Rank</span></td>
                    <td className="braun price"><span>User Info</span></td>
                    <td className="braun qua" onClick={this.sort1}><span>{this.state.orders}</span></td>
                    <td className="braun total" onClick={this.sort2}><span>{this.state.consumption}</span></td>
                </tr>
                </tbody>
                {
                    this.state.users.map(
                        function (user,index) {
                            return <UserRankingListItem rank={index+1} id={user.id} user_name={user.username}
                                                        total_order_number={user.totalNum} total_purchase_money={user.totalPay/100} />
                        })
                }
            </table>
        );
    }
}