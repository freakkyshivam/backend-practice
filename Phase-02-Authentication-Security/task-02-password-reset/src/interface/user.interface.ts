import type { UserI } from "../domains/user.types.js";

export interface UserInterface {


    getUserByEmail(
        email : string
    ) : Promise<UserI | null>


    forgotPassword(
        email : string,
        newPassword : string
    ) : Promise<void>
}
