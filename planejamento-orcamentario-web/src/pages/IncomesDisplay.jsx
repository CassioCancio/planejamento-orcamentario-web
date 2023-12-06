import "./IncomesDisplay.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableLine from "../components/DisplayTable/Table";
import IncomePopup from "../components/IncomePopup/IncomePopup";
import LineCells from "../components/DisplayTable/CreditLineCells";
import DisplayFilter from "../components/DisplayFilter/DisplayFilter";
import { getIncomeById, getIncomesByBalance } from "../services/incomeService";
import addIcon from "../images/plus.png"

const IncomesDisplay = () => {
  const [creditPopup, setCreditPopup] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState({}); // criar objeto default
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchBalanceData = (async () => {
      const balanceCredits = await getIncomesByBalance(2023); // TODO: trocar 2023
      setIncomes(balanceCredits);
    });

    fetchBalanceData();
  },[])

  const handleSelectCredit = async (id) => {
    const income = await getIncomeById(id);
    if(income != null){
      setCreditPopup(true);
      setSelectedIncome(income);
    }
  }

  const handleFilter = async (filter) => {
    const balanceExpenses = await getIncomesByBalance(2023, filter.groupId, filter.name); // TODO: trocar 2023
    setIncomes(balanceExpenses);
  }

  const navigate = useNavigate(); 
  
  const handleCreateNewExpense = () => {
    navigate(`/criacao-credito`);
  }

  return (
    <div className="mainMargin">
      
      <div className="creditTitleAdd">
        <h1>Créditos registrados</h1>
        <button onClick={handleCreateNewExpense} className="creditAddButton"><img src={addIcon} alt="Ícone de adição"/>Adicionar</button>
      </div>

      <DisplayFilter handleFilter={handleFilter}/>

      <table className="creditsTable">
        <tr className="titleLineCredit">
          <th className="titleGrupoCredit">Grupo</th>
          <th className="titleNomeCredit">Nome</th>
          <th className="titleValorCredit">Valor</th>
          <th className="titleDetalhesCredit"></th>
        </tr>

        <TableLine handleSelectItem={handleSelectCredit} list={incomes} LineCells={LineCells}/>

        {creditPopup && <IncomePopup income={selectedIncome} setIncome={setSelectedIncome} setPopup={setCreditPopup}/>}
      </table>
    </div>
  );
};

export default IncomesDisplay;