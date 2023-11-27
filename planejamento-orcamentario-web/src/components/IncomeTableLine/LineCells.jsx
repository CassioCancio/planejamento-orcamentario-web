import "./TableLine.css";
const LineCells = ({ income, handleOnClick }) => {
    return(
        <>
            <td className="contentCellExpense">{income.group.id} - {income.group.name}</td>
            <td className="contentCellExpense">{income.name}</td>
            <td className="contentCellExpense">{income.categoryName}</td>
            <td className="contentCellExpense"><div className="contentValorCell"><div>R$</div><div>{income.paidValue}</div></div></td>
            <td className="contentCellExpense"><button onClick={() => handleOnClick(income.id)}>i</button></td>
        </>
    )
}

export default LineCells;