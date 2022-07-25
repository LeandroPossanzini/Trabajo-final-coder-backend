import { IResolvers } from "@graphql-tools/utils";
import { COLLECTIONS } from "../../config/constantes";
import bcrypt from "bcrypt";
import { asigDocumentId, findOneElment, inserOneElement } from "../../lib/db-operations";

const resolversUserMutation: IResolvers = {
    Mutation:{
        async register(_, {user}, { db }){
            // Comprobar que el usuario no existe
            const userCheck = await findOneElment(db, COLLECTIONS.USERS , {email: user.email})

            if(userCheck !== null){
                return {
                    status: false,
                    message: `El email ${user.email} esta registrado`,
                    user: null
                };
            }        


            // comprobar el ultimo usuario registrado para asignar ID
            user.id = await asigDocumentId(db,COLLECTIONS.USERS, {registerDate: -1});
            //Asignar la fecha de en formato ISO en la propiedad register date
            
            user.registerDate = new Date().toISOString();

            // Encriptar password
            user.password = bcrypt.hashSync(user.password, 10)
            //Guardar el registro en la coleccion
            return await inserOneElement(db, COLLECTIONS.USERS , user)
                  .then(async () => {
                        return {
                            status: true,
                            message: `El email ${user.email} esta registrado correctamente`,
                            user
                        };
                    }
                ).catch((err:Error) => {
                    console.log(err.message)
                    return {
                        status: false,
                        message: `Error inesperado prueba de nuevo`,
                        user: null
                    }
                });
        }
    }    
};

export default resolversUserMutation;