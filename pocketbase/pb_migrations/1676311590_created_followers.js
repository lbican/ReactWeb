migrate((db) => {
  const collection = new Collection({
    "id": "gl0pg5itdu2c09v",
    "created": "2023-02-13 18:06:30.310Z",
    "updated": "2023-02-13 18:06:30.310Z",
    "name": "followers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gpcylp9d",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "wwzqtbwj",
        "name": "follows",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("gl0pg5itdu2c09v");

  return dao.deleteCollection(collection);
})
