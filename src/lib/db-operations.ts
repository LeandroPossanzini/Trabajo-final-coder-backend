import { Db } from "mongodb";

// Obtener el id que vamos a utilizar en el nuevo usuario
export const asigDocumentId = async (
  database: Db,
  collection: string,
  sort: object = { registerDate: -1 }
) => {
  const lastElement = await database
    .collection(collection)
    .find()
    .limit(1)
    .sort(sort)
    .toArray();

  if (lastElement.length === 0) {
    return 1;
  }
  return lastElement[0].id + 1;
};

export const findOneElment = async (
    database: Db,
    collection: string,
    filter: object
) => {
  return database
  .collection(collection)
  .findOne(filter);
}

export const inserOneElement = async (
    database: Db,
    collection: string,
    document: object
) =>{
  return await database.collection(collection).insertOne(document);
}

export const inserManyElements = async (
  database: Db,
  collection: string,
  documents: Array<object>
) =>{
return await database.collection(collection).insertMany(documents);
}

export const findElements = async (
    database: Db,
    collection: string,
    filter: object = {}
) =>{
  return await database.collection(collection).find(filter).toArray()
};