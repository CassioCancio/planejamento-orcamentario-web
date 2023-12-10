export const getAllGroups = async () => {
    let groups = [];
    try {
        const response = await fetch('http://localhost:8080/group'); // TODO: variavel global
        groups = await response.json();
    } catch (error) {
        window.alert("Falha ao consultar grupos disponíveis");
        console.error('Erro:'+ error);
    } finally {
        return groups;
    }
}