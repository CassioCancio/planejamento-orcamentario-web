import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import Expense from "./pages/ExpenseCreate"
import Income from "./pages/IncomeCreate"
import ExpensesDisplay from "./pages/ExpensesDisplay";
import IncomesDisplay from "./pages/IncomesDisplay";
import ReportsDisplay from "./pages/ReportsDisplay";

const App = () => {
   return(
    <Router>
      <Routes>
        <Route path="/criacao-despesa" element={<Expense/>} />
        <Route path="/criacao-credito" element={<Income/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/despesas" element={<ExpensesDisplay/>} />
        <Route path="/creditos" element={<IncomesDisplay/>} />
        <Route path="/relatorios" element={<ReportsDisplay/>} />
      </Routes>
    </Router>
   )
}

export default App;