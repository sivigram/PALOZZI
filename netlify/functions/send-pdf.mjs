import nodemailer from 'nodemailer';

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const escapeHtml = (value = '') => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed.' });

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const fromName = process.env.GMAIL_FROM_NAME || 'THE COLOR RITUAL';
  if (!gmailUser || !gmailAppPassword) return json(500, { error: 'Email delivery has not been configured.' });

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid request.' });
  }

  const { clientName, recipientEmail, consultantName, seasonName, filename, pdfBase64 } = payload;
  if (!emailPattern.test(recipientEmail || '')) return json(400, { error: 'Enter a valid client email address.' });
  if (![seasonName, filename, pdfBase64].every((value) => typeof value === 'string' && value.length > 0)) {
    return json(400, { error: 'The report attachment is incomplete.' });
  }
  if (pdfBase64.length > 35_000_000) return json(413, { error: 'The PDF is too large to email.' });

  const safeName = escapeHtml(clientName || 'there');
  const safeSeason = escapeHtml(seasonName);
  const safeConsultant = escapeHtml(consultantName || 'Your colour consultant');
  const subject = `Your Color Ritual — ${seasonName}`;
  const html = `
    <div style="background:#f6f2ed;padding:40px 20px;color:#3b312c;font-family:Arial,sans-serif;line-height:1.65">
      <div style="max-width:600px;margin:0 auto;background:#fffdf9;padding:42px;border:1px solid #e2d8cf">
        <p style="margin:0;color:#84766e;font-size:11px;letter-spacing:2px;text-transform:uppercase">Colour Analysis Experience</p>
        <h1 style="margin:8px 0 28px;font-family:Georgia,serif;font-size:30px;font-weight:normal;letter-spacing:2px">THE COLOR RITUAL</h1>
        <p>Dear ${safeName},</p>
        <p>Thank you for taking part in your personalised colour consultation.</p>
        <p>Your result is <strong>${safeSeason}</strong>. Your attached report includes your seasonal profile, complete colour palette, personalised styling guidance and technical colour references.</p>
        <p>Use it as a practical wardrobe companion when choosing clothing, accessories, metals and colour combinations.</p>
        <p style="margin-top:30px">Warm regards,<br><strong>${safeConsultant}</strong></p>
        <p style="margin-top:32px;padding-top:18px;border-top:1px solid #e2d8cf;color:#84766e;font-size:11px">Digital colour appearance may vary between screens, materials, lighting conditions and printing methods.</p>
      </div>
    </div>`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  try {
    const result = await transporter.sendMail({
      from: { name: fromName, address: gmailUser },
      to: recipientEmail,
      bcc: gmailUser,
      subject,
      html,
      attachments: [{ filename, content: Buffer.from(pdfBase64, 'base64'), contentType: 'application/pdf' }],
    });
    return json(200, { id: result.messageId });
  } catch (error) {
    console.error('Gmail delivery failed', error);
    return json(502, { error: 'The email service could not send the report.' });
  }
};
