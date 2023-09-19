export const createNewExpense = async (expense) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expense)
        };
        const response = await fetch('http://localhost:8080/expense', requestOptions); // TODO: variavel global
        const createdExpense = await response.json();
        return createdExpense;
    } catch (error) {
        console.error('Erro:'+ error);
    }
}