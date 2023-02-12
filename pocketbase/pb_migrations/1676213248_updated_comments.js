migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l1jk33e122c6w06")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qa3nmjxn",
    "name": "author",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c6ep0aha",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l1jk33e122c6w06")

  // remove
  collection.schema.removeField("qa3nmjxn")

  // remove
  collection.schema.removeField("c6ep0aha")

  return dao.saveCollection(collection)
})
