import React from "react";
import {Route,Redirect,withRouter} from "react-router-dom"

const  AuthRouter =({component:Component,...rest})=>{
    const isLogined=true;
    return <Route {...rest} render={props=>(isLogined?<Component {...props}/>:<Redirect to={'/login'}/>)}/>
}

export default withRouter(AuthRouter)