import "./IncomesDisplay.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableLine from "../components/DisplayTable/Table";
import IncomePopup from "../components/IncomePopup/IncomePopup";
import LineCells from "../components/DisplayTable/CreditLineCells";
import DisplayFilter from "../components/DisplayFilter/DisplayFilter";
import { deleteIncome, getIncomeById, getIncomesByBalance } from "../services/incomeService";
import addIcon from "../images/plus.png"

const IncomesDisplay = () => {
  const [creditPopup, setCreditPopup] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState({}); // criar objeto default
  const [incomes, setIncomes] = useState([]);
  const [updatePage, setUpdatePage] = useState(0);

  useEffect(() => {
    const fetchBalanceData = (async () => {
      const balanceCredits = await getIncomesByBalance(2023); // TODO: trocar 2023
      setIncomes(balanceCredits);
    });

    fetchBalanceData();
  },[updatePage])

  const handleSelectCredit = async (id) => {
    const income = await getIncomeById(id);
    if(income != null){
      let formattedCreationDate = new Date(income.creationDate);
      income.creationDate = formattedCreationDate.toISOString().split('T')[0];
      setCreditPopup(true);
      setSelectedIncome(income);
    }
  }

  const handleDeleteItem = async (id) => {
    const deleted = await deleteIncome(id);
    if(deleted){
      setUpdatePage(updatePage+1);
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
          <th className="titleDetailsCredit"></th>
          <th className="titleDeleteCredit"></th>
        </tr>

        <TableLine handleSelectItem={handleSelectCredit} list={incomes} LineCells={LineCells} handleDeleteItem={handleDeleteItem}/>

        {creditPopup && <IncomePopup setUpdatePage={setUpdatePage} updatePage={updatePage} income={selectedIncome} setIncome={setSelectedIncome} setPopup={setCreditPopup}/>}
      </table>
    </div>
  );
};

export default IncomesDisplay;