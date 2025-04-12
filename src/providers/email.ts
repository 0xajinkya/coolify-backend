import * as nodemailer from "nodemailer";
import {
  SMTP_EMAIL,
  SMTP_ENDPOINT,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
} from "../config";

const transporter = nodemailer.createTransport({
  host: SMTP_ENDPOINT,
  port: Number(SMTP_PORT) || 465,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

/**
 * Sends an email asynchronously
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject line.
 * @param {string} html - HTML body of the email.
 * @returns {void}
 * @description
 * - Sends an email using the transporter with the provided to, subject, and html.
 * - Tries to send the email and logs a success message if it sends successfully.
 * - Catches any errors and logs them.
 */
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const sentRes = await transporter.sendMail({
      from: `Coolify<${SMTP_EMAIL}>`,
      to,
      subject,
      html,
      priority: "high",
    });
    console.log("Email send successfully", sentRes);
  } catch (error) {
    console.log(error);
  }
};
