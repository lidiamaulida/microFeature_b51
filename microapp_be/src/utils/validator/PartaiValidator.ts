import * as joi from "joi"

export const createPartaiSchema = joi.object({
    name: joi.string().required(),
    ketuaUmum: joi.string().required(),
    visiMisi: joi.string().required(),
    alamat: joi.string().required(),
    image: joi.string(),
});