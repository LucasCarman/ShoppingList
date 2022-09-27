export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "ShoppingList": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "storage": {
        "s3shoppingliststorage": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "api": {
        "ShoppingList": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    }
}