migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tk3s8hm031qd400")

  // remove
  collection.schema.removeField("zeatchpa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rm0r2pjk",
    "name": "author_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tk3s8hm031qd400")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("rm0r2pjk")

  return dao.saveCollection(collection)
})
