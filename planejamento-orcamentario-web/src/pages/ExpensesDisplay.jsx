import "./ExpensesDisplay.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableLine from "../components/DisplayTable/Table";
import { getExpenseById, getExpensesByBalance } from "../services/expenseService";
import ExpensePopup from "../components/ExpensePopup/ExpensePopup";
import LineCells from "../components/DisplayTable/ExpenseLineCells";
import DisplayFilter from "../components/DisplayFilter/DisplayFilter";
import addIcon from "../images/plus.png"

const ExpensesDisplay = () => {
  const [expensePopup, setExpensePopup] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({}); // criar objeto default
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchDisplayData = (async () => {
      const balanceExpenses = await getExpensesByBalance(2023); // TODO: trocar 2023
      setExpenses(balanceExpenses);
    });
    fetchDisplayData();
  },[])

  const handleSelectExpense = async (id) => {
    const expense = await getExpenseById(id);
    if(expense != null){
      setExpensePopup(true);
      setSelectedExpense(expense);
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
          <th className="titleDetalhesExpense"></th>
        </tr>

        <TableLine handleSelectItem={handleSelectExpense} list={expenses} LineCells={LineCells}/>

        {expensePopup && <ExpensePopup expense={selectedExpense} setExpense={setSelectedExpense} setPopup={setExpensePopup}/>}
      </table>
    </div>
  );
};

export default ExpensesDisplay;
