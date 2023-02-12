migrate((db) => {
  const collection = new Collection({
    "id": "l1jk33e122c6w06",
    "created": "2023-02-12 14:46:45.489Z",
    "updated": "2023-02-12 14:46:45.489Z",
    "name": "comments",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gqm4asdc",
        "name": "comment",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("l1jk33e122c6w06");

  return dao.deleteCollection(collection);
})
