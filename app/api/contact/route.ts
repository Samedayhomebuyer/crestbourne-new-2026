import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, phone, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Crestbourne Website <onboarding@resend.dev>",
    to: "info@samedayhomebuyer.co.uk",
    replyTo: email,
    subject: `Crestbourne Site Enquiry- New enquiry from ${name}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry — Crestbourne  </title>
</head>
<body style="margin:0;padding:0;background:#f5f4f0;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4f0;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header -->
          <tr>
            <td style="background:#1a1a18;border-radius:6px 6px 0 0;padding:36px 40px 32px;">
              <p style="margin:0 0 12px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#9a8c7a;">
                Crestbourne
              </p>
              <h1 style="margin:0;font-family:'Georgia',serif;font-weight:400;font-size:30px;line-height:1.1;color:#f5f4f0;letter-spacing:-0.02em;">
                New <em style="font-style:italic;color:#c9a96e;">Enquiry</em>
              </h1>
            </td>
          </tr>

          <!-- Gold accent bar -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#c9a96e 0%,#e8d5a3 50%,#c9a96e 100%);"></td>
          </tr>

          <!-- Contact details -->
          <tr>
            <td style="background:#ffffff;padding:32px 40px 0;">
              <p style="margin:0 0 20px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#9a8c7a;">
                Contact Details
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 0 16px;">
                    <p style="margin:0 0 3px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#9a8c7a;">Name</p>
                    <p style="margin:0;font-size:16px;color:#1a1a18;font-family:'Georgia',serif;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 16px;">
                    <p style="margin:0 0 3px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#9a8c7a;">Email</p>
                    <p style="margin:0;font-size:16px;color:#1a1a18;font-family:'Georgia',serif;">
                      <a href="mailto:${email}" style="color:#c9a96e;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
                ${phone ? `<tr>
                  <td style="padding:0 0 16px;">
                    <p style="margin:0 0 3px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#9a8c7a;">Telephone</p>
                    <p style="margin:0;font-size:16px;color:#1a1a18;font-family:'Georgia',serif;">
                      <a href="tel:${phone}" style="color:#c9a96e;text-decoration:none;">${phone}</a>
                    </p>
                  </td>
                </tr>` : ""}
              </table>
            </td>
          </tr>

          <!-- Rule -->
          <tr>
            <td style="background:#ffffff;padding:0 40px;">
              <hr style="border:none;border-top:1px solid #e8e4dc;margin:8px 0 28px;" />
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="background:#ffffff;padding:0 40px 36px;">
              <p style="margin:0 0 12px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#9a8c7a;">
                Message
              </p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#3a3830;font-family:'Georgia',serif;">
                ${message.replace(/\n/g, "<br/>")}
              </p>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="background:#faf9f6;border-top:1px solid #e8e4dc;padding:24px 40px;border-radius:0 0 6px 6px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#1a1a18;border-radius:100px;padding:11px 24px;">
                    <a href="mailto:${email}" style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#f5f4f0;text-decoration:none;">
                      Reply to ${name.split(" ")[0]}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <p style="margin:0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#b0a898;">
                Crestbourne Capital &nbsp;&middot;&nbsp; crestbourne.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
