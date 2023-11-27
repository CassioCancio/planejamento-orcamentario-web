export const createNewCredit = async (credit) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credit)
        };
        const response = await fetch('http://localhost:8080/income', requestOptions); // TODO: variavel global
        if(response.ok){
            window.location.href = '/';
        } else{
            throw new Error("Falha ao criar crédito");
        }
    } catch (error) {
        console.error(error);
    }
}

export const getCreditsByBalance = async (anoFiscal, groupId = null, filter = '') => {
    let credits = [];
    try{
        const response = await fetch(`http://localhost:8080/income/byBalance/${anoFiscal}?name=${filter}` + (groupId ? `&group=${groupId}`:''));
        if(response.ok){
            credits = await response.json();
        } else {
            throw new Error("Erro ao buscar despensas do ano fiscal" + anoFiscal)
        }
    } catch (error) {
        console.error(error);
    } finally {
        return credits;
    }
}

export const getCreditById = async (id) => {
    let credit = null;
    try{
        const response = await fetch('http://localhost:8080/income/'+ id)
        if(response.ok){
            credit = await response.json();
        } else {
            throw new Error("Erro ao busca crédito com id " + id)
        }
    } catch (error) {
        console.error(error);
    } finally {
        return credit;
    }
}

export const updateCredit = async (credit) => {
    try{
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(credit)
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