
export interface RedisOtpInterface{

    generate(email : string) : Promise<string>

    verify(email : string, otp : string) : Promise<boolean>
}