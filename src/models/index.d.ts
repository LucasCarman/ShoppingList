import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type ShoppingListMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class ShoppingList {
  readonly id: string;
  readonly itemName?: string | null;
  readonly itemQuantity?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ShoppingList, ShoppingListMetaData>);
  static copyOf(source: ShoppingList, mutator: (draft: MutableModel<ShoppingList, ShoppingListMetaData>) => MutableModel<ShoppingList, ShoppingListMetaData> | void): ShoppingList;
}