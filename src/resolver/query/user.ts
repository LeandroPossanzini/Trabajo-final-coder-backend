import { IResolvers } from "@graphql-tools/utils";
import { COLLECTIONS, EXPIRETIME, MESSAGES } from "./../../config/constantes";
import JWT from "./../../lib/jwt";
import bcrypt from "bcrypt"
import { findOneElment } from "../../lib/db-operations";


const resolversUserQuery: IResolvers = {
  Query: {
    async users(_, __, { db }) {
      try {
        return {
          status: true,
          message: "Lista de usuarios cargada ok",
          users: await db.collection(COLLECTIONS.USERS).find().toArray(),
        };
      } catch (e) {
        console.log(e);
        return {
          status: false,
          message: "Error en la carga de usuarios",
          users: [],
        };
      }
    },

    async login(_, { email, password }, { db }) {
      try {
        const user = await findOneElment(db, COLLECTIONS.USERS, { email })

        if (user === null) {
          return {
            status: false,
            message: "Usuario no existe",
            token: null,
          };
        }
        const passswordCheck = bcrypt.compareSync(password, user.password);

        if(passswordCheck !== null){
          delete user.password;
          delete user.birthday;
          delete user.regiterDate;
        }

        return {
          status: true,
          message:
            !passswordCheck
              ? "Password y usuario incorrecto, inicie sesion"
              : "Usuario correcto",
          token: 
            !passswordCheck
              ? null
              : new JWT().sing({ user }, EXPIRETIME.H24)
        };
      } catch (e) {
        console.log(e);
        return {
          status: false,
          message: "Error al cargar el usuario",
          token: null,
        };
      }
    },
    me(_,__, {token}) {
      let info = new JWT().verify(token);
      if(info === MESSAGES.TOKEN_VERIFICATION_FAILED){
        return {
          status:false,
          message: info,
          user: null
        };
      }
      return {
        status: true,
        message: "Usuario verificado ok ",
        user: Object.values(info)[0]
      };
    },
  },
};

export default resolversUserQuery;
