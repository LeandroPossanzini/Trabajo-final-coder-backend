import 'graphql-import-node';
import typeDefs from "./schema.graphql";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";


const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs
});

export default schema;