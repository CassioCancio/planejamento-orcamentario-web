import "./Table.css";

const TableLine = ({ handleSelectItem, list, LineCells, handleDeleteItem, deleteButton = true }) => {
    return (
        <>
            {list.map((item, index) => {
                if(index % 2 === 0) {
                    return(
                        <tr className="contentWhiteLine">
                            <LineCells item={item} handleEdit={handleSelectItem} handleDelete={handleDeleteItem} enableDeleteButton= {deleteButton}/>
                        </tr>
                    )
                } else {
                    return(
                        <tr className="contentGrayLine">
                            <LineCells item={item} handleEdit={handleSelectItem} handleDelete={handleDeleteItem} enableDeleteButton= {deleteButton}/>
                        </tr>
                    )
                }
            })}
        </>
    )
}

export default TableLine;