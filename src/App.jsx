import React, { lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Shimmer from "./components/Shimmer";
import Instamart from "./components/Instamart";
import ProductMenu from "./components/ProductMenu";
import UserContext from "./utils/UserContext";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
const AppLayout = () => {

  const[userName, setUserName] = useState();

  useEffect(()=>
  {
const data = {
  name : 'Shivaraj',
};
setUserName(data.name);
  },[])
  return (
    <Provider store={appStore}>
    {/* <UserContext.Provider 
    value={{
            loggedInUser: userName,
            setUserName,
          }}
    > */}
    <div className="app">
    {/* <UserContext.Provider  value={{loggedInUser : "Raj"}}> */}
      <Header />
      {/* </UserContext.Provider> */}

      <Outlet />
      {/* <SearchFilter/>
      <Accordian /> */}
    </div>
    {/* </UserContext.Provider> */}
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/instamart",
        element:<Suspense>  <Instamart /></Suspense>,  // on demand will load this component
      },  
      {
        path: "/recipes/:id",
        element: <RestaurantMenu />,
      },
      {
        path: "/products/:id",
        element: <ProductMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);