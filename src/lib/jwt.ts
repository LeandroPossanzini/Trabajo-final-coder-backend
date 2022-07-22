import { EXPIRETIME, MESSAGES, SECRET_KEY } from '../config/constantes';
import jwt from "jsonwebtoken"
import { IJwt } from '../interfaces/jwt.interface';

class JWT {
    private secret_key = SECRET_KEY as string;

    sing(data:IJwt, expiresIn: number = EXPIRETIME.H24){
        return jwt.sign(
            {user: data.user},
            this.secret_key,
            { expiresIn } // expira en 24 hs
        )
    }

    verify(token:string){
        try {
            return jwt.verify(token, this.secret_key);
        } catch (error) {
            return MESSAGES.TOKEN_VERIFICATION_FAILED
        }
    }
}

export default JWT;