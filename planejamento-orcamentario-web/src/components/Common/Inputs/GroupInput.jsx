import "./Inputs.css";

const GroupInput = ({label, handleSelectId, groupOptions}) => {
    return(
        <div className="labelInput">
          <label>{label}</label>
          <select id="selectGroup" onChange={(e) => handleSelectId({name: 'groupId', value: e.target.value })}>
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
    )
}

export default GroupInput;