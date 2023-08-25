import axios from "axios"
// const baseURL = "/api/phonebook"
const baseURL = "http://localhost:3001/api/phonebook"

const getAll = () => axios.get(baseURL).then(response => response.data)

const add = (person) => axios.post(baseURL, person).then(response => {
    // console.log("response.data", response.data)
    return response.data
})

const update = (id, person) => axios.put(`${baseURL}/${id}`, person).then(response => response.data)

const del = (id) => axios.delete(`${baseURL}/${id}`)

export default {getAll, add, update, del}