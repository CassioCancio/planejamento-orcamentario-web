import "./CreditPopup.css";
import closeIcon from "../../images/close.png";

import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryService";
import { getAllGroups } from "../../services/groupService";
import { updateCredit } from "../../services/creditService";
import { NumericFormat } from "react-number-format";

const CreditPopup = ({ credit, setCredit, setPopup }) => {
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);

    useEffect(() => {
    const fetchSelectsData = (async () => {
    const categories = await getAllCategories();
    setCategoryOptions(categories);

    const groups = await getAllGroups();
    setGroupOptions(groups);
    });
    fetchSelectsData();
    },[])


    const handleSelectId = ({name, value}) => {
        setCredit({
            ...credit, 
            [name]: parseInt(value)
        });
    }

    const handleObjectInput = ({name, value}) => {
    setCredit({
        ...credit, 
        [name]:value
    });
    }

    const handleMonetaryInput = ({name, value}) => {
    setCredit({
        ...credit,
        [name]: parseFloat(value.replace('R$', '').trim())
    })
    }

    const handleClosePopup = () => {
      setPopup(false);
      setCredit({});
    }

    const saveCredit = async () => {
      const updated = await updateCredit(credit);
      if(updated){
        setPopup(false);
        setCredit({});
      } 
    }

return (
    <div className="backShadow">
        <div className="popupCredit">
            <button className="closeIcon" onClick={handleClosePopup}>
                <img src={closeIcon} alt={"close icon"}/>
            </button>

        <div className="popupForm">
          <div className="labelPopupInput">
            <label className="">Nome</label>
            <input
              className="inputSelectPopUp"
              type="text"
              value={credit.name}
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
              <label className="">Categoria do crédito</label>
              <select className="inputSelectPopUp" onChange={(e) => handleSelectId({name: 'categoryId', value: e.target.value })}>
                  <option key={0} value="default">—</option>
                  {categoryOptions.map(category => {
                      return (
                          <option key={category.key} value={category.id}>
                          {category.name}
                          </option>
                      )
                  })}
              </select>
            </div>
          </div>

          <div className="displayTwo">
            <div className="labelPopupInput">
              <label className="">Solicitante</label>
              <input
                className="inputSelectPopUp"
                value={credit.requester}
                onChange={(e) =>
                  handleObjectInput({
                    name: "requester",
                    value: e.target.value,
                  })
                }
                placeholder=""
              />
            </div>
            <div className="labelPopupInput">
              <label className="">Ano Fiscal</label>
              <input
                value={credit.balanceId}
                placeholder="2023"
                disabled
                className="lockedInput inputSelectPopUp"
              />
            </div>
          </div>

          <div className="displayTwo">
            <div className="labelPopupInput">
              <label className="">Previsão de pagamento</label>
              <input
                className="inputSelectPopUp"
                value={credit.expectedPaymentDate}
                onChange={(e) =>
                  handleObjectInput({
                    name: "expectedPaymentDate",
                    value: e.target.value,
                  })
                }
                type="date"
              />
            </div>
            <div className="labelPopupInput">
              <label className="">Valor solicitado</label>
              <NumericFormat
                className="inputSelectPopUp"
                value={credit.requestedValue}
                onChange={(e) =>
                  handleMonetaryInput({
                    name: "requestedValue",
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
              value={credit.observation}
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
            <button className="saveButton" onClick={saveCredit}> Salvar </button>
          </div>
        </div>
      </div>
    </div>
);
}; 
export default CreditPopup;
