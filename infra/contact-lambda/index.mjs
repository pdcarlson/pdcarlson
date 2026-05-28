import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: process.env.AWS_REGION ?? "us-east-1" });

const FROM = process.env.MAIL_FROM;
const TO = process.env.MAIL_TO;
const MAX_LEN = { name: 200, email: 320, message: 5000 };

function bad(status, body) {
  return {
    statusCode: status,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  };
}

function isEmail(v) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export const handler = async (event) => {
  if (!FROM || !TO) {
    console.error("missing MAIL_FROM or MAIL_TO env");
    return bad(500, { ok: false, error: "config" });
  }

  let payload;
  try {
    payload = JSON.parse(event.body ?? "{}");
  } catch {
    return bad(400, { ok: false, error: "invalid json" });
  }

  if (payload.honeypot) return { statusCode: 204, body: "" };

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!name || name.length > MAX_LEN.name) return bad(400, { ok: false, error: "name" });
  if (!isEmail(email) || email.length > MAX_LEN.email) return bad(400, { ok: false, error: "email" });
  if (!message || message.length > MAX_LEN.message) return bad(400, { ok: false, error: "message" });

  const subject = `Portfolio contact — ${name}`;
  const body = `From: ${name} <${email}>\n\n${message}`;

  try {
    await ses.send(new SendEmailCommand({
      Source: FROM,
      Destination: { ToAddresses: [TO] },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: { Text: { Data: body, Charset: "UTF-8" } },
      },
    }));
    return { statusCode: 200, headers: { "content-type": "application/json" }, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("ses error", err);
    return bad(500, { ok: false, error: "send" });
  }
};
