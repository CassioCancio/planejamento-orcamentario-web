import { useEffect, useState } from "react";
import "./TableLine.css";
import { getIncomesByBalance } from "../../services/incomeService";
import LineCells from "./LineCells";

const TableLine = ({ handleSelectIncome }) => {
    const [incomes, setIncomes] = useState([]);
    useEffect(()=>{
        const fetchIncomes = async () => {
            const balanceIncomes = await getIncomesByBalance(2023); // TODO: trocar 2023
            setIncomes(balanceIncomes);
        };
        fetchIncomes();
    }, [])
    return (
        <>
            {incomes.map((income, index) => {
                if(index % 2 === 0) {
                    return(
                        <tr className="contentWhiteLineExpense">
                            <LineCells income={income} handleOnClick={handleSelectIncome}/>
                        </tr>
                    )
                } else {
                    return(
                        <tr className="contentGrayLineExpense">
                            <LineCells income={income} handleOnClick={handleSelectIncome}/>
                        </tr>
                    )
                }
            })}
        </>
    )
}

export default TableLine;