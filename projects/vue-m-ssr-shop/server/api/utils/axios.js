import axios from '@nuxtjs/axios'

const Axios = axios.create({
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT ||
    3000}`,
  timeout: 20000,
  headers: {}
})

export default Axios
