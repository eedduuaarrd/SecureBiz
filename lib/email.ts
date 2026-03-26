import { Resend } from "resend";

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendLeadNotification(data: {
  name: string;
  email: string;
  company: string;
  sector: string;
}) {
  if (!resend) {
    console.warn("Resend API key missing. Email not sent.");
    return;
  }

  try {
    await resend.emails.send({
      from: "SecureBiz AI <onboarding@resend.dev>",
      to: "edu12713@gmail.com",
      subject: `New Lead: ${data.name} - ${data.sector}`,
      html: `
        <h2>New Lead Recorded</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Sector:</strong> ${data.sector}</p>
        <hr />
        <p>This lead has been saved to the database.</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send lead notification email:", error);
  }
}
