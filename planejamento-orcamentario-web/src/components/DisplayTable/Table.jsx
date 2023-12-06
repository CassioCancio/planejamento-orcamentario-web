import "./Table.css";

const TableLine = ({ handleSelectItem, list, LineCells }) => {
    return (
        <>
            {list.map((item, index) => {
                if(index % 2 === 0) {
                    return(
                        <tr className="contentWhiteLine">
                            <LineCells item={item} handleOnClick={handleSelectItem}/>
                        </tr>
                    )
                } else {
                    return(
                        <tr className="contentGrayLine">
                            <LineCells item={item} handleOnClick={handleSelectItem}/>
                        </tr>
                    )
                }
            })}
        </>
    )
}

export default TableLine;