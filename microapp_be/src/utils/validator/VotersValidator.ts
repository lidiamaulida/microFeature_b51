import * as joi from "joi"

export const createVotersSchema = joi.object({
    name: joi.string().required(),
    alamat: joi.string().required(),
    jenisKelamin: joi.string(),
    paslon: joi.string().required(),
});