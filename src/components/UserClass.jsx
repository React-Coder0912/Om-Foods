import React from "react";
class UserClass extends React.Component
{
constructor (props)
    {
super(props)

this.state ={
    userInfo:
    {
        login: "hello",
        id: "1111111"
    },
};

// console.log( this.props.name + "child constructor called");
    }

   async componentDidMount()
    {
const data = await fetch("https://api.github.com/users/ShivaRajmothe");
const json= await data.json();
console.log(json);

this.setState(
    {
        userInfo:json,
    }
) // console.log(this.props.name + "child mount")
    }

    
componentDidUpdate()
{
    console.log(this.props.name + "child updated");
}


componentWillUnmount()
{
    console.log(this.props.name + "child unmounted");
}

    render()
    { 

        // console.log(this.props.name + "child rendered");
    const{login,id} = this.state.userInfo;
 
    
        return(
            <div className="user-card">
            
            <h1>Name:{login}</h1>
            <h2>Location: {id}</h2>
            <h3> Contact: ShivarajMothe09</h3>
        </div>
        )

    }
}

export default UserClass;