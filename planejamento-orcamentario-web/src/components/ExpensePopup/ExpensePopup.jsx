import "./ExpensePopup.css";
import closeIcon from "../../images/close.png";

import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryService";
import { getAllGroups } from "../../services/groupService";
import { updateExpense } from "../../services/expenseService";
import { NumericFormat } from "react-number-format";

const ExpensePopup = ({ expense, setExpense, setPopup, setUpdatePage, updatePage }) => {
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
        setExpense({
            ...expense, 
            [name]: parseInt(value)
        });
    }

    const handleObjectInput = ({name, value}) => {
    setExpense({
        ...expense, 
        [name]:value
    });
    }

    const handleMonetaryInput = ({name, value}) => {
      const formattedValue = value.replace(/\./g, '').replace(",", ".");
      setExpense({
          ...expense,
          [name]: parseFloat(formattedValue.replace('R$ ', '').trim())
      })
    }

    const handleClosePopup = () => {
      setPopup(false);
      setExpense({});
    }

    const saveExpense = async () => {
      expense.expectedPaymentDate = (new Date(expense.expectedPaymentDate)).toISOString();
      const updated = await updateExpense(expense);
      if(updated){
        setUpdatePage(updatePage+1);
        setPopup(false);
        setExpense({});
      } 
    }

return (
    <div className="backShadow" onClick={(event) => {if (event.target === event.currentTarget) {handleClosePopup()}}}>
        <div className="popupExpense">
            <button className="closeIcon" onClick={handleClosePopup}>
                <img src={closeIcon} alt={"close icon"}/>
            </button>

        <div className="popupForm">
          <div className="labelPopupInput">
            <label className="">Nome da Despesa</label>
            <input
              className="inputSelectPopUp"
              type="text"
              value={expense.name}
              onChange={(e) =>
                handleObjectInput({ name: "name", value: e.target.value })
              }
              placeholder="Edital de pesquisa"
            />
          </div>

          <div className="displayTwo">
          <div className="labelPopupInput">
            <label className="">Grupo da Despesa</label>
            <select className="inputSelectPopUp" value={expense.group.id} id="selectGroup" onChange={(e) => handleSelectId({name: 'groupId', value: e.target.value })}>
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
              <label className="">Categoria da despesa</label>
              <select className="inputSelectPopUp" value={expense.category.id} onChange={(e) => handleSelectId({name: 'categoryId', value: e.target.value })}>
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
                value={expense.requester}
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
                value={expense.balance.year}
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
                value={expense.expectedPaymentDate}
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
                value={expense.requestedValue}
                onChange={(e) =>
                  handleMonetaryInput({
                    name: "requestedValue",
                    value: e.target.value,
                  })
                }
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={"R$ "}
              />
            </div>
          </div>

          <div className="displayTwo">
            <div className="labelPopupInput">
            <label className="">Valor Provisionado</label>
                <NumericFormat
                  className="inputSelectPopUp"
                  value={expense.provisionedValue}
                  onChange={(e) =>
                    handleMonetaryInput({
                      name: "provisionedValue",
                      value: e.target.value,
                    })
                  }
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={"R$ "}
                />
              </div>

              <div className="labelPopupInput">
            <label className="">Valor Pago</label>
                <NumericFormat
                  className="inputSelectPopUp"
                  value={expense.paidValue}
                  onChange={(e) =>
                    handleMonetaryInput({
                      name: "paidValue",
                      value: e.target.value,
                    })
                  }
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={"R$ "}
                />
              </div>
          </div>

          <div className="labelPopupInput">
            <label className="">Observação</label>
            <textarea
              className="textareaPopUp"
              value={expense.observation}
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
            <button className="saveButton" onClick={saveExpense}> Salvar </button>
          </div>
        </div>
      </div>
    </div>
);
}; //TODO: Estilizar botão de salvar (Cassio)

export default ExpensePopup;
