import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import Expense from "./pages/ExpenseCreate"
import ExpensesDisplay from "./pages/ExpensesDisplay";

const App = () => {
   return(
    <Router>
      <Routes>
        <Route path="/criacao-despesa" element={<Expense />} />
        <Route path="/" element={<Home />} />
        <Route path="/despesas" element={<ExpensesDisplay/>} />
      </Routes>
    </Router>
   )
}

export default App;