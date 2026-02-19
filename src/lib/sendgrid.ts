/**
 * SendGrid email integration for RevenuFlow.
 * Non-blocking: returns null if env vars are missing or on error.
 * Never throws — failures are logged and silently absorbed.
 */

import sgMail from "@sendgrid/mail";
import {
  contactConfirmationEmail,
  contactNotificationEmail,
  leadConfirmationEmail,
  leadNotificationEmail,
} from "./email-templates";

interface SendGridConfig {
  readonly apiKey: string;
  readonly fromEmail: string;
  readonly fromName: string;
}

interface SendEmailParams {
  readonly to: string;
  readonly subject: string;
  readonly html: string;
}

interface SendEmailResult {
  readonly statusCode: number;
}

function getSendGridConfig(): SendGridConfig | null {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  const fromName = process.env.SENDGRID_FROM_NAME || "RevenuFlow";

  if (!apiKey || !fromEmail) {
    console.warn("SendGrid credentials not configured, skipping email");
    return null;
  }

  return { apiKey, fromEmail, fromName };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendEmail(
  params: SendEmailParams
): Promise<SendEmailResult | null> {
  const config = getSendGridConfig();
  if (!config) return null;

  try {
    sgMail.setApiKey(config.apiKey);

    const [response] = await sgMail.send({
      to: params.to,
      from: { email: config.fromEmail, name: config.fromName },
      subject: params.subject,
      html: params.html,
    });

    console.log("Email sent:", params.to, response.statusCode);
    return { statusCode: response.statusCode };
  } catch (error) {
    console.error("SendGrid email error:", error);
    return null;
  }
}

export async function sendContactEmails(data: {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly message: string;
  readonly company?: string;
}): Promise<void> {
  const teamEmail = process.env.TEAM_NOTIFICATION_EMAIL;
  const safeData = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone),
    message: escapeHtml(data.message),
    ...(data.company ? { company: escapeHtml(data.company) } : {}),
  };

  const promises: Promise<SendEmailResult | null>[] = [
    sendEmail({
      to: data.email,
      subject: "We received your message — RevenuFlow",
      html: contactConfirmationEmail(safeData),
    }),
  ];

  if (teamEmail) {
    promises.push(
      sendEmail({
        to: teamEmail,
        subject: `New Contact: ${safeData.name}`,
        html: contactNotificationEmail(safeData),
      })
    );
  }

  await Promise.all(promises);
}

export async function sendLeadEmails(data: {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly propertyType: string;
  readonly propertyCount: string;
  readonly revenue?: string | null;
  readonly location?: string | null;
}): Promise<void> {
  const teamEmail = process.env.TEAM_NOTIFICATION_EMAIL;
  const safeData = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    ...(data.phone ? { phone: escapeHtml(data.phone) } : {}),
    propertyType: escapeHtml(data.propertyType),
    propertyCount: escapeHtml(data.propertyCount),
    ...(data.revenue ? { revenue: escapeHtml(data.revenue) } : {}),
    ...(data.location ? { location: escapeHtml(data.location) } : {}),
  };

  const promises: Promise<SendEmailResult | null>[] = [
    sendEmail({
      to: data.email,
      subject: "Your Free Revenue Analysis is Coming — RevenuFlow",
      html: leadConfirmationEmail(safeData),
    }),
  ];

  if (teamEmail) {
    promises.push(
      sendEmail({
        to: teamEmail,
        subject: `New Lead: ${safeData.name} (${safeData.propertyCount} ${safeData.propertyType})`,
        html: leadNotificationEmail(safeData),
      })
    );
  }

  await Promise.all(promises);
}
