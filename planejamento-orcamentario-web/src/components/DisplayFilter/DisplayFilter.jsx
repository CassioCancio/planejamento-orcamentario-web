import './DisplayFilter.css';

import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoryService";
import { getAllGroups } from "../../services/groupService";

const DisplayFilter = ({handleFilter}) => {
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [groupOptions, setGroupOptions] = useState([]);
    const [filter, setFilter] = useState({categoryId: null, groupId: null, name: ''});

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
    setFilter({
        ...filter, 
        [name]: value !== '—' ? parseInt(value) : null
    });
    }

    const handleObjectFilterInput = ({name, value}) => {
    setFilter({
        ...filter, 
        [name]:value
    });
    }
    
    return (
        <div className="expenseDisplayFilter">
            <div className="labelFilter displayFilterField1">
            <label>Nome</label>
            <input
                type="text"
                value={filter.name}
                onChange={(e) => handleObjectFilterInput({ name:'name', value: e.target.value })} 
            />
            </div>
            <div className="labelFilter displayFilterField2">
            <label>Grupo</label>
            <select id="selectGroup" onChange={(e) => handleSelectId({name: 'groupId', value: e.target.value })}>
                <option key={0} value={null}>—</option>
                {groupOptions.map(group => {
                return (
                    <option key={group.number} value={group.id}>
                    {group.number + ` - ` + group.name}
                    </option>
                )
                })}
            </select>
            </div>
            <div className="labelFilter displayFilterField3">
            <label>Categoria</label>
            <select onChange={(e) => handleSelectId({name: 'categoryId', value: e.target.value })}>
                <option key={0} value={null}>—</option>
                {categoryOptions.map(category => {
                    return (
                        <option key={category.id} value={category.id}>
                        {category.name}
                        </option>
                    )
                })}
            </select>
            </div>
            <div className="labelFilter displayFilterField4">
                <button onClick={() => handleFilter(filter)}>Buscar</button>
            </div>
        </div>
    )
}

export default DisplayFilter;