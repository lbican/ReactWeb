migrate((db) => {
  const collection = new Collection({
    "id": "tk3s8hm031qd400",
    "created": "2023-02-11 08:14:37.448Z",
    "updated": "2023-02-11 08:14:37.448Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "3qzhvsfe",
        "name": "content",
        "type": "editor",
        "required": true,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "zeatchpa",
        "name": "user_id",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
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
  const collection = dao.findCollectionByNameOrId("tk3s8hm031qd400");

  return dao.deleteCollection(collection);
})
