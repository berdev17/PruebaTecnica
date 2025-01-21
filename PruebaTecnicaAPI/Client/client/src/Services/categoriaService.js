import api from "../Api";
const GET_ALL_CATEGORIA = '/api/Categorias/GetAllCategorias';
const ADD_NEW_CATEGORIA = '/api/Categorias/AddNewCategoria';

export const getAllCategorias = async () => {
  try {
    const response = await api.get(GET_ALL_CATEGORIA); 
    return response.data;
  } catch (error) {
    console.error("Error fetching Categorias:", error);
    throw error;
  }
};

export const AddNewCategoria = async (categoria) => {
  try{
    const response = await api.post(ADD_NEW_CATEGORIA, categoria);
    return response.data;
  }catch(error){
    console.error("No se pudo guardar correctamente", error)
    throw error;
  }
} 

export const UpdateCategoria = async (id, categoria) => {
  try {
    const response = await api.put(`/api/Categorias/UpdateCategoria${id}`, categoria);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};

export const deleteCategoria = async(id) =>{
  try{
    const response = await api.put(`/api/Categorias/DeleteCategoria${id}`);
    return response.data;
  } catch(error){
    console.error("Error al eliminar la categoria: ",error);
    throw error;
  }
}


