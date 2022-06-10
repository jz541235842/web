import React from "react";
import {HashRouter,Route,Switch} from "react-router-dom"
import Login from "../views/Login"
import Layout from "../layout"
import AuthRouter from "../utils/AuthRouter"
const Router=()=>{
   return(
    <HashRouter>
        <Switch>
          <Route component={Login} path="/login" exact/>
          <AuthRouter path="/" component={Layout}/>
        </Switch>
    </HashRouter>
   )
}
export default Router