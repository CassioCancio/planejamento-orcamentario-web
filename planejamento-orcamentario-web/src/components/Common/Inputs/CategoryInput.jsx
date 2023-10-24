import "./Inputs.css";

const CategoryInput = ({label, handleSelectId, categoryOptions}) => {
    return(
        <div className="labelInput">
            <label>{label}</label>
            <select onChange={(e) => handleSelectId({name: 'categoryId', value: e.target.value })}>
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
    )
}

export default CategoryInput;