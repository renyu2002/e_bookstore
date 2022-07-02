import React from "react";
import "../CSS/style.css"
import { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";
import {books_list}from "../view/bookRanking"
export class BookRankingListItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            image: props.image,
            id:props.id,
            name: props.name,
            total_sale_number:props.total_sale_number,
            total_sale_money:props.total_sale_money,
            rank:props.rank,
        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                image: nextProps.image,
                id:nextProps.id,
                name: nextProps.name,
                total_sale_number:nextProps.total_sale_number,
                total_sale_money:nextProps.total_sale_money,
                rank:nextProps.rank,
            }
        )
    }

    render() {
        return (
            <tbody>
            <tr>
                <td className="white two">{this.state.rank}</td>
                <td className="white first">
                    <img src={this.state.image} height="126.75" width="90" alt=""/>
                    <div className="description">
                        <h3><a href="#/book" onClick={()=> {
                            localStorage.setItem("item", "" + this.state.id)
                        }}>{this.state.name}</a></h3>
                        <p>{"bookID:"+this.state.id}</p>
                    </div>
                </td>
                <td className="white two">{this.state.total_sale_number}</td>
                <td className="white two">{this.state.total_sale_money}</td>
            </tr>
            </tbody>
        );
    }
}



export class TitleOfTheBookRankingList extends React.Component{
    render() {
        return (
            <tbody>
            <tr>
                <td className="braun price"><span>Rank</span></td>
                <td className="braun price"><span>Book Info</span></td>
                <td className="braun qua"><span>Sales Volume</span></td>
                <td className="braun total"><span>Sales</span></td>
            </tr>
            </tbody>
        );
    }
}

export class BookRankingList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            books:props.books,
            sales:"Sales",
            salesVolume:"Sales Volume",
            preSearchData:props.books,
            descending1:false,
            descending2:false,
        }
    }

    componentWillReceiveProps=(nextProps)=>{
        this.setState(
            {
                books:nextProps.books,
                sales:"Sales",
                salesVolume:"Sales Volume",
                preSearchData:nextProps.books,
                descending1:false,
                descending2:false,
            }
        )
    }

    sort1 = (e) => {

        let descending = !this.state.descending1;
        let item="Sales Volume"+ (this.state.descending1 ? ' \u2193' : ' \u2191');
        let data=this.state.preSearchData.sort(function (a,b) {
            return descending
                ? (a.total < b.total ? 1 : -1)
                : (a.total > b.total ? 1 : -1);
        });
        this.setState({
            books: data,
            descending1: descending,
            salesVolume:item,
            sales:"Sales"
        });
    };

    sort2 = (e) => {

        let descending = !this.state.descending2;
        let item="Sales"+ (this.state.descending2 ? ' \u2193' : ' \u2191');
        let data=this.state.preSearchData.sort(function (a,b) {
            return descending
                ? (a.totalPay < b.totalPay ? 1 : -1)
                : (a.totalPay > b.totalPay ? 1 : -1);
        });
        this.setState({
            books: data,
            descending2: descending,
            sales:item,
            salesVolume:"Sales Volume"
        });
    };

    render() {
        return (
            <table className="list_table">
                <tbody>
                <tr>
                    <td className="braun price"><span>Rank</span></td>
                    <td className="braun price"><span>Book Info</span></td>
                    <td className="braun qua" onClick={this.sort1}><span>{this.state.salesVolume}</span></td>
                    <td className="braun total" onClick={this.sort2}><span>{this.state.sales}</span></td>
                </tr>
                </tbody>
                {
                    this.state.books.map(
                        function (book,index) {
                            return <BookRankingListItem rank={index+1} image={book.image} id={book.id}
                                                        name={book.title} total_sale_number={book.total} total_sale_money={book.totalPay/100} />
                        })
                }
            </table>
        );
    }
}

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`PV ${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};



export default function DistributionMapOfBookSales() {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );
    return (
        <PieChart width={2000} height={400} >
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={[
                    {name: books_list[0][2], value: books_list[0][4]},
                    {name: books_list[1][2], value: books_list[1][4]},
                    {name: books_list[2][2], value: books_list[2][4]},
                    {name: books_list[3][2], value: books_list[3][4]},
                    {name: books_list[4][2], value: books_list[4][4]},
                    {
                        name: "others", value :()=>{
                            let others;
                            for (let j = 5; j < books_list.size(); j++)
                                others += books_list[j][4];
                            return others;
                        }
                    }
                ]}
                cx={550}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
            />
        </PieChart>
    );
}