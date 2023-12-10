export const getAllGroupsBalance = async (balanceYear) => {
    let groupsBalance = [];
    try {
        const response = await fetch(`http://localhost:8080/balance/${balanceYear}/getAllGroups`);
        if(response.ok){
            groupsBalance = await response.json();
        } else {
            window.alert("Não foi possível consultar o balanço por grupo de " + balanceYear);
            throw new Error("Erro ao consultar balanço dos grupos")
        }
    } catch (error) {
        console.error('Erro:'+ error);
    } finally {
        return groupsBalance;
    }
}

export const getGeneralBalance = async (balanceYear) => {
    let generalBalance = {};
    try {
        const response = await fetch(`http://localhost:8080/balance/${balanceYear}`);
        if(response.ok){
            generalBalance = await response.json();
        } else {
            window.alert("Não foi possível consultar o balanço de " + balanceYear);
            throw new Error("Erro ao consultar balanço geral")
        }
    } catch (error) {
        console.error('Erro:'+ error);
    } finally {
        return generalBalance;
    }
}