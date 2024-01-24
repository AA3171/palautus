import axios from "axios"
const Update = () => {
    return axios.get('http://localhost:3001/persons')
}

const create = newObject => {
    return axios.post('http://localhost:3001/persons', newObject)
}

const killPerson = (oldObject) => {
    console.log(oldObject.id)
    return axios.delete('http://localhost:3001/persons/' + oldObject.id)
}

const replacenumber = (oldObject, newnumber) => {
    return axios.put('http://localhost:3001/persons/' + oldObject.id, newnumber)
}
export default {Update, create, killPerson, replacenumber}
