import { useEffect, useState } from "react";
import TableLine from "../components/ExpenseTableLine/TableLine";
import { getExpenseById, getExpensesByBalance } from "../services/expenseService";
import "./ExpensesDisplay.css";
import ExpensePopup from "../components/ExpensePopup/ExpensePopup";
import { getAllCategories } from "../services/categoryService";
import { getAllGroups } from "../services/groupService";

const ExpensesDisplay = () => {
  const [expensePopup, setExpensePopup] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({}); // criar objeto default
  const [filter, setFilter] = useState({categoryId: null, groupId: null, name: ''});
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchSelectsData = (async () => {
      const categories = await getAllCategories();
      setCategoryOptions(categories);
  
      const groups = await getAllGroups();
      setGroupOptions(groups);

      const balanceExpenses = await getExpensesByBalance(2023); // TODO: trocar 2023
      setExpenses(balanceExpenses);
    });
    fetchSelectsData();
  },[])

  const handleSelectExpense = async (id) => {
    const expense = await getExpenseById(id);
    if(expense != null){
      setExpensePopup(true);
      setSelectedExpense(expense);
    }
  }

  const handleSelectId = ({name, value}) => {
    setFilter({
      ...filter, 
      [name]: value !== '—' ? parseInt(value) : null
    });
  }

  const handleObjectFilterInput = ({name, value}) => {
    setFilter({
      ...filter, 
      [name]:value
    });
  }

  const handleFilter = async () => {
    const balanceExpenses = await getExpensesByBalance(2023, filter.groupId, filter.categoryId, filter.name); // TODO: trocar 2023
    setExpenses(balanceExpenses);
  }

  return (
    <div className="mainMargin">
      <h1>Despesas registradas</h1>
      <div className="expenseDisplayFilter">
        <div className="labelFilter displayFilterField1">
          <label>Nome</label>
          <input
            type="text"
            value={filter.name}
            onChange={(e) => handleObjectFilterInput({ name:'name', value: e.target.value })} 
          />
        </div>
        <div className="labelFilter displayFilterField2">
          <label>Grupo</label>
          <select id="selectGroup" onChange={(e) => handleSelectId({name: 'groupId', value: e.target.value })}>
            <option key={0} value={null}>—</option>
            {groupOptions.map(group => {
              return (
                <option key={group.number} value={group.id}>
                  {group.number + ` - ` + group.name}
                </option>
              )
            })}
          </select>
        </div>
        <div className="labelFilter displayFilterField3">
          <label>Categoria</label>
          <select onChange={(e) => handleSelectId({name: 'categoryId', value: e.target.value })}>
            <option key={0} value={null}>—</option>
            {categoryOptions.map(category => {
                return (
                    <option key={category.id} value={category.id}>
                    {category.name}
                    </option>
                )
            })}
          </select>
        </div>
        <div className="labelFilter displayFilterField4">
          <button onClick={handleFilter}>Buscar</button>
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

        <TableLine handleSelectExpense={handleSelectExpense} expenses={expenses}/>

        {expensePopup && <ExpensePopup expense={selectedExpense} setExpense={setSelectedExpense} setPopup={setExpensePopup}/>}
      </table>
    </div>
  );
};

export default ExpensesDisplay;
