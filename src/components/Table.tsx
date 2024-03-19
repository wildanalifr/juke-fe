import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Table() {
  const [table, setTable] = useState([])

  const getTables = async () => {
    try {
      const response = await axios.get(
        'https://api.escuelajs.co/api/v1/products'
      )
      setTable(response.data)
      console.log('response', response?.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const deleteData = async (id: number) => {
    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`)
      alert('terhapus')
      getTables()
    } catch (error) {
      alert('error')
    }
  }

  const handleEdit = (data: any) => {
    localStorage.setItem('data', JSON.stringify(data))
  }

  useEffect(() => {
    getTables()
  }, [])

  return (
    <>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>NO</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Title</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>
              Category
            </th>
            <th style={{ border: '1px solid black', padding: '8px' }}>
              Images
            </th>
            <th style={{ border: '1px solid black', padding: '8px' }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {table?.map((item, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {index + 1}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {item.title}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {item.price}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {item.category?.name}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {item.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    style={{
                      marginRight: '5px',
                      width: '50px',
                      height: '50px',
                    }}
                  />
                ))}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    style={{
                      backgroundColor: '#4caf50',
                      border: 'none',
                      color: 'white',
                      padding: '8px 16px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontSize: '16px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      backgroundColor: '#f44336',
                      border: 'none',
                      color: 'white',
                      padding: '8px 16px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontSize: '16px',
                      cursor: 'pointer',
                    }}
                    onClick={() => deleteData(item?.id)}
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
