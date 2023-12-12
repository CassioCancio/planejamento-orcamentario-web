import "./Management.css";
import editIcon from '../images/edit.png';
import deleteIcon from '../images/delete.png';
import { useEffect, useState } from "react";


const Management = () => {
  return (
    <div className="mainMargin">

        <h1>Ano Fiscal</h1>
        <h2>Ano selecionado</h2>
        <select>
          <option></option>
        </select>


        <input/>
        <button>Criar novo</button>


        <table className="tableManagement">
          <tr>
            <th className="titleAlignManage">Ano</th>
            <th className="widthButtonManage">Editar</th>
            <th className="widthButtonManage">Apagar</th>
          </tr>
          <tr>
            <td>2023</td>
            <td className="imageAlignManage"><img src={editIcon}/></td>
            <td className="imageAlignManage"><img src={deleteIcon}/></td>
          </tr>
        </table>







        <h1>Grupos</h1>
        <input/>
        <button>Criar novo</button>
        <table className="tableManagement">
          <tr>
            <th className="titleAlignManage">Número</th>
            <th className="titleAlignManage">Nome</th>
            <th className="widthButtonManage">Editar</th>
            <th className="widthButtonManage">Apagar</th>
          </tr>
          <tr>
            <td>0000</td>
            <td>Nome</td>
            <td className="imageAlignManage"><img src={editIcon}/></td>
            <td className="imageAlignManage"><img src={deleteIcon}/></td>
          </tr>
        </table>





        <h1>Categorias</h1>
        <input/>
        <button>Criar novo</button>

        <table className="tableManagement">
          <tr>
            <th className="titleAlignManage">Nome</th>
            <th className="widthButtonManage">Editar</th>
            <th className="widthButtonManage">Apagar</th>
          </tr>
          <tr>
            <td>Nome</td>
            <td className="imageAlignManage"><img src={editIcon}/></td>
            <td className="imageAlignManage"><img src={deleteIcon}/></td>
          </tr>
        </table>

    </div>
  );
};

export default Management;