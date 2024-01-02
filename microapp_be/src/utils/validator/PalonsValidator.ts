import * as joi from "joi"

export const createPaslonSchema = joi.object({
    name: joi.string().required(),
    nomorUrut: joi.string(),
    visiMisi: joi.string(),
    koalisi: joi.string().required(),
    image: joi.string(),
});