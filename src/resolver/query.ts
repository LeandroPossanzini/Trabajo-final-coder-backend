import { IResolvers } from "@graphql-tools/utils";


const resolversQuery: IResolvers = {
    Query:{
        users(root, args, context, info){
            console.log(root)
            console.log(args)
            console.log(context)
            console.log(info)
            return [
                {
                    id: 1,
                    name: "leandro",
                    lastname: "possan",
                    email: "",
                    password: "",
                    registerDate: "",
                    birthday: ""

                }
            ];
        }
    }
};

export default resolversQuery;