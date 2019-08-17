import axios from 'axios'

let client = ''
const devURL = 'http://localhost:3001'
const prodURL = 'http://api.x.com'
const baseURL = process.env.NODE_ENV === 'development' ? devURL : prodURL

export default class Api {
  constructor () {
    client = axios.create({
      baseURL: baseURL
    })
  }

  getAuthHeader () {
    const token = localStorage.getItem('token')
    return {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  }

  // Stand Rout
  get (endpoint) {
    return client.get(endpoint, this.getAuthHeader())
  }

  remove (endpoint) {
    return client.delete(endpoint, this.getAuthHeader())
  }

  create (endpoint, data) {
    return client.post(endpoint, data, this.getAuthHeader())
  }

  update (endpoint, data) {
    return client.patch(endpoint, data, this.getAuthHeader())
  }

  loginDb (endpoint, user) {
    return client.post(endpoint, user)
  }

  // Callers

  getUser (id) {
    return this.get(`/users/${id}`)
  }

  getUsers () {
    return this.get(`/users`)
  }

  removeUser (id) {
    return this.remove(`/users/${id}`)
  }

  updateUser (data) {
    return this.update(`/users/${data.id}`, data)
  }

  createUser (data) {
    return this.create(`/users`, data)
  }

  removeRun (id) {
    return this.remove(`/runs/${id}`)
  }

  getRuns (admin) {
    return this.get(`/runs/${admin}`)
  }

  createRun (data) {
    return this.create(`/runs`, data)
  }

  login (user) {
    return this.loginDb(`/users/login`, user)
  }
}

// const Api = base => {
//   const client = axios.create({
//     baseURL: base
//   })

//   const getAuthHeader = () => {
//     const token = localStorage.getItem('token')
//     return {
//       headers: {
//         Authorization: 'Bearer ' + token
//       }
//     }
//   }

//   const get = endpoint => client.get(endpoint, getAuthHeader())
//   const remove = endpoint => client.delete(endpoint, getAuthHeader())
//   const create = (endpoint, data) => client.post(endpoint, data, getAuthHeader())
//   const update = (endpoint, data) => client.patch(endpoint, data, getAuthHeader())
//   const login = (endpoint, user) => client.post(endpoint, user)

//   /*
//   const token = localStorage.getItem('token')
//   const get = endpoint => client.get(endpoint, {
//     headers:{
//       Authorization: 'Bearer '+ token
//     }
//   })
//   const remove = endpoint => client.delete(endpoint, {
//     headers:{
//       Authorization: 'Bearer '+ token
//     }
//   })
//   const create = (endpoint, data) => client.post(endpoint, data, {
//     headers:{
//       Authorization: 'Bearer '+ token
//     }
//   })
//   const update = (endpoint, data) => client.patch(endpoint, data, {
//     headers:{
//       Authorization: 'Bearer '+ token
//     }
//   })
//   const login = (endpoint, user) => client.post(endpoint, user)
//   */

//   return {
//     getUser: id => get(`/users/${id}`),
//     getUsers: () => get(`/users`),
//     removeUser: id => remove(`/users/${id}`),
//     updateUser: data => update(`/users/${data.id}`, data),
//     createUser: data => create(`/users`, data),

//     removeRun: id => remove(`/runs/${id}`),
//     getRuns: admin => get(`/runs/${admin}`),
//     createRun: data => create(`/runs`, data),

//     login: user => login(`/users/login`, user)

//   }
// }

// export default Api
