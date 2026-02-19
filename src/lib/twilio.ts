/**
 * Twilio SMS integration for RevenuFlow.
 * Non-blocking: returns null if env vars are missing or on error.
 * Never throws — failures are logged and silently absorbed.
 */

interface TwilioConfig {
  readonly accountSid: string;
  readonly authToken: string;
  readonly fromNumber: string;
}

interface SendSmsParams {
  readonly to: string;
  readonly body: string;
}

interface SendSmsResult {
  readonly sid: string;
  readonly status: string;
}

function getTwilioConfig(): TwilioConfig | null {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn("Twilio credentials not configured, skipping SMS");
    return null;
  }

  return { accountSid, authToken, fromNumber };
}

export function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (phone.startsWith("+") && digits.length >= 10) return `+${digits}`;
  console.warn(`Invalid phone number format: ${phone}`);
  return null;
}

export async function sendSms(
  params: SendSmsParams
): Promise<SendSmsResult | null> {
  const config = getTwilioConfig();
  if (!config) return null;

  const normalizedTo = normalizePhone(params.to);
  if (!normalizedTo) return null;

  try {
    const twilio = (await import("twilio")).default;
    const client = twilio(config.accountSid, config.authToken);

    const message = await client.messages.create({
      to: normalizedTo,
      from: config.fromNumber,
      body: params.body,
    });

    console.log("SMS sent:", message.sid);
    return { sid: message.sid, status: message.status };
  } catch (error) {
    console.error("Twilio SMS error:", error);
    return null;
  }
}

export async function sendContactConfirmationSms(data: {
  readonly phone: string;
  readonly name: string;
}): Promise<SendSmsResult | null> {
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;
  return sendSms({
    to: data.phone,
    body: `Hi ${firstName}! Thanks for reaching out to RevenuFlow. We received your message and will be in touch within 24 hours. Reply STOP to opt out.`,
  });
}

export async function sendLeadConfirmationSms(data: {
  readonly phone: string;
  readonly name: string;
}): Promise<SendSmsResult | null> {
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;
  return sendSms({
    to: data.phone,
    body: `Hi ${firstName}! Thanks for requesting a free revenue analysis from RevenuFlow. Our team is preparing your custom report — expect to hear from us within 24 hours. Reply STOP to opt out.`,
  });
}
