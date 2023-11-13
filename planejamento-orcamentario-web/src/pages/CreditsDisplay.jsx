import { useState } from "react";
import TableLine from "../components/CreditTableLine/TableLine";
import { getCreditById } from "../services/creditService";
import "./CreditsDisplay.css";
import CreditPopup from "../components/CreditPopup/CreditPopup";

const CreditsDisplay = () => {
  const [creditPopup, setCreditPopup] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState({}); // criar objeto default

  const handleSelectCredit = async (id) => {
    const credit = await getCreditById(id);
    if(credit != null){
      setCreditPopup(true);
      setSelectedCredit(credit);
    }
  }
  return (
    <div className="mainMargin">
      <h1>Créditos registrados</h1>
      <div className="creditDisplayFilter">
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
      
      <table className="creditsTable">
        <tr className="titleLineCredit">
          <th className="titleGrupoCredit">Grupo</th>
          <th className="titleNomeCredit">Nome</th>
          <th className="titleCategoriaCredit">Categoria</th>
          <th className="titleValorCredit">Valor</th>
          <th className="titleDetalhesCredit"></th>
        </tr>

        <TableLine handleSelectCredit={handleSelectCredit}/>

        {creditPopup && <CreditPopup credit={selectedCredit} setCredit={setSelectedCredit} setPopup={setCreditPopup}/>}
      </table>
    </div>
  );
};

export default CreditsDisplay;
