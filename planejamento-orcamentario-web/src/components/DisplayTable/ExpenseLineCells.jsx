import "./Table.css";
import editIcon from '../../images/edit.png';
import deleteIcon from '../../images/delete.png';

const ExpenseLineCells = ({ item, handleEdit, handleDelete, enableDeleteButton }) => {
    return(
        <>
            <td className="contentCellExpense">{item.group.number} - {item.group.name}</td>
            <td className="contentCellExpense">{item.name}</td>
            <td className="contentCellExpense">{item.category.name}</td>
            <td className="contentCellExpense"><div className="contentValueCell"><div>R$</div><div>{item.requestedValue}</div></div></td>
            <td className="contentCellExpense"><div className="contentValueCell"><div>R$</div><div>{item.paidValue}</div></div></td>
            <td className="contentCellExpense"><img src={editIcon} alt="i" onClick={() => handleEdit(item.id)}/></td>
            {enableDeleteButton ? <td className="contentCellExpense"><img src={deleteIcon} alt="delete" onClick={() => handleDelete(item.id)}/></td> : null}
        </>
    )

}

export default ExpenseLineCells;