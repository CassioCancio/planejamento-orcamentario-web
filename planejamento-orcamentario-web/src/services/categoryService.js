export const getAllCategories = async () => {
    let categories = [];
    try {
        const response = await fetch('http://localhost:8080/category/getAll'); // TODO: trocar a url da api para uma variavel global
        categories = await response.json();
    } catch (error) {
        console.error('Erro:'+ error);
    } finally {
        return categories;
    }
}