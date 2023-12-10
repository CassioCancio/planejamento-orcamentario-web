import { useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';

import './IncomeCreate.css';

import { getAllGroups } from "../services/groupService";
import { createNewIncome } from "../services/incomeService";
import { initialIncome } from "../utils/initialIncome";

function Income() {
  const [groupOptions, setGroupOptions] = useState([]);
  const [income, setIncome] = useState(initialIncome);

  useEffect(() => {
    const fetchSelectsData = (async () => {
      const groups = await getAllGroups();
      setGroupOptions(groups);
    });
    fetchSelectsData();
  },[])

  const handleSelectId = ({name, value}) => {
    setIncome({
      ...income, 
      [name]: parseInt(value)
    });
  }

  const handleObjectInput = ({name, value}) => {
    setIncome({
      ...income, 
      [name]:value
    });
  }

  const handleMonetaryInput = ({name, value}) => {
    const formattedValue = value.replace(/\./g, '').replace(",", ".");
    setIncome({
        ...income,
        [name]: parseFloat(formattedValue.replace('R$ ', '').trim())
    })
  }

  const handleNewIncome = async () => {
    await createNewIncome(income);
  }

  return (
    <div className="createIncomeContainer">
      <div className="mainMargin">
          <h1>Insira os dados do novo crédito</h1>

          <div className="labelInput">
            <label>Nome</label>
            <input 
              type="text" 
              value={income.name}
              onChange={(e) => handleObjectInput({ name:'name', value: e.target.value })} 
              placeholder="Exemplo: Venda de animais"
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
          </div>
          
          <div className="displayTwo">
            <div className="labelInput">
              <label>Ano Fiscal</label>
              <input 
                value={income.balanceYear}
                placeholder="2023" 
                disabled 
                className="lockedInput"
              />
            </div>
            <div className="labelInput">
              <label>Valor recebido</label>
              <NumericFormat 
                value={income.value} 
                onChange={(e) => handleMonetaryInput({ name:'value', value: e.target.value })} 
                thousandSeparator={'.'}
                decimalSeparator="," 
                prefix={'R$ '} 
              />
            </div>
          </div>

          <div className="labelInput">
            <label>Observação</label>
            <textarea 
              value={income.observation} 
              onChange={(e) => handleObjectInput({ name:'observation', value: e.target.value })} 
              placeholder="Edital para ..."
            />
          </div>
          
          <div className="centerSubmitButton">
            <button className="submitButton" onClick={handleNewIncome}>
              Inserir crédito
            </button>
          </div>

      </div>
    </div>
  );



}

export default Income;