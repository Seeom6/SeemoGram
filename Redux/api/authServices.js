import axios from "axios"



const registerUrl = "http://localhost:8000/seemo-gram/api/users"
const loginUrl = "http://localhost:8000/seemo-gram/api/users/auth"
const getProfileUrl = "http://localhost:8000/seemo-gram/api/users/profile"
const PostsUrl = "http://localhost:8000/seemo-gram/api/post"



const register = async(userDate)=>{
    const res = await axios.post(registerUrl , userDate)
    if(res.data){
        localStorage.setItem("user" , JSON.stringify(res.data))
    }
    return res.data
}


const loginUser = async(userDate)=>{
    const res = await axios.post(loginUrl , userDate)
    if(res.data){
        localStorage.setItem("user" , JSON.stringify(res.data))
    }
    return res.data
}

const getProfile = async(userDate)=>{
    const res = await axios.get(getProfileUrl)
    if(res.data){
        localStorage.setItem("user" , JSON.stringify(res.data.user))
    }
    return res.data.user
}

const createPosts = async(formData)=>{
    try {
        const res = await axios.post(PostsUrl , formData)
        return res.data
    } catch (error) {
        return error
    }
}

const getPosts = async()=>{
    try {
        const res = await axios.get(PostsUrl)
        return res.data.data
    } catch (error) {
        return error
    }
}

const getUserPosts = async(id)=>{
    try {
        const res = await axios.get(`${PostsUrl}/${id}`)
        return res.data.data
    } catch (error) {
        return error
    }
}

export const authService= {
    register,
    loginUser,
    getProfile,
    getPosts,
    getUserPosts,
    createPosts
}