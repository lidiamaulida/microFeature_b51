import * as joi from "joi"

export const registerSchema = joi.object({
    fullname: joi.string().required(),
    address: joi.string().required(),
    gender: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required()
});

export const loginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
});

export const getOneUserValidation = joi.object({
    id: joi.number().min(1).positive().required(),
})