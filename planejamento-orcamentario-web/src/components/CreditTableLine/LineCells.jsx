import "./TableLine.css";
const LineCells = ({ credit, handleOnClick }) => {
    return(
        <>
            <td className="contentCellExpense">{credit.group.id} - {credit.group.name}</td>
            <td className="contentCellExpense">{credit.name}</td>
            <td className="contentCellExpense">{credit.categoryName}</td>
            <td className="contentCellExpense"><div className="contentValorCell"><div>R$</div><div>{credit.paidValue}</div></div></td>
            <td className="contentCellExpense"><button onClick={() => handleOnClick(credit.id)}>i</button></td>
        </>
    )

}

export default LineCells;