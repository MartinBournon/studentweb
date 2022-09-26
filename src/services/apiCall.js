import axios from "axios";


export const saveStudent = async (student) =>{
    return await axios.post("http://localhost:8000/students", student);
}

export const fillTableStudent = async () => {
    return await axios.get("http://localhost:8000/students");
}