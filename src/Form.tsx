import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import Category from './components/Category'
import axios from 'axios'
import { getCategoriesGlobal } from './api'

function Form(): JSX.Element {
  const [form, setForm] = useState<{
    title: string | null
    price: number | null
    description: string | null
    categoryId: number | null
    images: string[]
  }>({
    title: '',
    price: 0,
    description: '',
    categoryId: 1,
    images: ['https://placeimg.com/640/480/any'],
  })

  const [isEdit, setIsEdit] = useState()
  const isEdits = localStorage.getItem('data')
  const editData = JSON.parse(isEdits!)

  useEffect(() => {
    if (isEdits) {
      setIsEdit(true)
    }
  }, [isEdits])

  useEffect(() => {
    if (isEdit) {
      console.log('edit', editData)
      form.title = editData?.title
      form.categoryId = editData?.category?.id
      form.description = editData?.description
      form.price = editData?.price
    }
  }, [isEdit])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    try {
      if (isEdit) {
        const response = await axios.put(
          `https://api.escuelajs.co/api/v1/products/${editData?.id}`,
          form
        )
        alert('berhasil Edit')
        setForm({
          title: '',
          price: 0,
          description: '',
          categoryId: 1,
          images: ['https://placeimg.com/640/480/any'],
        })
        localStorage.clear()
        getCategoriesGlobal()
      } else {
        const response = await axios.post(
          'https://api.escuelajs.co/api/v1/products/',
          form
        )
        alert('berhasil input')
        setForm({
          title: '',
          price: 0,
          description: '',
          categoryId: 1,
          images: ['https://placeimg.com/640/480/any'],
        })
      }
      getCategoriesGlobal()
    } catch (error) {
      alert('error')
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price.toString()}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="category">Category</label>
          <Category />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form
