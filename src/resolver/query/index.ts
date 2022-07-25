const GMR = require('@wiicamp/graphql-merge-resolvers');
import resolversProductsQuery from "./products";
import resolversUserQuery from "./user";


const queryResolvers = GMR.merge([
    resolversUserQuery,
    resolversProductsQuery,
])

export default queryResolvers;