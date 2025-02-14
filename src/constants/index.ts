import {
    USER_LOGIN_FORM,
    USER_REGISTRATION_FORM,
    UserRegistrationProps,
} from "./forms"

type MyloConstantsProps = {
    signUpForm: UserRegistrationProps[]
    signIn: UserRegistrationProps[]
}

export const MYLO_CONSTANTS: MyloConstantsProps = {
    signUpForm: USER_REGISTRATION_FORM,
    signIn: USER_LOGIN_FORM,
}
