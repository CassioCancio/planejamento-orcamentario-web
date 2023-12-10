export const createNewIncome = async (income) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(income)
        };
        const response = await fetch('http://localhost:8080/income', requestOptions); // TODO: variavel global
        if(response.ok){
            window.location.href = '/creditos';
        } else{
            throw new Error("Falha ao criar crédito");
        }
    } catch (error) {
        console.error(error);
    }
}

export const getIncomesByBalance = async (anoFiscal, groupId = null, filter = '') => {
    let incomes = [];
    try{
        const response = await fetch(`http://localhost:8080/income/byBalance/${anoFiscal}?name=${filter}` + (groupId ? `&group=${groupId}`:''));
        if(response.ok){
            incomes = await response.json();
        } else {
            throw new Error("Erro ao buscar despensas do ano fiscal" + anoFiscal)
        }
    } catch (error) {
        console.error(error);
    } finally {
        return incomes;
    }
}

export const getIncomeById = async (id) => {
    let income = null;
    try{
        const response = await fetch('http://localhost:8080/income/'+ id)
        if(response.ok){
            income = await response.json();
        } else {
            throw new Error("Erro ao busca crédito com id " + id)
        }
    } catch (error) {
        console.error(error);
    } finally {
        return income;
    }
}

export const updateIncome = async (income) => {
    try{
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(income)
        };
        const response = await fetch("http://localhost:8080/income", requestOptions);
        if(response.ok){
            return true;
        } else {
            throw new Error("Falha ao editar crédito");
        } 
    } catch (error) {
        console.error(error);
        return false;    
    }
}

export const deleteIncome = async (incomeId) => {
    let removed = false;
    try {
        const requestOptions = {
            "method": "delete",
            "headers": {"Content-Type": "application/json"},
            "body": ""
        }
        const response = await fetch("http://localhost:8080/income/" + incomeId, requestOptions);
        if(response.ok){
            removed = true;
        } else {
            throw new Error("Failed to remove income with id " + incomeId);
        }
    } catch (error) {
        console.error("Error: " + error);
    } finally {
        return removed;
    }
}
