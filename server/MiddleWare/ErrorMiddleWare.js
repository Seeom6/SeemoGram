import apiError from "../utils/apiError.js";

const notFound = (req, res , next)=>{
    next( new apiError("Can't find this path : ${req.originalUrl}" , 404))
}

const globalError = (err , req , res , next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    if(process.env.NODE_ENV === "development"){
         ErrorForDevMod(err , res)
    }else{
        ErrorForProMod(err , res)
    }
}
// #################### Error for development mode ############################ 
const ErrorForDevMod = (err ,res)=>{
    res.status(err.statusCode).json({
        status: err.status,
        error : err,
        message : err.message,
        stack : err.stack,
    })
}

// #################### Error for production mode ############################ 
const ErrorForProMod = (err ,res)=>{
    res.status(err.statusCode).json({
        status: err.status,
        message : err.message,
    })
}

export {notFound, globalError}