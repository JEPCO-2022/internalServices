import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import { Card } from "@mui/material";
import SubscriptionsInquiry from "./component/Pages/SubscriptionsInquiry/SubscriptionsInquiry";
import Header from "./component/Pages/Header";

const App: React.FC = () => {
  return (
    <div className="App">
      <Card
        style={{
          border: "10px solid RGB(0, 61, 118)",
          padding: 50,
          textAlign: "right",
          direction: "rtl",
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<SubscriptionsInquiry />} />
        </Routes>
      </Card>
    </div>
  );
};

export default App;
