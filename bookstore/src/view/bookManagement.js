import React,{ Component }  from 'react';
import "../CSS/all.css"
import "../CSS/fancySelect.css"
import "../CSS/jquery-ui-1.10.4.custom.css"
import "../CSS/jquery.bxslider.css"
import "../CSS/screen.css"
import "../CSS/uniform.css"
import "../CSS/PIE.htc"
import {Bar, Page, AdministratorHeadOfPage} from "../components/head"
import "../CSS/bookmanage.css"
import {Input, Pagination} from "antd";
import { Image } from 'antd';
import {  Upload, Icon, message } from 'antd';
import reqwest from 'reqwest'
import { Alert, Button, Space } from 'antd';

const check_out={}

export const books_page={books:[],name:"Book Management",checkOut:check_out}

export class BooksManagementPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            books:props.books,
            preSearchData:props.books,
            name:props.name,
            onEdit:false,
            onAdd:false,
            author: null,
            content: null,
            description:null,
            id: null,
            image: null,
            price: 0,
            title: null,
            writer: null,
            inventory:0,
            page: 1,
            pageSize:8,
            totalSize:0,
            loading: false,
            imageUrl:"",
            isbn:""
        }
    }

    componentWillMount(){
        if(localStorage.getItem("id")==null){
            alert("please log in first")
            window.location.replace("http://localhost:3000/?#/");
            return;
        }
        fetch("http://localhost:8080/checkAdministrator?userid="+localStorage.getItem("id"))
            .then(response => response.json())
            .then(data => {
                if(data==="no"){
                    alert("Non-administrators do not have permission to access this page")
                }
                else {
                    fetch("http://localhost:8080/alldetail")
                        .then(response => response.json())
                        .then(data => {
                            this.setState({
                                books: data,
                                preSearchData:data,
                                totalSize:data.length
                            });
                        }).catch(function (ex) {
                        console.log('parsing failed', ex)
                    })
                }
            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })

    }


    changeTitle=(e)=>{this.setState({title:e.target.value}) }
    changeWriter=(e)=>{this.setState({writer:e.target.value}) }
    changePrice=(e)=>{
        if(isNaN(e.target.value)){
            alert("please input a positive number")
            return;
        }
        if(e.target.value==="")
            this.setState({price:0})
        else
            this.setState({price:parseInt(e.target.value)})
    }
    changeImage=(e)=>{this.setState({image:e.target.value}) }
    changeDescription=(e)=>{this.setState({description:e.target.value}) }
    changeContent=(e)=>{this.setState({content:e.target.value}) }
    changeAuthor=(e)=>{this.setState({author:e.target.value}) }
    changeInventory=(e)=>{
        if(isNaN(e.target.value)){
            alert("please input a positive number")
            return;
        }
        if(e.target.value==="")
            this.setState({inventory:0})
        else
            this.setState({inventory:parseInt(e.target.value)})
    }
    changeISBN=(e)=>{this.setState({isbn:e.target.value}) }

    yes=()=>{
        if(this.state.onAdd===true) {

            let infToService={
                method:'post',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    "image":this.state.image,
                    "title":this.state.title,
                    "price":this.state.price,
                    "author":this.state.author,
                    "description":this.state.description,
                    "content":this.state.content,
                    "writer":this.state.writer,
                    "inventory":this.state.inventory,
                    "isbn":this.state.isbn
                })
            }

            fetch("http://localhost:8080/newone?",infToService);
            window.location.reload();

        }
        else if(this.state.onEdit===true) {

            let infToService={
                method:'post',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    "id":this.state.id,
                    "image":this.state.image,
                    "title":this.state.title,
                    "price":this.state.price,
                    "author":this.state.author,
                    "description":this.state.description,
                    "content":this.state.content,
                    "writer":this.state.writer,
                    "inventory":this.state.inventory,
                    "isbn":this.state.isbn
                })
            }

            fetch("http://localhost:8080/saveone?",infToService);
        }
        this.setState({
            onAdd:false,
            onEdit:false,
        })
        window.location.reload();
    }

    no=()=>
    {
        this.setState({
            onEdit:false,
            onAdd:false,
        })
    }

    search = (e) => {
        let needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({
                books: this.state.preSearchData,
                totalSize:this.state.preSearchData.length});
            return;
        }
        var searchdata = this.state.preSearchData.filter(function (item) {
            return item.title.toLowerCase().indexOf(needle) > -1;
        });
        this.setState({
            books: searchdata,
            totalSize:searchdata.length
        });
    };

    alertAWarning=(id)=>{
        return(
            <Alert
                message="warning"
                description="This entry cannot be recovered after being deleted, are you sure you want to delete it?"
                type="info"
                action={
                    <Space direction="vertical">
                        <Button size="small" type="primary" onClick={()=>{
                            fetch("http://localhost:8080/deletebook?bookid="+id);
                            window.location.reload();
                        }
                        }>
                            Confirm
                        </Button>
                    </Space>
                }
                closable
            />
        )
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload book image</div>
            </div>
        );

        const uploadProps = {
            name: "avatar",
            showUploadList: false,
            customRequest: info => {
                const formData = new FormData();
                formData.append('avatar', info.file);
                reqwest({
                    url: 'http://localhost:8080/uploadImage',
                    method: 'post',
                    processData: false,
                    enctype:"multipart/form-data",
                    data: formData,
                    success: (res) => {
                        if (res !== 'error') {
                            this.setState({
                                image: res
                            });
                            message.success('upload successfully!');
                        }
                    },
                    error: () => {
                        message.error('upload error');
                    },
                });
            },
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            listType: "picture-card",
            className: "avatar-uploader",

            beforeUpload: file => {//控制上传图片格式
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

                if (!isJpgOrPng) {
                    message.error('you can upload JPG/PNG file only');
                    return;
                }
                return isJpgOrPng;
            },
        };


    return (
            <div id="wrapper">
                <div className="wrapper-holder">
                    <AdministratorHeadOfPage/>
                    <section className="main">
                        <div className="content">
                            <Bar page={this.state.name} />
                            <div style={{ marginBottom: 16 }} onChange ={this.search}>
                                <Input addonBefore='Book Name' id="searchbar"
                                       defaultValue="" />
                            </div>
                            <ul className="item-product">
                                {
                                    this.state.books.slice((this.state.page-1)*this.state.pageSize,this.state.page*this.state.pageSize).map(
                                        function (book_,index) {
                                            return(<li>
                                                <div className="item">
                                                    <div className="image">
                                                        <a href="#/book" onClick={()=> {
                                                            localStorage.setItem("item", "" + book_.id)
                                                        }}><img  src={book_.image} alt=""/></a>
                                                    </div>
                                                    <span className="name"><a href="#/book" onClick={()=> {
                                                        localStorage.setItem("item", "" + book_.id)
                                                    }}>{book_.title}</a></span>
                                                    <span>{"$"+book_.price/100}</span>
                                                    <span className="name">Inventory:{book_.inventory}</span>
                                                    <span><a onClick={(index)=>{
                                                        this.setState({
                                                            onEdit:true,
                                                            author: book_.author,
                                                            content: book_.content,
                                                            description:book_.description,
                                                            id: book_.id,
                                                            image: book_.image,
                                                            price: book_.price,
                                                            title: book_.title,
                                                            writer: book_.writer,
                                                            inventory:book_.inventory,
                                                            isbn:book_.isbn
                                                        })
                                                    }
                                                    } className="btn btn_checkout">Modify</a></span>
                                                    <span><br></br></span>
                                                    <span><a className="btn btn_checkout" onClick={()=>{
                                                        // this.alertAWarning(book_.id)
                                                        fetch("http://localhost:8080/deletebook?bookid="+book_.id);
                                                        window.location.reload();

                                                    }
                                                    }>Delete</a></span>
                                                </div>
                                            </li>)
                                        }.bind(this))
                                }
                            </ul>
                            <div className="top-bar top-bar-add"  >
                                <Pagination defaultCurrent={1} total={this.state.totalSize} defaultPageSize={this.state.pageSize}
                                            onChange={(page, pageSize)=>{
                                                this.setState({
                                                    page: page,
                                                    pageSize:pageSize
                                                });
                                            }} style={{float:'right'}}/>
                            </div>
                        </div>
                        <div className="box_sub_total">
                            <a className="btn btn_finalize" onClick={()=>{
                                this.setState({
                                    onAdd:true,
                                    author: "",
                                    content: "",
                                    description:"",
                                    id: 0,
                                    image: "",
                                    price: 0,
                                    title: "",
                                    writer: "",
                                    inventory:0,
                                    isbn:""
                                })
                            }}>Add A New Book</a>
                        </div>
                    </section>

                    <div className={["addEditComp",this.state.onEdit||this.state.onAdd?'isvisible':'invisible'].join(' ')}>
                        <div className={"compmanage-item"}>Book Title</div>
                        <Input onChange={this.changeTitle} value={this.state.title}/>
                        <div className={"compmanage-item"}>Book Author</div>
                        <Input onChange={this.changeAuthor} value={this.state.author}/>
                        <div className={"compmanage-item"}>Book Price(Cents)</div>
                        <Input onChange={this.changePrice} value={this.state.price}/>
                        <div className={"compmanage-item"}>Book Writer Information</div>
                        <Input onChange={this.changeWriter} value={this.state.writer}/>
                        <div className={"compmanage-item"}>ISBN</div>
                        <Input onChange={this.changeISBN} value={this.state.isbn}/>
                        <div className={"compmanage-item"}>Book Content</div>
                        <Input onChange={this.changeContent} value={this.state.content}/>
                        <div className={"compmanage-item"}>Book ImageUrl</div>
                        <Image style={{float:'left'}} width={200} src={this.state.image}/>
                        <div style={{float:'left'}}>
                            <Upload {...uploadProps}>
                                {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> :     uploadButton}
                            </Upload>
                        </div>
                        <Input onChange={this.changeImage} value={this.state.image}/>
                        <div className={"compmanage-item"}>Book Description</div>
                        <Input onChange={this.changeDescription} value={this.state.description}/>
                        <div className={"compmanage-item"}>Inventory</div>
                        <Input onChange={this.changeInventory} value={this.state.inventory}/>
                        <div>
                            <button className={"compmanage-button"} onClick={this.yes}>Confirm</button>
                            <button className={"compmanage-button"} onClick={this.no}>Cancel</button>
                        </div>
                    </div>
                    <div className={["overlay",(this.state.onEdit||this.state.onAdd)?'isvisible':'invisible'].join(' ')}/>
                </div>
            </div>
        );
    }
}

function BookManagement() {
    return(
        <BooksManagementPage books={books_page.books} name={books_page.name}/>
    );
}
export default BookManagement;