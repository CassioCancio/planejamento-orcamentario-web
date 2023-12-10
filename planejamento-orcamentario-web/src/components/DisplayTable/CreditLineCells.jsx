import "./Table.css";
const CreditLineCells = ({ item, handleOnClick }) => {
    return(
        <>
            <td className="contentCellExpense">{item.group.number} - {item.group.name}</td>
            <td className="contentCellExpense">{item.name}</td>
            <td className="contentCellExpense"><div className="contentValueCell"><div>R$</div><div>{item.value}</div></div></td>
            <td className="contentCellExpense"><button onClick={() => handleOnClick(item.id)}>i</button></td>
        </>
    )

}

export default CreditLineCells;