
import { useRouteError } from "react-router-dom"
import React from "react";
const Error = () =>
{
    const err =  useRouteError();
    console.log(err);
<div>
    <h1> Oops!</h1>
    <h3> Somethings went wrong........</h3>
    <h1> {err.status} : {err.statusText}</h1>
</div>    
}


export default Error;