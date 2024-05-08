import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import { Card } from "@mui/material";
import SubscriptionsInquiry from "./component/Pages/SubscriptionsInquiry/SubscriptionsInquiry";
function App() {
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
        <Routes>
          <Route path="/" element={<SubscriptionsInquiry />} />
        </Routes>
      </Card>
    </div>
  );
}

export default App;
