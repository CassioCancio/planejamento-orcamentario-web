import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import './ExpenseCreate.css';

function Expense() {

  return (
    <div>
        <NavBar/>

        <h1>Insira os dados da nova despesa</h1>


        <form className="createExpenseForm">
          <div className="labelInput">
            <label>Título</label><input placeholder="Edital para ..."></input>
          </div>

          <div className="display">
            <div className="labelInput">
              <label>Grupo da despesa</label>
              <select id="selectGroup">
                <option value="">Selecione uma opção</option>
              </select>

            </div>
            <div className="labelInput">
              <label>Categoria de despesa</label>
              <select>
                <option value="">Selecione uma opção</option>
              </select>
            </div>
          </div>
          
          <div className="labelInput">
            <label>Balanço</label><input placeholder="Edital para ..."></input>
          </div>
          <div className="labelInput">
            <label>Descrição</label><input placeholder="Edital para ..."></input>
          </div>
          <div className="labelInput">
            <label>Data de criação</label><input placeholder="Edital para ..."></input>
          </div>
          <div className="labelInput">
            <label>Data de pagamento</label><input placeholder="Edital para ..."></input>
          </div>
          <div className="labelInput">
            <label>Valor inicial</label>
            <input type="number" step="0.01" name="quantity" min="0.01"></input>
          </div>
          <button className="submitButton">Inserir despesa</button>
        </form>

    </div>
  );



}

export default Expense;
