import nodemailer from 'nodemailer';
// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Hostinger SMTP server
  port: +process.env.SMTP_PORT, // Port for sending mail
  secure: true, // Use SSL (false for TLS)
  auth: {
    user: process.env.SMTP_USER, // Your email address
    pass: process.env.SMTP_PASS, 
  },
});

/**
 * Sends an alert email with the specified subject, text, recipient, and optional HTML content.
 *
 * @param {object} mailOptions - Object containing email details like subject, text, recipient, and HTML content.
 */
export function sendAlertMail({ subject, text, to, html }){
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: to, 
    subject: subject,
    text: text,
    html: html
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}