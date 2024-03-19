import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Category() {
  const [categories, setCategories] = useState()

  const getCategories = async () => {
    try {
      const response = await axios.get(
        'https://api.escuelajs.co/api/v1/categories'
      )
      setCategories(
        response.data.map((item: any) => ({
          value: item?.id,
          name: item?.name,
        }))
      )
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <select name="categoryId">
        {categories?.map((item: any) => (
          <option value={item?.value}>{item?.name}</option>
        ))}
      </select>
    </>
  )
}
