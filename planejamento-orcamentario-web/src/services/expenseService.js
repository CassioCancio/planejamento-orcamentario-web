export const createNewExpense = async (expense) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expense)
        };
        const response = await fetch('http://localhost:8080/expense', requestOptions); // TODO: variavel global
        if(response.ok){
            window.location.href = '/despesas';
        } else{
            throw new Error("Falha ao criar despesa");
        }
    } catch (error) {
        console.error(error);
    }
}

export const getExpensesByBalance = async (anoFiscal, groupId = null, categoryId = null, filter = '') => {
    let expenses = [];
    try{
        const response = await fetch(`http://localhost:8080/expense/byBalance/${anoFiscal}?name=${filter}` + (groupId ? `&group=${groupId}`:'') + (categoryId ? `&category=${categoryId}`:''));
        if(response.ok){
            expenses = await response.json();
        } else {
            throw new Error("Erro ao buscar despensas do ano fiscal" + anoFiscal)
        }
    } catch (error) {
        console.error(error);
    } finally {
        return expenses;
    }
}

export const getExpenseById = async (id) => {
    let expense = null;
    try{
        const response = await fetch('http://localhost:8080/expense/'+ id)
        if(response.ok){
            expense = await response.json();
        } else {
            throw new Error("Erro ao busca despesa com id " + id)
        }
    } catch (error) {
        console.error(error);
    } finally {
        return expense;
    }
}

export const updateExpense = async (expense) => {
    try{
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(expense)
        };
        const response = await fetch("http://localhost:8080/expense", requestOptions);
        if(response.ok){
            return true;
        } else {
            throw new Error("Falha ao editar despesa");
        } 
    } catch (error) {
        console.error(error);
        return false;    
    }
}

export const deleteExpense = async (expenseId) => {
    let removed = false;
    try {
        const requestOptions = {
            "method": "delete",
            "headers": {"Content-Type": "application/json"},
            "body": ""
        }
        const response = await fetch("http://localhost:8080/expense/" + expenseId, requestOptions);
        if(response.ok){
            removed = true;
        } else {
            throw new Error("Failed to remove expense with id " + expenseId);
        }
    } catch (error) {
        console.error("Error: " + error);
    } finally {
        return removed;
    }
}