import { IResolvers } from "@graphql-tools/utils";

const resolversProductsQuery: IResolvers = {
  Query: {
    products (){
      return false
    }
  },
};

export default resolversProductsQuery;