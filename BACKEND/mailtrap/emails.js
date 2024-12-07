import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { sender,client} from "./mailtrap.config.js";



export const sendVerificationEmail = async (email,verificationToken)=>{

    const recipients = [{email}];
try {
    console.log(recipients)
  const result =  await client.send({
        from: sender,
        to: recipients,
        subject: "You are awesome!",
        html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}',verificationToken),
        category: "Integration Test",
      })
} catch (error) {
    console.log(error)
    throw new Error(`Error sending verification email ${error}`)
}


}

export const sendWelcomeEmail = async (email,name)=>{
const recipients  = [{email}]

try {
    await client.send({
        from:sender,
        to:recipients,
           template_uuid: "43592f48-25fb-4552-b166-05f97f74ce02",
    template_variables: {
      "company_info_name": "Store",
      "name": name
    }
    })
} catch (error) {
    console.log(error)
    throw new Error(`Error sending welcome email: ${error}`);
}
}
export const resetPasswordEmail = async (email,link)=>{
const recipients  = [{email}]
console.log(email)
try {
    await client.send({
        from:sender,
        to:recipients,
        subject: "Reset Password!",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}',link),
        category: "Auth",

    })
} catch (error) {
    console.log(error)
    throw new Error(`Error sending email: ${error}`);
}
}
export const resetPasswordSuccessEmail = async (email)=>{
const recipients  = [{email}]

try {
    await client.send({
        from:sender,
        to:recipients,
        subject: "Password Reset Successfuly!",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        category: "Auth",

    })
} catch (error) {
    console.log(error)
    throw new Error(`Error sending email: ${error}`);
}
}