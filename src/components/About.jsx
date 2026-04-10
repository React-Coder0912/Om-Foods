

import React from "react";
import User from "./User";
import UserClass from "./UserClass";



class About extends React.Component{

constructor(props)
{
  super(props);
  // console.log(" Parent constructor called ")
}

componentDidMount()
{
  console.log("parent mount ")
}
  render()
  {

    // console.log(" Parent render called ")
    return (
      <div>
        <h1>About</h1>
        <h2>This is Namaste React Web Series</h2>
        {/* <User name={"Shivaraj Mothe Functional"}/> */}
        <UserClass name={"Shivaraj Class"} />
        {/* <UserClass name={"Raj Class"} />
        <UserClass name={"OM Class"} /> */}
      </div>
    );
  }

}

// const About = () => {
//   return (
//     <div>
//       <h1>About</h1>
//       <h2>This is Namaste React Web Series</h2>
//       {/* <User name={"Shivaraj Mothe Functional"}/> */}
//       <UserClass name={"Shivaraj Class"} />
//     </div>
//   );
// };

export default About;