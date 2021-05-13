import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Ingredient
export interface IngredientAttrs {
  _id?: string;
  order: number;
  name: string;
}

// An interface that describes the properties
// that a Ingredient Model has
interface IngredientModel extends mongoose.Model<IngredientDoc> {
  build(attrs: IngredientAttrs): IngredientDoc;
}

// An interface that describes the properties
// that a Ingredient Document has
interface IngredientDoc extends mongoose.Document {
    order: number;
    name: string;
}

const ingredientSchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      }
    }
  }
);

ingredientSchema.statics.build = (attrs: IngredientAttrs) => {
  return new Ingredient(attrs);
};

const Ingredient = mongoose.model<IngredientDoc, IngredientModel>('ingredient', ingredientSchema);

export { Ingredient };
