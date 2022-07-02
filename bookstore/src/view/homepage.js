import React from 'react';
import pic01 from '../images/pic_01.webp'
import pic02 from '../images/pic_02.webp'
import pic03 from '../images/pic_03.webp'
import pic04 from '../images/pic_04.webp'
import pic05 from '../images/pic_14.webp'
import pic06 from '../images/pic061.jpg'
import pic07 from '../images/pic062.jpg'
import pic08 from '../images/pic063.jpg'
import pic09 from '../images/pic064.png'
import pic10 from '../images/pic065.jpg'
import pic11 from '../images/pic066.jpg'
import pic12 from '../images/pic067.jpg'
import "../CSS/all.css"
import "../CSS/fancySelect.css"
import "../CSS/jquery-ui-1.10.4.custom.css"
import "../CSS/jquery.bxslider.css"
import "../CSS/screen.css"
import "../CSS/uniform.css"
import "../CSS/PIE.htc"
import {HeadOfPage,SearchLi} from "../components/head"
import {HeadAdv,RightAdv,NewAdded} from "../components/home"



const check_out={}

const bigImage=pic01

const littleAdv={
    firImage: pic02,
    secImage: pic03,
    thiImage: pic04,
}

const newAdds=[
    pic07,
    pic05,
    pic06,
    pic08,
    pic09,
    pic10,
    pic11,
    pic12,
]

export const home_page={
    bigImage:bigImage,
    littleAdv:littleAdv,
    newAdds:newAdds,
    checkOut:check_out,
    }

export class HomePages extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            bigImage:props.bigImage,
            firImage:props.littleAdv.firImage,
            secImage:props.littleAdv.secImage,
            thiImage:props.littleAdv.thiImage,
            newAdds:props.newAdds,
            num:props.checkOut.num,
            total:props.checkOut.total,
        }

    }

    componentWillMount(){

        this.setState({
            num:localStorage.getItem("num"),
            total:localStorage.getItem("total"),
        })
    }


    render() {
        return (
            <div id="wrapper">
                <div className="wrapper-holder">
                    <HeadOfPage num={this.state.num} total={this.state.total}/>
                    <div className="search_li">

                        <SearchLi />
                    </div>
                    <section className="main">
                        <div className="content">
                            <div className="details-info">
                            <HeadAdv bigImage={this.state.bigImage} style={{position: "relative"}}/>
                            <RightAdv fisImage={this.state.firImage} secImage={this.state.secImage} thiImage={this.state.thiImage}
                                      style={{position: "absolute"}}/>
                                <div className="clear"></div>
                            </div>
                            <div className="clear"></div>
                            <section className="container">
                                <div className="bottom-slider">
                                    <a href="/#/home" className="btn-left"></a>
                                    <div className="slides">
                                        <p>Last added products</p>
                                        <ul className="item-list">
                                            {
                                                this.state.newAdds.map(
                                                    function (newAdd) {
                                                        return <NewAdded image={newAdd}/>
                                                    })
                                            }
                                        </ul>
                                    </div>
                                    <a href="/#/home"  className="btn-right"></a>
                                </div>
                            </section>
                            <div className="clear"></div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

function Homepage(){
    return(
        <HomePages bigImage={home_page.bigImage} littleAdv={home_page.littleAdv} newAdds={home_page.newAdds}
                   checkOut={home_page.checkOut}/>
    );
}
export default Homepage;