import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import Expense from "./pages/ExpenseCreate"
import ExpensesDisplay from "./pages/ExpensesDisplay";
import CreditsDisplay from "./pages/CreditsDisplay";
import ReportsDisplay from "./pages/ReportsDisplay";

const App = () => {
   return(
    <Router>
      <Routes>
        <Route path="/criacao-despesa" element={<Expense/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/despesas" element={<ExpensesDisplay/>} />
        <Route path="/creditos" element={<CreditsDisplay/>} />
        <Route path="/relatorios" element={<ReportsDisplay/>} />
      </Routes>
    </Router>
   )
}

export default App;