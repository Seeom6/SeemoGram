import axios from 'axios'


const registerUrl = "/api/users"
const logInUrl = "/api/users/auth"
const getProfileUrl =" /api/users/profile"
const getPostsUrl = "/api/post"
const followingUsers ='/api/users/follow'
const likeUnLikeUrl = "/api/post/likes"


export const registration = async(user)=>{
        const res = await axios.post(registerUrl ,user)

        if(res.data){
            localStorage.setItem("user" , JSON.stringify(res.data))
        }
        return res.data
}

export const LoggingIn = async(user)=>{
        const res = await axios.post(logInUrl ,user)
        if(res.data){
            localStorage.setItem("user" , JSON.stringify(res.data.data))
        }
        return res.data.data
}

export const getUserProfile = async(id)=>{
    try {
        const userId = id.toString()
        const res = await axios.get(`${getProfileUrl}/${userId}`)
        return res.data.user
    } catch (error) {
        console.log(error)
    }
}


export const getAllPosts = async()=>{
        try {
            const res = await axios.get(getPostsUrl)
            return res.data.data
        } catch (error) {
            return error
        }
    }

    
export const createPosts = async(formData)=>{
    try {
        const res = await axios.post(getPostsUrl , formData)
        return res.data
    } catch (error) {
        return error
    }
}

export const getUserPosts = async(id)=>{
    try {
        const res = await axios.get(`${getPostsUrl}/${id}`)
        return res.data.data
    } catch (error) {
        return error
    }
}

export const followAndUnFollow = async(id)=>{
    try {
        const res = await axios.post(`${followingUsers}/${id}`)
        return res.data

    } catch (error) {
        return error
    }
}

export const likeUnLike = async(id)=>{
    try {
        const res = await axios.put(`${likeUnLikeUrl}/${id}`)
        return res.data

    } catch (error) {
        return error
    }
}