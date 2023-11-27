import "./CreditsDisplay.css";

import { useEffect, useState } from "react";

import TableLine from "../components/DisplayTable/Table";
import { getCreditById, getCreditsByBalance } from "../services/creditService";
import CreditPopup from "../components/CreditPopup/CreditPopup";
import LineCells from "../components/DisplayTable/CreditLineCells";
import DisplayFilter from "../components/DisplayFilter/DisplayFilter";

const CreditsDisplay = () => {
  const [creditPopup, setCreditPopup] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState({}); // criar objeto default
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchBalanceData = (async () => {
      const balanceCredits = await getCreditsByBalance(2023); // TODO: trocar 2023
      setCredits(balanceCredits);
    });
    
    fetchBalanceData();
  },[])

  const handleSelectCredit = async (id) => {
    const credit = await getCreditById(id);
    if(credit != null){
      setCreditPopup(true);
      setSelectedCredit(credit);
    }
  }

  const handleFilter = async (filter) => {
    const balanceExpenses = await getCreditsByBalance(2023, filter.groupId, filter.name); // TODO: trocar 2023
    setCredits(balanceExpenses);
  }

  return (
    <div className="mainMargin">
      <h1>Créditos registrados</h1>
      
      <DisplayFilter handleFilter={handleFilter}/>
      
      <table className="creditsTable">
        <tr className="titleLineCredit">
          <th className="titleGrupoCredit">Grupo</th>
          <th className="titleNomeCredit">Nome</th>
          <th className="titleCategoriaCredit">Categoria</th>
          <th className="titleValorCredit">Valor</th>
          <th className="titleDetalhesCredit"></th>
        </tr>

        <TableLine handleSelectItem={handleSelectCredit} list={credits} LineCells={LineCells}/>

        {creditPopup && <CreditPopup credit={selectedCredit} setCredit={setSelectedCredit} setPopup={setCreditPopup}/>}
      </table>
    </div>
  );
};

export default CreditsDisplay;
