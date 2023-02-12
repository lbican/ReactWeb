migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e24b8re2llhp5r9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mf0ennwg",
    "name": "post",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "tk3s8hm031qd400",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e24b8re2llhp5r9")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
