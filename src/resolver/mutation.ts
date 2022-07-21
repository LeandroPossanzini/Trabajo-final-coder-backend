import { IResolvers } from "@graphql-tools/utils";
import { COLLECTIONS } from "../config/constantes";


const resolversMutation: IResolvers = {
    Mutation:{
        async register(_, {user}, { db }){
            // comprobar el ultimo usuario registrado para asignar ID
            const lastUser = await db.collection(COLLECTIONS.USERS).
                                find().
                                limit(1).
                                sort({registerDate:-1}).toArray();
            
            if(lastUser.length === 0){
                user.id = 1;
            } else {
                user.id = lastUser[0].id + 1;
            }
            //Asignar la fecha de en formato ISO en la propiedad register date
            
            user.registerDate = new Date().toISOString();
            //Guardar el registro en la coleccion
            return await db.
                collection(COLLECTIONS.USERS).
                insertOne(user).then(
                    async () => {
                        return user;
                    }
                ).catch((err:Error) => {
                    console.log(err.message)
                    return null;
                });
        }
    }    
};

export default resolversMutation;