import api from "../Api";
const GET_ALL_PRODUCTOS = '/api/Productos/GetAllProductos';
const ADD_NEW_PRODUCTO = '/api/Productos/AddNewProducto';

export const getAllProductos = async () => {
  try {
    const response = await api.get(GET_ALL_PRODUCTOS); 
    return response.data;
  } catch (error) {
    console.error("Error fetching productos:", error);
    throw error;
  }
};

export const AddNewProducto = async (producto) => {
  try{
    const response = await api.post(ADD_NEW_PRODUCTO, producto);
    return response.data;
  }catch(error){
    console.error("No se pudo guardar correctamente", error)
    throw error;
  }
} 

export const updateProducto = async (id, producto) => {
  try {
    const response = await api.put(`/api/Productos/UpdateProducto${id}`, producto);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};

export const deleteProducto = async(id,producto) =>{
  try{
    const response = await api.put(`/api/Productos/DeleteProducto${id}`,producto);
    return response.data;
  } catch(error){
    console.error("Error al eliminar el producto: ",error);
    throw error;
  }
}


