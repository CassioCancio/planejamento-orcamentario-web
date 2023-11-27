import "./TableLine.css";
import LineCells from "./LineCells";

const TableLine = ({ handleSelectExpense, expenses }) => {
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