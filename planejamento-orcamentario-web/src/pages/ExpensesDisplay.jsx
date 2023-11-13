import { useState } from "react";
import TableLine from "../components/ExpenseTableLine/TableLine";
import { getExpenseById } from "../services/expenseService";
import "./ExpensesDisplay.css";
import ExpensePopup from "../components/ExpensePopup/ExpensePopup";

const ExpensesDisplay = () => {
  const [expensePopup, setExpensePopup] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({}); // criar objeto default

  const handleSelectExpense = async (id) => {
    const expense = await getExpenseById(id);
    if(expense != null){
      setExpensePopup(true);
      setSelectedExpense(expense);
    }
  }
  return (
    <div className="mainMargin">
      <h1>Despesas registradas</h1>
      <div className="expenseDisplayFilter">
        <div className="labelFilter displayFilterField1">
          <label>Nome</label>
          <input/>
        </div>
        <div className="labelFilter displayFilterField2">
          <label>Grupo</label>
          <select>

          </select>
        </div>
        <div className="labelFilter displayFilterField3">
          <label>Categoria</label>
          <select>
          </select>
        </div>
        <div className="labelFilter displayFilterField4">
          <label></label>
          <button>Buscar</button>
        </div>
      </div>
      
      <table className="expensesTable">
        <tr className="titleLineExpense">
          <th className="titleGrupoExpense">Grupo</th>
          <th className="titleNomeExpense">Nome</th>
          <th className="titleCategoriaExpense">Categoria</th>
          <th className="titleValorExpense">Valor Solicitado</th>
          <th className="titleValorExpense">Valor Pago</th>
          <th className="titleDetalhesExpense"></th>
        </tr>

        <TableLine handleSelectExpense={handleSelectExpense}/>

        {expensePopup && <ExpensePopup expense={selectedExpense} setExpense={setSelectedExpense} setPopup={setExpensePopup}/>}
      </table>
    </div>
  );
};

export default ExpensesDisplay;
