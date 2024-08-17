import axios from 'axios'

export const baseUrl = import.meta.env.APP_API_URL || 'http://localhost:4000'

export const api = axios.create({ baseURL: baseUrl })
