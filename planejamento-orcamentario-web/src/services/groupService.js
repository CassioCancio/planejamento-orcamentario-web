export const getAllGroups = async () => {
    let groups = [];
    try {
        const response = await fetch('http://localhost:8080/group'); // TODO: variavel global
        groups = await response.json();
    } catch (error) {
        console.error('Erro:'+ error);
    } finally {
        return groups;
    }
}