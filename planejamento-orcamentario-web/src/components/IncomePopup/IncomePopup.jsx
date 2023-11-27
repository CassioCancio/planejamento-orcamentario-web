import "./IncomePopup.css";
import closeIcon from "../../images/close.png";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryService";
import { getAllGroups } from "../../services/groupService";
import { updateIncome } from "../../services/incomeService";
import { NumericFormat } from "react-number-format";

const IncomePopup = ({ income, setIncome, setPopup }) => {
    const [groupOptions, setGroupOptions] = useState([]);

    useEffect(() => {
    const fetchSelectsData = (async () => {
      const groups = await getAllGroups();
      setGroupOptions(groups);
    });
    fetchSelectsData();
    },[])


    const handleSelectId = ({name, value}) => {
        setIncome({
            ...income, 
            [name]: parseInt(value)
        });
    }

    const handleObjectInput = ({name, value}) => {
    setIncome({
        ...income, 
        [name]:value
    });
    }

    const handleMonetaryInput = ({name, value}) => {
    setIncome({
        ...income,
        [name]: parseFloat(value.replace('R$', '').trim())
    })
    }

    const handleClosePopup = () => {
      setPopup(false);
      setIncome({});
    }

    const saveIncome = async () => {
      const updated = await updateIncome(income);
      if(updated){
        setPopup(false);
        setIncome({});
      } 
    }

return (
    <div className="backShadow" onClick={(event) => {if (event.target === event.currentTarget) {handleClosePopup()}}}>
        <div className="popupIncome">
            <button className="closeIcon" onClick={handleClosePopup}>
                <img src={closeIcon} alt={"close icon"}/>
            </button>

        <div className="popupForm">
          <div className="labelPopupInput">
            <label className="">Nome</label>
            <input
              className="inputSelectPopUp"
              type="text"
              value={income.name}
              onChange={(e) =>
                handleObjectInput({ name: "name", value: e.target.value })
              }
              placeholder="Edital de pesquisa"
            />
          </div>

          <div className="displayTwo">
          <div className="labelPopupInput">
            <label className="">Grupo do crédito</label>
            <select className="inputSelectPopUp" id="selectGroup" onChange={(e) => handleSelectId({name: 'groupId', value: e.target.value })}>
              <option value="default">—</option>
              {groupOptions.map(group => {
                return (
                  <option key={group.key} value={group.id}>
                    {group.number + ` - ` + group.name}
                  </option>
                )
              })}
            </select>
            </div>

            <div className="labelPopupInput">
              <label className="">Ano Fiscal</label>
              <input
                value={income.balance.year}
                placeholder="2023"
                disabled
                className="lockedInput inputSelectPopUp"
              />
            </div>
          </div>

          <div className="displayTwo">
            <div className="labelPopupInput">
              <label className="">Data Criação</label>
              <input
                className="inputSelectPopUp"
                value={income.creationDate}
                disabled={true}
                onChange={(e) =>
                  handleObjectInput({
                    name: "creationDate",
                    value: e.target.value,
                  })
                }
                type="date"
              />
            </div>
          <div className="labelPopupInput">
              <label className="">Valor</label>
              <NumericFormat
                className="inputSelectPopUp"
                value={income.value}
                onChange={(e) =>
                  handleMonetaryInput({
                    name: "value",
                    value: e.target.value,
                  })
                }
                thousandSeparator={true}
                prefix={"R$ "}
              />
            </div>
          </div>

          <div className="labelPopupInput">
            <label className="">Observação</label>
            <textarea
              className="textareaPopUp"
              value={income.observation}
              onChange={(e) =>
                handleObjectInput({
                  name: "observation",
                  value: e.target.value,
                })
              }
              placeholder="Edital para ..."
            />
          </div>
          <div className="centerSubmitButton">
            <button className="saveButton" onClick={saveIncome}> Salvar </button>
          </div>
        </div>
      </div>
    </div>
);
}; 
export default IncomePopup;
