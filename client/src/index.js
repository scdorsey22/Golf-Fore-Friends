// Import necessary modules
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";

// Import the main app components
import App1 from "./redux/App1";

// Import function to report web vitals
import reportWebVitals from "./reportWebVitals";

// Import BrowserRouter for routing
import { BrowserRouter } from "react-router-dom";

// Render the main app component inside the Provider component and pass in the Redux store
// Wrap the BrowserRouter component around the main app component for routing
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App1 />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// Function to report web vitals
reportWebVitals();
