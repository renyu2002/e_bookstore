import './App.css';
import React from "react";
import {HashRouter, Route} from "react-router-dom";
import Homepage from "./view/homepage";
import Bookspage from "./view/products";
import Cartpage from "./view/cart";
import Bookpage from "./view/book";
import Accountpagefinal from "./view/myaccount";

import Registerpage from "./view/register";
import Loginpage from "./view/login";
import UserManagementpage from "./view/userManagement";
import BookRankingPage from "./view/bookRanking";
import UserRankingPage from "./view/userPurchaseRanking";
import OrderManagementPage from "./view/orderManagement";
import MaAccountpagefinal from "./view/Newmyaccount";
import BookManagement from "./view/bookManagement";
function App() {
  return(

      <HashRouter>
          <Route path="/" component={Loginpage} exact />
          <Route path='/register'>
              <Registerpage/>
          </Route>
          <Route path='/books'>
              <Bookspage/>
          </Route>
          <Route path='/home'>
              <Homepage/>
          </Route>
          <Route path='/cart'>
              <Cartpage/>
          </Route>
          <Route path='/book'>
              <Bookpage/>
          </Route>
          <Route path='/accountfinal'>
              <Accountpagefinal/>
          </Route>
          <Route path='/usermanagement'>
              <UserManagementpage/>
          </Route>
          <Route path='/booksalesranking'>
              <BookRankingPage/>
          </Route>
          <Route path='/userpurchaseranking'>
              <UserRankingPage/>
          </Route>
          <Route path='/ordermanagement'>
              <OrderManagementPage/>
          </Route>
          <Route path='/admyaccount'>
              <MaAccountpagefinal/>
          </Route>
          <Route path='/bookmanagement'>
              <BookManagement/>
          </Route>
      </HashRouter>
  );
}
export default App;