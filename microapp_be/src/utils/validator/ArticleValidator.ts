import * as joi from "joi"

export const createArticleSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    date: joi.string(),
    author: joi.string().required(),
    image: joi.string(),
});