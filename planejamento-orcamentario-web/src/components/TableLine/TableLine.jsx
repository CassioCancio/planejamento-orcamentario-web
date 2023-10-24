import { useEffect, useState } from "react";
import "./TableLine.css";
import { getExpensesByBalance } from "../../services/expenseService";
import LineCells from "./LineCells";

const TableLine = ({ handleSelectExpense }) => {
    const [expenses, setExpenses] = useState([]);
    useEffect(()=>{
        const fetchExpenses = async () => {
            const balanceExpenses = await getExpensesByBalance(2023); // TODO: trocar 2023
            setExpenses(balanceExpenses);
        };
        fetchExpenses();
    }, [])
    return (
        <>
            {expenses.map((expense, index) => {
                if(index % 2 === 0) {
                    return(
                        <tr className="contentWhiteLineExpense">
                            <LineCells expense={expense} handleOnClick={handleSelectExpense}/>
                        </tr>
                    )
                } else {
                    return(
                        <tr className="contentGrayLineExpense">
                            <LineCells expense={expense} handleOnClick={handleSelectExpense}/>
                        </tr>
                    )
                }
            })}
        </>
    )
}

export default TableLine;