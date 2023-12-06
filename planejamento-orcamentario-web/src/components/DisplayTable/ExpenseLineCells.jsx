import "./Table.css";
const ExpenseLineCells = ({ item, handleOnClick }) => {
    return(
        <>
            <td className="contentCellExpense">{item.group.id} - {item.group.name}</td>
            <td className="contentCellExpense">{item.name}</td>
            <td className="contentCellExpense">{item.category.name}</td>
            <td className="contentCellExpense"><div className="contentValueCell"><div>R$</div><div>{item.requestedValue}</div></div></td>
            <td className="contentCellExpense"><div className="contentValueCell"><div>R$</div><div>{item.paidValue}</div></div></td>
            <td className="contentCellExpense"><button onClick={() => handleOnClick(item.id)}>i</button></td>
        </>
    )

}

export default ExpenseLineCells;