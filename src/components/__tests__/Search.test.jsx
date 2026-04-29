// import { render } from "@testing-library/react";
// import Body from "../Body";
// import { MOCK_DATA } from "../mocks/mockResListData.json";
// import { act } from "react";
// import { BrowserRouter } from "react-router-dom";

// global.fetch = jest.fn(() => Promise.resolve({
//     json: () => Promise.resolve(MOCK_DATA),
// }));    

// it("renders Search component", async() => {  
//    await act(async() =>
// {
//     render(
//         <BrowserRouter>
//         <Body />
//         </BrowserRouter>
//     )
// })
// });

import { render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from "../mocks/mockResListData.json";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";
import UserContext from "../utils/UserContext";
import "@testing-library/jest-dom";

// ✅ mock custom hook
jest.mock("../utils/useOnline", () => jest.fn(() => true));

// ✅ mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

it("renders Search input after fetching restaurants", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ loggedInUser: "Shiva" }}>
          <Body />
        </UserContext.Provider>
      </BrowserRouter>
    );
  });

  // ✅ Search input exists
  expect(
    screen.getByRole("textbox")
  ).toBeInTheDocument();
});