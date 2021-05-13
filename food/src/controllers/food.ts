import { Request, Response } from "express";
import { Types } from "mongoose";
import { BadRequestError } from "@sam9th/common-modules"; // common set of modules written by me to use thorughout micro-services
import { getValueForNextSequence } from "../utils/common-methods";
import { Ingredient, IngredientAttrs } from "../models/ingredient";
import { CONFS } from "../configs";

export async function getIngredients(req: Request, res: Response) {
  try {
    const ingredients = await Ingredient.find({}).sort({ order: 1 });

    return res.status(CONFS.RESPONSE_CODE.SUCCESS).send({
      message: CONFS.RESPONSE_MSG.DATA_FOUND,
      data: ingredients,
      success: true,
      code: CONFS.RESPONSE_CODE.SUCCESS,
    });
  } catch (ex) {
    throw new BadRequestError(ex.message);
  }
}

export async function insertIngredient(req: Request, res: Response) {
  try {
    const { name } = req.body;

    const ingredient = await Ingredient.build({
      order: await getValueForNextSequence("item_id"),
      name,
    }).save();

    return res.status(CONFS.RESPONSE_CODE.SUCCESS).send({
      message: CONFS.RESPONSE_MSG.INSERT_SUCCESS,
      data: ingredient,
      success: true,
      code: CONFS.RESPONSE_CODE.SUCCESS,
    });
  } catch (ex) {
    throw new BadRequestError(ex.message);
  }
}

export async function updateIngredients(req: Request, res: Response) {
  try {
    const { ingredients } = req.body;

    const promises = ingredients.map(
      async (item: IngredientAttrs, index: number) => {
        const promise = Ingredient.updateOne(
          { _id: Types.ObjectId(item._id) },
          { $set: { order: index + 1 } }
        );
        return promise;
      }
    );

    const results = await Promise.all(promises);

    return res.status(CONFS.RESPONSE_CODE.SUCCESS).send({
      message: CONFS.RESPONSE_MSG.UPDATE_SUCCESS,
      data: results,
      success: true,
      code: CONFS.RESPONSE_CODE.SUCCESS,
    });
  } catch (ex) {
    throw new BadRequestError(ex.message);
  }
}
