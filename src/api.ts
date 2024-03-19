import axios from 'axios'

export const getCategoriesGlobal = async () => {
  try {
    await axios.get('https://api.escuelajs.co/api/v1/categories')
  } catch (error) {
    console.log('error', error)
  }
}
