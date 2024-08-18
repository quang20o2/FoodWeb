import axios from 'axios'

export const baseUrl = import.meta.env.APP_API_URL || 'https://foodweb-backend-qpua.onrender.com'

export const api = axios.create({ baseURL: baseUrl })
