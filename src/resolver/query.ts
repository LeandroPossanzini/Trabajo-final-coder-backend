import { IResolvers } from "@graphql-tools/utils";
import { COLLECTIONS } from "../config/constantes";

const resolversQuery: IResolvers = {
  Query: {
    async users(_, __, { db }) {
      try {
        return await db.collection(COLLECTIONS.USERS).find().toArray();
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },
};

export default resolversQuery;
