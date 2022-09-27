// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ShoppingList } = initSchema(schema);

export {
  ShoppingList
};