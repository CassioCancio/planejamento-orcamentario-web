import { useState } from "react";
import TableLine from "../components/IncomeTableLine/TableLine";
import { getIncomeById } from "../services/incomeService";
import "./IncomesDisplay.css";
import IncomePopup from "../components/IncomePopup/IncomePopup";

const IncomesDisplay = () => {
  const [incomePopup, setIncomePopup] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState({}); // criar objeto default

  const handleSelectIncome = async (id) => {
    const income = await getIncomeById(id);
    if(income != null){
      setIncomePopup(true);
      setSelectedIncome(income);
    }
  }

  return (
    <div className="mainMargin">
      <h1>Créditos registrados</h1>
      <div className="incomeDisplayFilter">
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
      
      <table className="incomesTable">
        <tr className="titleLineIncome">
          <th className="titleGrupoIncome">Grupo</th>
          <th className="titleNomeIncome">Nome</th>
          <th className="titleCategoriaIncome">Categoria</th>
          <th className="titleValueIncome">Valor</th>
          <th className="titleDetalhesIncome"></th>
        </tr>

        <TableLine handleSelectIncome={handleSelectIncome}/>

        {incomePopup && <IncomePopup income={selectedIncome} setIncome={setSelectedIncome} setPopup={setIncomePopup}/>}
      </table>
    </div>
  );
};

export default IncomesDisplay;
