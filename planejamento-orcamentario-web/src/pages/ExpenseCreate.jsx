import { useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';

import './ExpenseCreate.css';

import { getAllCategories } from "../services/categoryService";
import { getAllGroups } from "../services/groupService";
import { createNewExpense } from "../services/expenseService";
import { initialExpense } from "../utils/initialExpense";

function Expense() {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [expense, setExpense] = useState(initialExpense);

  useEffect(() => {
    const fetchSelectsData = (async () => {
      const categories = await getAllCategories();
      setCategoryOptions(categories);
  
      const groups = await getAllGroups();
      setGroupOptions(groups);
    });
    fetchSelectsData();
  },[])

  const handleSelectId = ({name, value}) => {
    setExpense({
      ...expense, 
      [name]: parseInt(value)
    });
  }

  const handleObjectInput = ({name, value}) => {
    setExpense({
      ...expense, 
      [name]:value
    });
  }

  const handleMonetaryInput = ({name, value}) => {
    const formattedValue = value.replace(/\./g, '').replace(",", ".");
    setExpense({
        ...expense,
        [name]: parseFloat(formattedValue.replace('R$ ', '').trim())
    })
  }

  const handleNewExpense = async () => {
    await createNewExpense(expense);
  }

  return (
    <div className="createExpenseContainer">
      <div className="mainMargin">
          <h1>Insira os dados da nova despesa</h1>

          <div className="labelInput">
            <label>Nome</label>
            <input 
              type="text" 
              value={expense.name}
              onChange={(e) => handleObjectInput({ name:'name', value: e.target.value })} 
              placeholder="Edital de pesquisa"
            />
          </div>

          <div className="displayTwo">
            <div className="labelInput">
            <label>Grupo da Despesa</label>
            <select id="selectGroup" onChange={(e) => handleSelectId({name: 'groupId', value: e.target.value })}>
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
              <label>Categoria da despesa</label>
              <select onChange={(e) => handleSelectId({name: 'categoryId', value: e.target.value })}>
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
              <label>Solicitante</label>
              <input 
                value={expense.requester} 
                onChange={(e) => handleObjectInput({ name:'requester', value: e.target.value })} 
                placeholder=""
              />
            </div>
            <div className="labelInput">
              <label>Ano Fiscal</label>
              <input 
                value={expense.balanceYear}
                placeholder="2023" 
                disabled 
                className="lockedInput"
              />
            </div>
          </div>

          <div className="displayTwo">
            <div className="labelInput">
              <label>Previsão de pagamento</label>
              <input 
                value={expense.expectedPaymentDate} 
                onChange={(e) => handleObjectInput({ name:'expectedPaymentDate', value: e.target.value })} 
                type="date"
              />
            </div>
            <div className="labelInput">
              <label>Valor solicitado</label>
              <NumericFormat 
                value={expense.requestedValue} 
                onChange={(e) => handleMonetaryInput({ name:'requestedValue', value: e.target.value })} 
                thousandSeparator={'.'}
                decimalSeparator="," 
                prefix={'R$ '} 
              />
            </div>
          </div>

          <div className="labelInput">
            <label>Observação</label>
            <textarea 
              value={expense.observation} 
              onChange={(e) => handleObjectInput({ name:'observation', value: e.target.value })} 
              placeholder="Edital para ..."
            />
          </div>
          
          <div className="centerSubmitButton">
            <button className="submitButton" onClick={handleNewExpense}>
              Inserir despesa
            </button>
          </div>

      </div>
    </div>
  );



}

export default Expense;