export const getAllCategories = async () => {
    let categories = [];
    try {
        const response = await fetch('http://localhost:8080/category'); // TODO: trocar a url da api para uma variavel global
        categories = await response.json();
    } catch (error) {
        window.alert("Falha ao consultar categorias disponíveis");
        console.error('Erro:'+ error);
    } finally {
        return categories;
    }
}