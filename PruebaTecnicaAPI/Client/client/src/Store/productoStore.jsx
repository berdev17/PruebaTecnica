import { create } from 'zustand';
import { getAllProductos, AddNewProducto, updateProducto, deleteProducto } from '../Services/productosService';
import { getAllCategorias } from "../Services/categoriaService";

const ProductoStore = create((set) => ({
  productos: [],
  categorias: [],
  loading: false,

  // Fetch Productos y Categorías
  fetchProductos: async () => {
    set({ loading: true });
    try {
      const productosData = await getAllProductos();
      set({ productos: productosData });
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchCategorias: async () => {
    try {
      const categoriasData = await getAllCategorias();
      set({ categorias: categoriasData });
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  },

  // Add Producto
  addProducto: async (producto) => {
    try {
      const newProducto = await AddNewProducto({ ...producto, creadoPor: 1 });
      set((state) => ({ productos: [...state.productos, newProducto] }));
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  },

  // Update Producto
  updateProducto: async (id, updatedData) => {
    try {
      await updateProducto(id, updatedData);
      set((state) => ({
        productos: state.productos.map((p) =>
          p.id === id ? { ...p, ...updatedData } : p
        ),
      }));
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  },

  // Delete Producto
  deleteProducto: async (id) => {
    try {
      await deleteProducto(id);
      set((state) => ({
        productos: state.productos.filter((p) => p.id !== id),
      }));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  },
}));

export default ProductoStore;
