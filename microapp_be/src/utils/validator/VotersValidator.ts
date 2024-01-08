import * as joi from "joi"

export const createVotersSchema = joi.object({
    paslonId: joi.number().required()
});