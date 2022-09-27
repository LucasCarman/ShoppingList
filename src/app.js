import { Amplify, API, graphqlOperation } from "aws-amplify";

import awsconfig from "./aws-exports"
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";


Amplify.configure(awsconfig);

async function createNewShoppingList() {
  const shoppingList = {
    itemName: document.getElementById("itemName").value,
    itemQuantity: document.getElementById("itemQuantity").value,
  };

  return await API.graphql(graphqlOperation(mutations.createShoppingList, { input: shoppingList }));
}

async function DeleteShoppingList() {
    return await API.graphql(graphqlOperation(mutations.deleteShoppingList))
}

async function getData() {
      API.graphql(graphqlOperation(queries.listShoppingLists)).then((evt) => {
        evt.data.listShoppingLists.items.map((shoppingList, i) => {
         QueryResult.innerHTML += `<p>${shoppingList.itemName} - ${shoppingList.itemQuantity}</p>`;
        });
      });
    }

const MutationButton = document.getElementById("MutationEventButton");
const QueryButton = document.getElementById("QueryEventButton");
const DeleteButton = document.getElementById("DeleteEventButton");


MutationButton.addEventListener("click", (evt) => {
    createNewShoppingList().then((evt) => {
        QueryResult.innerHTML += `<p>${evt.data.createShoppingList.itemName} - ${evt.data.createShoppingList.itemQuantity}</p>`;
  });
});


QueryButton.addEventListener("click", getData());

DeleteButton.addEventListener("click", DeleteShoppingList());
