import jwt from 'jsonwebtoken'

const generateToken = (res , userId)=>{
    const token = jwt.sign({userId} , process.env.JWT_SECRET ,{})
    res.cookie('jwt' , token )
}

export default generateToken;