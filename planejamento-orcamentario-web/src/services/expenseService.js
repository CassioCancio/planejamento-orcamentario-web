export const createNewExpense = async (expense) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expense)
        };
        const response = await fetch('http://localhost:8080/expense', requestOptions); // TODO: variavel global
        if(response.ok){
            window.location.href = '/';
        } else{
            throw new Error("Falha ao criar despesa");
        }
    } catch (error) {
        console.error(error);
    }
}