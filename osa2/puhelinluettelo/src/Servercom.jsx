import axios from "axios"

const baseUrl = 'http://localhost:3001/api/persons'

const Update = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const killPerson = (oldObject) => {
    console.log(oldObject.id)
    return axios.delete(baseUrl + '/' + oldObject.id)
}

const replacenumber = (oldObject, newnumber) => {
    return axios.put(baseUrl + '/' + oldObject.id, newnumber)
}
export default {Update, create, killPerson, replacenumber}
