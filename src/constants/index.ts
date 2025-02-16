import {
    USER_FORGOT_PASSWORD_FORM,
    USER_LOGIN_FORM,
    USER_REGISTRATION_FORM,
    USER_RESET_PASSWORD_FORM,
    UserRegistrationProps,
} from "./forms"

type MyloConstantsProps = {
    signUpForm: UserRegistrationProps[]
    signIn: UserRegistrationProps[]
    forgotPasswordForm: UserRegistrationProps[]
    resetPasswordForm: UserRegistrationProps[]
}

export const MYLO_CONSTANTS: MyloConstantsProps = {
    signUpForm: USER_REGISTRATION_FORM,
    signIn: USER_LOGIN_FORM,
    forgotPasswordForm: USER_FORGOT_PASSWORD_FORM,
    resetPasswordForm: USER_RESET_PASSWORD_FORM
}
