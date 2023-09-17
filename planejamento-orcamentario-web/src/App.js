import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import Expense from "./pages/ExpenseCreate"

const App = () => {
   return(
    <Router>
      <Routes>
        <Route path="/criacao-despesa" element={<Expense />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
   )
}

export default App;