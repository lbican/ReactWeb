migrate((db) => {
  const collection = new Collection({
    "id": "e24b8re2llhp5r9",
    "created": "2023-02-11 15:43:09.813Z",
    "updated": "2023-02-11 15:43:09.813Z",
    "name": "likes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sn7i5h8s",
        "name": "user",
        "type": "relation",
        "required": false,
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
        "id": "mf0ennwg",
        "name": "post",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "tk3s8hm031qd400",
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
  const collection = dao.findCollectionByNameOrId("e24b8re2llhp5r9");

  return dao.deleteCollection(collection);
})
