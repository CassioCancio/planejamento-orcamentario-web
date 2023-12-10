import "./ExpensesDisplay.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableLine from "../components/DisplayTable/Table";
import { deleteExpense, getExpenseById, getExpensesByBalance } from "../services/expenseService";
import ExpensePopup from "../components/ExpensePopup/ExpensePopup";
import LineCells from "../components/DisplayTable/ExpenseLineCells";
import DisplayFilter from "../components/DisplayFilter/DisplayFilter";
import addIcon from "../images/plus.png"

const ExpensesDisplay = () => {
  const [expensePopup, setExpensePopup] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({}); // criar objeto default
  const [expenses, setExpenses] = useState([]);
  const [updatePage, setUpdatePage] = useState(0);

  useEffect(() => {
    const fetchDisplayData = (async () => {
      const balanceExpenses = await getExpensesByBalance(2023); // TODO: trocar 2023
      setExpenses(balanceExpenses);
    });
    fetchDisplayData();
  },[updatePage])
  
  const handleSelectExpense = async (id) => {
    const expense = await getExpenseById(id);
    if(expense != null){
      let formattedPaymentDate = new Date(expense.expectedPaymentDate);
      expense.expectedPaymentDate = formattedPaymentDate.toISOString().split('T')[0];
      setExpensePopup(true);
      setSelectedExpense(expense);
    }
  }

  const handleDeleteItem = async (id) => {
    const deleted = await deleteExpense(id);
    if(deleted){
      setUpdatePage(updatePage+1);
    }
  }

  const handleFilter = async (filter) => {
    const balanceExpenses = await getExpensesByBalance(2023, filter.groupId, filter.categoryId, filter.name); // TODO: trocar 2023
    setExpenses(balanceExpenses);
  }

  const navigate = useNavigate(); 

  const handleCreateNewExpense = () => {
    navigate(`/criacao-despesa`);
  }

  return (
    <div className="mainMargin">

      <div className="expenseTitleAdd">
        <h1>Despesas registradas</h1>
        <button onClick={handleCreateNewExpense} className="expenseAddButton"><img src={addIcon} alt="Ícone de adição"/>Adicionar</button>
      </div>
      
      <DisplayFilter handleFilter={handleFilter}/>

      <table className="expensesTable">
        <tr className="titleLineExpense">
          <th className="titleGrupoExpense">Grupo</th>
          <th className="titleNomeExpense">Nome</th>
          <th className="titleCategoriaExpense">Categoria</th>
          <th className="titleValueExpense">Valor Solicitado</th>
          <th className="titleValueExpense">Valor Pago</th>
          <th className="titleDetailsExpense"></th>
          <th className="titleDeleteExpense"></th>
        </tr>

        <TableLine handleSelectItem={handleSelectExpense} list={expenses} LineCells={LineCells} handleDeleteItem={handleDeleteItem}/>

        {expensePopup && <ExpensePopup setUpdatePage={setUpdatePage} updatePage={updatePage} expense={selectedExpense} setExpense={setSelectedExpense} setPopup={setExpensePopup}/>}
      </table>
    </div>
  );
};

export default ExpensesDisplay;
