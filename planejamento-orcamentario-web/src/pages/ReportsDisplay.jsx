import { useEffect, useState } from "react";
import "./ReportsDisplay.css";
import { getAllGroupsBalance, getGeneralBalance } from "../services/balanceService";
import TableLine from "../components/DisplayTable/Table";
import ExpenseLineCells from "../components/DisplayTable/ExpenseLineCells";
import CreditLineCells from "../components/DisplayTable/CreditLineCells";
import ReportGraph from "../components/ReportGraph/ReportGraph"

const ReportsDisplay = () => {
  const [groupsBalance, setGroupsBalance] = useState([]);
  const [generalBalance, serGeneralBalance] = useState({
    "year": 2023,
    "totalCredits": 0,
    "totalProvisionated": 0,
    "totalPaid": 0
  });
  useEffect(()=>{
      const fetchDisplayData = (async () => {
        const balancesByGroup = await getAllGroupsBalance(2023); // TODO: trocar 2023
        setGroupsBalance(balancesByGroup);
        const generalBalanceResponse = await getGeneralBalance(2023);
        serGeneralBalance(generalBalanceResponse);
      });
      fetchDisplayData();
  },[])

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mainMargin">
      <div id="pdf-content">

      <h1>Geral</h1>
        <div className="graphTextReport">
          <div className="graphReport"><ReportGraph data={[generalBalance.totalCredits, generalBalance.totalProvisionated, generalBalance.totalPaid, generalBalance.totalCredits - generalBalance.totalProvisionated]}/></div>
          <div className="textReport">
            <p><span className="stylePreValue">Ano:</span> {generalBalance.year}</p>
            <p><span className="stylePreValue">Total de créditos:</span> R${generalBalance.totalCredits}</p>
            <p><span className="stylePreValue">Total provisionado:</span> R${generalBalance.totalProvisionated}</p>
            <p><span className="stylePreValue">Total pago:</span> R${generalBalance.totalPaid}</p>
            <p><span className="stylePreValue">Saldo:</span> R${generalBalance.totalCredits - generalBalance.totalProvisionated}</p>
          </div>
      </div>
      <h1>Por Grupo</h1>
      {groupsBalance.map(group =>{
        return (
          <div className="groupReport">
            <h2> {group.number} - {group.name}</h2>
            <div className="graphTextReport">
              <div className="graphReport"><ReportGraph data={[group.totalCredits, group.totalProvisionated, group.totalPaid, group.totalCredits - group.totalProvisionated]}/></div>
              <div className="textReport">
                <p><span className="stylePreValue">Nome:</span> {group.name}</p>
                <p><span className="stylePreValue">Total de créditos:</span> R${group.totalCredits}</p>
                <p><span className="stylePreValue">Total provisionado:</span> R${group.totalProvisionated}</p>
                <p><span className="stylePreValue">Total pago:</span> R${group.totalPaid}</p>
                <p><span className="stylePreValue">Saldo:</span> R${group.totalCredits - group.totalProvisionated}</p>
              </div>
            </div>

            <h3>Depesas</h3>

            <table className="expensesTable">
              <tr className="titleLineExpense">
                <th className="titleGrupoExpense">Grupo</th>
                <th className="titleNomeExpense">Nome</th>
                <th className="titleCategoriaExpense">Categoria</th>
                <th className="titleValueExpense">Valor Solicitado</th>
                <th className="titleValueExpense">Valor Pago</th>
                <th className="titleDetailsExpense"></th>
              </tr>

            <TableLine
                    handleSelectItem={()=>{}}
                    list={group.expenses}
                    LineCells={ExpenseLineCells}
                    deleteButton={false}
                  />
            </table>

            <h3>Créditos</h3>
            
            <table className="creditsTable">
              <tr className="titleLineCredit">
                <th className="titleGrupoCredit">Grupo</th>
                <th className="titleNomeCredit">Nome</th>
                <th className="titleValorCredit">Valor</th>
                <th className="titleDetailsCredit"></th>
              </tr>
              
              <TableLine 
                    handleSelectItem={()=>{}}
                    list={group.incomes}
                    LineCells={CreditLineCells}
                    deleteButton={false}
                  />
            </table>


          </div>
        )
      })}
      </div>
      <button className="no-print" onClick={handlePrint}>Imprimir como PDF</button>
    </div>
  );
};

export default ReportsDisplay;
