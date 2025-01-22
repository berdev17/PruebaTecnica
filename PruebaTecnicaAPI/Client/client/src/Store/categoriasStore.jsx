import { create } from 'zustand';
import { getAllCategorias, AddNewCategoria, UpdateCategoria, deleteCategoria } from "../Services/categoriaService";
import { message } from "antd";

const useCategoriasStore = create((set) => ({
  categorias: [],
  loading: false,

  fetchCategorias: async () => {
    set({ loading: true });
    try {
      const categoriasData = await getAllCategorias();
      set({ categorias: categoriasData });
    } catch (err) {
      message.error("Error al cargar las categorías.");
    } finally {
      set({ loading: false });
    }
  },

  addCategoria: async (categoria) => {
    try {
      const newCategoria = await AddNewCategoria(categoria);
      set((state) => ({ categorias: [...state.categorias, newCategoria] }));
      message.success("Categoría agregada correctamente.");
    } catch {
      message.error("Error al agregar la categoría.");
    }
  },

  updateCategoria: async (id, categoria) => {
    try {
      await UpdateCategoria(id, categoria);
      set((state) => ({
        categorias: state.categorias.map((c) => (c.id === id ? { ...c, ...categoria } : c)),
      }));
      message.success("Categoría actualizada correctamente.");
    } catch {
      message.error("Error al actualizar la categoría.");
    }
  },

  deleteCategoria: async (id) => {
    try {
      await deleteCategoria(id);
      set((state) => ({
        categorias: state.categorias.filter((c) => c.id !== id),
      }));
      message.success("Categoría eliminada correctamente.");
    } catch {
      message.error("Error al eliminar la categoría.");
    }
  },
}));

export default useCategoriasStore;
