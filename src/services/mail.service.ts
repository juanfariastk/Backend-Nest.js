import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as Mailgen from "mailgen";
import { CreateEmailDto } from "src/mail/dto/create-email.dto";

const mailgenGenerator = new Mailgen({
    theme:'default',
    product:{ name: "Project FullStack backend - Web", link: "http://localhost:3000"}});

@Injectable()
export class EmailService{
    constructor(private mailer: MailerService){};

    async sendEmail({to, subject, text} : CreateEmailDto){
        await this.mailer.sendMail({to, subject, html: text})
        .then(()=>{console.log(`Email sended to ${to}!`)})
        .catch((e)=>{
            console.log(e);
            throw new InternalServerErrorException("Error to send email, attempt again!");
        })
    }

    resetPassword(userEmail:string, userName:string, resetToken:string){
        const email = {
            body:{
                name:userName,
                intro: 'You recently requested a password recovery. If it wasnt you, ignore this message.',
                action:{
                    instructions: 'Click on the button to continue a password reset.',
                    button: {
                        color: '#209ce8',
                        text: 'Reset password',
                        link:`http://localhost:5173/resetPassword/${resetToken}`
                    }
                }
            }
        }

        const emailBodyFinally = mailgenGenerator.generate(email);
        const emailTemplate = { to: userEmail, subject:"Project FullStack backend - Password Reset Extra!", text:emailBodyFinally};
        return emailTemplate;
    }
}
