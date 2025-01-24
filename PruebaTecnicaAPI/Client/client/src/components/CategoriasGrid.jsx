import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, Space, message, } from "antd";
import useCategoriasStore from "../Store/categoriasStore";

const CategoriasGrid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);

  const { categorias, loading, fetchCategorias, addCategoria, updateCategoria, deleteCategoria } = useCategoriasStore();

  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  const openModal = (categoria = null) => {
    setEditingCategoria(categoria);
    setIsModalOpen(true);
    if (categoria) {
      form.setFieldsValue(categoria);
    } else {
      form.resetFields();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategoria(null);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategoria) {
        await updateCategoria(editingCategoria.id, values);
      } else {
        await addCategoria({ ...values, creadoPor: 1 });
      }
      await fetchCategorias();
      closeModal();
    } catch (error) {
      message.error('Error al guardar la categoria.');

    }
  };

  const handleDelete = async (id) => {
    await deleteCategoria(id);
  };

  const columns = [
    { title: "#", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    { title: "Estado", dataIndex: "estadoNombre", key: "estadoNombre" },
    { title: "Usuario", dataIndex: "usuario", key: "usuario" },
    { title: "Fecha Creación", dataIndex: "fechaCreacion", key: "fechaCreacion" },
    { title: "Modificado Por", dataIndex: "usuarioModificado", key: "usuarioModificado" },
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
