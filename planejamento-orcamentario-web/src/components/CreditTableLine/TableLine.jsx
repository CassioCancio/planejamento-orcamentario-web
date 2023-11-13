import { useEffect, useState } from "react";
import "./TableLine.css";
import { getCreditsByBalance } from "../../services/creditService";
import LineCells from "./LineCells";

const TableLine = ({ handleSelectCredit }) => {
    const [credits, setCredits] = useState([]);
    useEffect(()=>{
        const fetchCredits = async () => {
            const balanceCredits = await getCreditsByBalance(2023); // TODO: trocar 2023
            setCredits(balanceCredits);
        };
        fetchCredits();
    }, [])
    return (
        <>
            {credits.map((credit, index) => {
                if(index % 2 === 0) {
                    return(
                        <tr className="contentWhiteLineExpense">
                            <LineCells credit={credit} handleOnClick={handleSelectCredit}/>
                        </tr>
                    )
                } else {
                    return(
                        <tr className="contentGrayLineExpense">
                            <LineCells credit={credit} handleOnClick={handleSelectCredit}/>
                        </tr>
                    )
                }
            })}
        </>
    )
}

export default TableLine;