import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, message, Space } from "antd";
import { getAllCategorias, AddNewCategoria, UpdateCategoria, deleteCategoria } from "../Services/categoriaService";

const CategoriasGrid = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriasData = await getAllCategorias();
        setCategorias(categoriasData);
      } catch (err) {
        message.error("Error al cargar las categorías.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Abrir modal para agregar o editar
  const openModal = (categoria = null) => {
    setEditingCategoria(categoria);
    setIsModalOpen(true);
    if (categoria) {
      form.setFieldsValue(categoria);
    } else {
      form.resetFields();
    }
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategoria(null);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Datos enviados:", values); // Verifica los datos
  
      if (editingCategoria) {
        await UpdateCategoria(editingCategoria.id, values);
        setCategorias((prev) =>
          prev.map((c) => (c.id === editingCategoria.id ? { ...c, ...values } : c))
        );
        message.success("Categoría actualizada correctamente.");
      } else {
        const newCategoria = await AddNewCategoria({ ...values, creadoPor: 1 });
        setCategorias((prev) => [...prev, newCategoria]);
        message.success("Categoría agregada correctamente.");
      }
      closeModal();
    } catch (error) {
      console.error("Error al guardar:", error); // Más información sobre el error
      message.error("Error al guardar la categoría.");
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await deleteCategoria(id);
      setCategorias((prev) => prev.filter((c) => c.id !== id));
      message.success("Categoría eliminada correctamente.");
    } catch (error) {
      message.error("Error al eliminar la categoría.");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
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
            title="¿Estás seguro de eliminar esta categoría?"
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
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Gestión de Categorías</h1>
      <Button type="primary" style={{ marginBottom: "20px" }} onClick={() => openModal()}>
        Agregar Categoría
      </Button>
      <Table
        columns={columns}
        dataSource={categorias}
        loading={loading}
        rowKey="id"
        bordered
      />
      <Modal
        title={editingCategoria ? "Editar Categoría" : "Agregar Categoría"}
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
            <Input placeholder="Ingresa el nombre de la categoría" />
          </Form.Item>
          <Form.Item
            name="descripcion"
            label="Descripción"
            rules={[{ required: true, message: "La descripción es requerida" }]}
          >
            <Input placeholder="Ingresa una descripción" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriasGrid;
