migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tk3s8hm031qd400")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iwg7zhtp",
    "name": "score",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tk3s8hm031qd400")

  // remove
  collection.schema.removeField("iwg7zhtp")

  return dao.saveCollection(collection)
})
