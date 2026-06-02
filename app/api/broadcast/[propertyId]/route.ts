import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSession } from "@/lib/auth/server";
import { getPropertyById } from "@/lib/data/properties";

const resend = new Resend(process.env.RESEND_API_KEY);
const SEGMENT_ID = process.env.RESEND_SEGMENT_ID ?? '';

export async function POST(_req: NextRequest, { params }: { params: { propertyId: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!SEGMENT_ID) return NextResponse.json({ error: "RESEND_SEGMENT_ID is not configured" }, { status: 500 });

  const property = await getPropertyById(params.propertyId);
  if (!property) return NextResponse.json({ error: "Property not found" }, { status: 404 });
  if (!property.isPublished) return NextResponse.json({ error: "Property is not published" }, { status: 400 });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const propertyUrl = `${appUrl}/properties/${property.slug}`;

  const { data, error } = await resend.broadcasts.create({
    name: `Property: ${property.title}`,
    from: "Crestbourne <info@mail.crestbourne.co.uk>",
    subject: `New Property: ${property.title}`,
    segmentId: SEGMENT_ID,
    send: true,
    html: buildEmail({ property, propertyUrl }),
  });

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Failed to send broadcast" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, broadcastId: data.id });
}

function buildEmail({
  property,
  propertyUrl,
}: {
  property: Awaited<ReturnType<typeof getPropertyById>>;
  propertyUrl: string;
}) {
  if (!property) return "";
  const desc = property.description
    ? property.description.slice(0, 300) + (property.description.length > 300 ? "…" : "")
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Property — Crestbourne</title>
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
                Crestbourne · New Property
              </p>
              <h1 style="margin:0;font-family:'Georgia',serif;font-weight:400;font-size:28px;line-height:1.15;color:#f5f4f0;letter-spacing:-0.02em;">
                ${property.title}
              </h1>
              <p style="margin:10px 0 0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9a8c7a;">
                ${property.location}${property.type ? " · " + property.type : ""}
              </p>
            </td>
          </tr>

          <!-- Gold accent bar -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#c9a96e 0%,#e8d5a3 50%,#c9a96e 100%);"></td>
          </tr>

          ${property.coverImageUrl ? `<!-- Cover image -->
          <tr>
            <td style="background:#ffffff;padding:0;">
              <img src="${property.coverImageUrl}" alt="${property.coverImageAlt ?? property.title}" width="560" style="display:block;width:100%;max-width:560px;height:auto;" />
            </td>
          </tr>` : ""}

          <!-- Body -->
          ${desc ? `<tr>
            <td style="background:#ffffff;padding:32px 40px 0;">
              <p style="margin:0;font-size:15px;line-height:1.75;color:#3a3830;font-family:'Georgia',serif;">${desc}</p>
            </td>
          </tr>` : ""}

          <!-- CTA -->
          <tr>
            <td style="background:#ffffff;padding:${desc ? "24px" : "32px"} 40px 36px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#1a1a18;border-radius:100px;padding:12px 28px;">
                    <a href="${propertyUrl}" style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#f5f4f0;text-decoration:none;">
                      View Property →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#faf9f6;border-top:1px solid #e8e4dc;padding:24px 40px;border-radius:0 0 6px 6px;text-align:center;">
              <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#b0a898;">
                Crestbourne Capital &nbsp;&middot;&nbsp; crestbourne.co.uk
              </p>
              <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.1em;color:#b0a898;text-decoration:underline;">
                Unsubscribe
              </a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
