/**
 * Email HTML templates for RevenuFlow notifications.
 * Pure functions returning HTML strings — no side effects.
 */

interface ContactEmailData {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly message: string;
  readonly company?: string;
}

interface LeadEmailData {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly propertyType: string;
  readonly propertyCount: string;
  readonly revenue?: string | null;
  readonly location?: string | null;
}

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;color:#e2e8f0;">
      ${content}
    </div>
    <p style="text-align:center;color:#64748b;font-size:12px;margin-top:24px;">
      RevenuFlow by TheLevelTeam LLC
    </p>
  </div>
</body>
</html>`;
}

export function contactConfirmationEmail(data: ContactEmailData): string {
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;
  return emailWrapper(`
    <h1 style="color:#ffffff;font-size:24px;margin:0 0 16px;">Thanks for reaching out, ${firstName}!</h1>
    <p style="color:#94a3b8;line-height:1.6;margin:0 0 24px;">
      We received your message and our team will review it shortly.
      You can expect to hear back from us within 24 hours.
    </p>
    <div style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);border-radius:12px;padding:16px;margin:0 0 24px;">
      <p style="color:#93c5fd;font-size:14px;margin:0;">In the meantime, feel free to reply to this email if you have any additional questions.</p>
    </div>
    <p style="color:#64748b;font-size:13px;margin:0;">&mdash; The RevenuFlow Team</p>
  `);
}

export function leadConfirmationEmail(data: LeadEmailData): string {
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;
  return emailWrapper(`
    <h1 style="color:#ffffff;font-size:24px;margin:0 0 16px;">Your Free Revenue Analysis is on the Way, ${firstName}!</h1>
    <p style="color:#94a3b8;line-height:1.6;margin:0 0 24px;">
      Our team is preparing a custom revenue analysis based on your property details.
      Expect to hear from us within 24 hours with your personalized report.
    </p>
    <div style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);border-radius:12px;padding:16px;margin:0 0 24px;">
      <p style="color:#93c5fd;font-size:14px;font-weight:600;margin:0 0 8px;">What you submitted:</p>
      <p style="color:#94a3b8;font-size:13px;margin:0;line-height:1.8;">
        Property Type: ${data.propertyType}<br/>
        Number of Properties: ${data.propertyCount}
        ${data.revenue ? `<br/>Monthly Revenue: ${data.revenue}` : ""}
        ${data.location ? `<br/>Location: ${data.location}` : ""}
      </p>
    </div>
    <p style="color:#64748b;font-size:13px;margin:0;">&mdash; The RevenuFlow Team</p>
  `);
}

export function contactNotificationEmail(data: ContactEmailData): string {
  return emailWrapper(`
    <h1 style="color:#ffffff;font-size:20px;margin:0 0 16px;">New Contact Form Submission</h1>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="color:#64748b;padding:8px 0;font-size:13px;">Name</td><td style="color:#e2e8f0;padding:8px 0;font-size:13px;">${data.name}</td></tr>
      <tr><td style="color:#64748b;padding:8px 0;font-size:13px;">Email</td><td style="color:#e2e8f0;padding:8px 0;font-size:13px;">${data.email}</td></tr>
      <tr><td style="color:#64748b;padding:8px 0;font-size:13px;">Phone</td><td style="color:#e2e8f0;padding:8px 0;font-size:13px;">${data.phone}</td></tr>
      ${data.company ? `<tr><td style="color:#64748b;padding:8px 0;font-size:13px;">Company</td><td style="color:#e2e8f0;padding:8px 0;font-size:13px;">${data.company}</td></tr>` : ""}
      <tr><td style="color:#64748b;padding:8px 0;font-size:13px;">Message</td><td style="color:#e2e8f0;padding:8px 0;font-size:13px;">${data.message}</td></tr>
    </table>
  `);
}

export function leadNotificationEmail(data: LeadEmailData): string {
  return emailWrapper(`
    <h1 style="color:#ffffff;font-size:20px;margin:0 0 16px;">New Lead Submission</h1>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="color:#64748b;padding:8px 0;font-size:13px;">Name</td><td style="color:#e2e8f0;padding:8px 0;font-size:13px;">${data.name}</td></tr>
      <tr><td style="color:#64748b;padding:8px 0;font-size:13px;">Email</td><td style="color:#e2e8f0;padding:8px 0;font-size:13px;">${data.email}</td></tr>
      ${data.phone ? `<tr><td style="color:#64748b;padding:8px 0;font-size:13px;">Phone</td><td style="color:#e2e8f0;padding:8px 0;font-size:13px;">${data.phone}</td></tr>` : ""}
      <tr><td style="color:#64748b;padding:8px 0;font-size:13px;">Property Type</td><td style="color:#e2e8f0;padding:8px 0;font-size:13px;">${data.propertyType}</td></tr>
      <tr><td style="color:#64748b;padding:8px 0;font-size:13px;">Properties</td><td style="color:#e2e8f0;padding:8px 0;font-size:13px;">${data.propertyCount}</td></tr>
      ${data.revenue ? `<tr><td style="color:#64748b;padding:8px 0;font-size:13px;">Revenue</td><td style="color:#e2e8f0;padding:8px 0;font-size:13px;">${data.revenue}</td></tr>` : ""}
      ${data.location ? `<tr><td style="color:#64748b;padding:8px 0;font-size:13px;">Location</td><td style="color:#e2e8f0;padding:8px 0;font-size:13px;">${data.location}</td></tr>` : ""}
    </table>
  `);
}
