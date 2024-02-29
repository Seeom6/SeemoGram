import {validationResult} from "express-validator"

import apiError from "../utils/apiError.js";

const validator = (req , res ,next)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = errors.array()
        return next(new apiError(error[0].msg , 400))
    }
    next()
}

export default validator