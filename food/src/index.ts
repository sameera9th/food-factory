import { app } from "./app";
import Database from "./configs/database";
import { Ingredient } from './models/ingredient';
import { Counter } from './models/auto-inc-counter';
import { getValueForNextSequence } from './utils/common-methods';

const start = async () => {
  new Database().connection();
  app.listen(3001, () => {
    console.log(`Food ingredient service is listening on port 3001!`);
  });
};


// inserting a record to counter collection, so it can be auto populate while ordering the images 
const insertInitalFoodIngredients = async () => {
    try {
        const ingredients = await Ingredient.find({});
        if(ingredients && ingredients.length === 0){

            await Counter.build({ _id: 'item_id', sequence_value: 1 }).save();

            for (let index = 0; index < 10; index++) {
                await Ingredient.build({ order: await getValueForNextSequence('item_id'), name: 'Ingredient '+(index + 1) }).save();
            }

        } 
    } catch (error) {
        console.error(error);
    }
};

start(); // establishing the database connection and express app
insertInitalFoodIngredients();
