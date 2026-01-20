import nodemailer from 'nodemailer';

type SendEmailServiceProps = {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
};

const configOptions = {
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
};
export async function sendEmailService({ from, to, subject, text, html }: SendEmailServiceProps) {
    try {
        const transporter = nodemailer.createTransport(configOptions);
        const isConnected = await transporter.verify();
        if (isConnected) throw new Error('Transporter not ready');

        const info = await transporter.sendMail({ from, to, subject, text, html });
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error('Error while sending mail', err);
    }
}
