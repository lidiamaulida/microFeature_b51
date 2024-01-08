import * as joi from "joi"

export const createPartaiSchema = joi.object({
    name: joi.string().required(),
    ketuaUmum: joi.string().required(),
    visiMisi: joi.string().required(),
    alamat: joi.string().required(),
    paslonId : joi.number().positive().min(1).required(),
    image: joi.string(),
});