import { transporter } from "../configuration/mail.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const welcomeEmailTemplate = fs.readFileSync(path.resolve(__dirname, "../templates/welcome.html"), "utf8");
export const sendWelcomeEmail = async (email, name, verificationLink) => {
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Welcome to our app",
        html: welcomeEmailTemplate
            .replace("{{ name }}", name)
            .replace("{{ verificationLink }}", verificationLink),
    });
};
console.log(process.env.SMTP_HOST);
console.log(process.env.SMTP_USER);
console.log(process.env.SMTP_PORT);
console.log(process.env.SMTP_PASS);
//# sourceMappingURL=Email.services.js.map