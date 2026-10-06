
export interface PasswordInterface{

    hash(password : string) : Promise<string>
    isSame(password : string, hashPassword : string) : Promise<boolean>
}