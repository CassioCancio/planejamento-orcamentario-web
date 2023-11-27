import "./Table.css";
const LineCells = ({ item, handleOnClick }) => {
    return(
        <>
            <td className="contentCellExpense">{item.group.id} - {item.group.name}</td>
            <td className="contentCellExpense">{item.name}</td>
            <td className="contentCellExpense">{item.categoryName}</td>
            <td className="contentCellExpense"><div className="contentValorCell"><div>R$</div><div>{item.value}</div></div></td>
            <td className="contentCellExpense"><button onClick={() => handleOnClick(item.id)}>i</button></td>
        </>
    )

}

export default LineCells;