import { transporter } from "../src/configuration/mail.js"

export const sendWelcomeEmail = async (email: string, name: string)=> {
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Welcome to our app",
        text: `Welcome to our app, ${name}. let us know how you get along with the app`
    })
};
