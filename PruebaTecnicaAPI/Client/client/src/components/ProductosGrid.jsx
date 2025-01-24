import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm, message, Space } from 'antd';
import useProductoStore from '../Store/productoStore';

const { Option } = Select;

const ProductGrid = () => {
  const {
    productos,
    categorias,
    loading,
    fetchProductos,
    fetchCategorias,
    addProducto,
    updateProducto,
    deleteProducto,
  } = useProductoStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, [fetchProductos, fetchCategorias]);

  const openModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingProduct) {
        await updateProducto(editingProduct.id, values);
        message.success('Producto actualizado correctamente.');
      } else {
        await addProducto(values);
        message.success('Producto agregado correctamente.');
      }
      await fetchProductos();
      closeModal();
    } catch (error) {
      message.error('Error al guardar el producto.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProducto(id);
      message.success('Producto eliminado correctamente.');
    } catch (error) {
      message.error('Error al eliminar el producto.');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'idProducto' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion' },
    { title: 'Categoría', dataIndex: 'categoriaNombre', key: 'categoriaNombre' },
    { title: 'Estado', dataIndex: 'estadoNombre', key: 'estadoNombre' },
    { title: 'Usuario', dataIndex: 'usuario', key: 'usuario' },
    { title: 'Fecha Creación', dataIndex: 'fechaCreacion', key: 'fechaCreacion' },
    { title: 'Modificado Por', dataIndex: 'usuarioModificado', key: 'usuarioModificado' },
    { title: 'Fecha Modificación', dataIndex: 'fechaModificacion', key: 'fechaModificacion' },
    {
      title: 'Acciones',
      key: 'acciones',
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
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Gestión de Productos</h1>
      <Button type="primary" style={{ marginBottom: '20px' }} onClick={() => openModal()}>
        Agregar Producto
      </Button>
      <Table columns={columns} dataSource={productos} loading={loading} rowKey="id" bordered />
      <Modal
        title={editingProduct ? 'Editar Producto' : 'Agregar Producto'}
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
            rules={[{ required: true, message: 'El nombre es requerido' }]}
          >
            <Input placeholder="Ingresa el nombre del producto" />
          </Form.Item>
          <Form.Item
            name="descripcion"
            label="Descripción"
            rules={[{ required: true, message: 'La descripción es requerida' }]}
          >
            <Input placeholder="Ingresa una descripción" />
          </Form.Item>
          <Form.Item
            name="categoria"
            label="Categoría"
            rules={[{ required: true, message: 'La categoría es requerida' }]}
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
