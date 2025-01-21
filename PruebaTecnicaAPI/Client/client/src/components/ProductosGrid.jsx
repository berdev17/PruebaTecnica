import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Popconfirm, message, Space } from "antd";
import { getAllProductos, AddNewProducto,updateProducto, deleteProducto } from "../Services/productosService"
import { getAllCategorias } from "../Services/categoriaService";

const { Option } = Select;

const ProductGrid = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form] = Form.useForm();

  // Cargar productos y categorías al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosData = await getAllProductos();
        const categoriasData = await getAllCategorias();
        setProductos(productosData);
        setCategorias(categoriasData);
      } catch (err) {
        message.error("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Abrir modal para agregar o editar
  const openModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // Guardar cambios (Agregar o Editar)
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingProduct) {
        // Actualizar producto existente
        await updateProducto(editingProduct.id, values);
        setProductos((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? { ...p, ...values } : p))
        );
        message.success("Producto actualizado correctamente.");
      } else {
        // Agregar nuevo producto
        const newProduct = await AddNewProducto({ ...values, creadoPor: 1 }); // Simula el usuario creado
        setProductos((prev) => [...prev, newProduct]);
        message.success("Producto agregado correctamente.");
      }
      closeModal();
    } catch (error) {
      message.error("Error al guardar el producto.");
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    try {
      await deleteProducto(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
      message.success("Producto eliminado correctamente.");
    } catch (error) {
      message.error("Error al eliminar el producto.");
    }
  };

  // Columnas de la tabla
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    { title: "Categoría", dataIndex: "categoriaNombre", key: "categoriaNombre" },
    { title: "Estado", dataIndex: "estadoNombre", key: "estadoNombre" },
    { title: "Usuario", dataIndex: "usuario", key: "usuario" },
    { title: "Fecha Creación", dataIndex: "fechaCreacion", key: "fechaCreacion" },
    { title: "Modificado Por", dataIndex: "modificadoPor", key: "modificadoPor" },
    { title: "Fecha Modificación", dataIndex: "fechaModificacion", key: "fechaModificacion" },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>
            Editar
          </Button>
          <Popconfirm
            title="¿Estás seguro de eliminar este producto?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sí"
            cancelText="No"
          >
            <Button type="link" danger>
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Gestión de Productos</h1>
      <Button type="primary" style={{ marginBottom: "20px" }} onClick={() => openModal()}>
        Agregar Producto
      </Button>
      <Table
        columns={columns}
        dataSource={productos}
        loading={loading}
        rowKey="id"
        bordered
      />
      <Modal
        title={editingProduct ? "Editar Producto" : "Agregar Producto"}
        visible={isModalOpen}
        onOk={handleSave}
        onCancel={closeModal}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[{ required: true, message: "El nombre es requerido" }]}
          >
            <Input placeholder="Ingresa el nombre del producto" />
          </Form.Item>
          <Form.Item
            name="descripcion"
            label="Descripción"
            rules={[{ required: true, message: "La descripción es requerida" }]}
          >
            <Input placeholder="Ingresa una descripción" />
          </Form.Item>
          <Form.Item
            name="categoria"
            label="Categoría"
            rules={[{ required: true, message: "La categoría es requerida" }]}
          >
            <Select placeholder="Selecciona una categoría">
              {categorias.map((categoria) => (
                <Option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductGrid;
