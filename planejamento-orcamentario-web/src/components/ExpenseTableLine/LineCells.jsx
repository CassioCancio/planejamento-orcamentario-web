import "./TableLine.css";
const LineCells = ({ expense, handleOnClick }) => {
    return(
        <>
            <td className="contentCellExpense">{expense.group.id} - {expense.group.name}</td>
            <td className="contentCellExpense">{expense.name}</td>
            <td className="contentCellExpense">{expense.categoryName}</td>
            <td className="contentCellExpense"><div className="contentValueCell"><div>R$</div><div>{expense.requestedValue}</div></div></td>
            <td className="contentCellExpense"><div className="contentValueCell"><div>R$</div><div>{expense.paidValue}</div></div></td>
            <td className="contentCellExpense"><button onClick={() => handleOnClick(expense.id)}>i</button></td>
        </>
    )

}

export default LineCells;