import { useEffect, useState } from "react";
import NavBar from "../components/NavBar"
import './ExpenseCreate.css';
import { getAllCategories } from "../services/categoryService";
import { getAllGroups } from "../services/groupService";
import { createNewExpense } from "../services/expenseService";
import { NumericFormat } from 'react-number-format';



function Expense() {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [expense, setExpense] = useState({}); // TODO: Criar um objeto inicial padrão para a despesa

  useEffect(() => {
    const fetchSelectsData = (async () => {
      const categories = await getAllCategories();
      setCategoryOptions(categories);
  
      const groups = await getAllGroups();
      setGroupOptions(groups);
    });
    fetchSelectsData();
  },[])

  const handleSelect = ({name, value}) => { // TODO: Mover para um arquivo de handles (utils)
    setExpense({
      ...expense, 
      [name]:value
    });
  }

  const handleNewExpense = async () => {
    const expenseCreated = await createNewExpense(expense);
    setExpense(expenseCreated);
  }

  return (
    <div className="mainMargin">
        <NavBar/>

        <h1>Insira os dados da nova despesa</h1>


        <form className="createExpenseForm">
          <div className="labelInput">
            <label>Título</label><input placeholder="Edital de pesquisa"></input>
          </div>

          <div className="displayTwo">
            <div className="labelInput">
              <label>Grupo da despesa</label>
              <select id="selectGroup" onChange={(e) => handleSelect({name: 'group', value: e.target.value })}>
                <option value="default">—</option>
                {groupOptions.map(group => {
                  return (
                    <option key={group.key} value={group.id}>
                      {group.number + ` - ` + group.name}
                    </option>
                  )
                })}
              </select>

            </div>
            <div className="labelInput">
              <label>Categoria de despesa</label>
              <select onChange={(e) => handleSelect({name: 'category', value: e.target.value })}>
                <option key={0} value="default">—</option>
                {categoryOptions.map(category => {
                  return (
                    <option key={category.key} value={category.id}>
                      {category.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          
          <div className="displayTwo">
            <div className="labelInput">
              <label>Balanço</label><input placeholder="2023" disabled className="lockedInput"></input>
            </div>
            <div className="labelInput">
              <label>Instituição</label>
              <select><option>IME</option></select>
            </div>
          </div>


          <div className="displayTwo">
            <div className="labelInput">
              <label>Data de pagamento</label><input type="date"></input>
            </div>
            <div className="labelInput">
              <label>Valor inicial</label>
              <NumericFormat thousandSeparator={true} prefix={'R$ '} />
            </div>
          </div>

          <div className="labelInput">
            <label>Observação</label><textarea placeholder="Edital para ..."></textarea>
          </div>
          <button className="submitButton" onClick={handleNewExpense}>Inserir despesa</button>
        </form>

    </div>
  );



}

export default Expense;






