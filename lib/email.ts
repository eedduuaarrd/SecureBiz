import { Resend } from "resend";

export async function sendLeadNotification(data: {
  name: string;
  email: string;
  company: string;
  sector: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("DEBUG: RESEND_API_KEY is NOT defined in environment variables.");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    console.log(`DEBUG: Attempting to send lead email for ${data.email} to edu12713@gmail.com`);
    
    const { data: resendData, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "edu12713@gmail.com",
      subject: `New Lead: ${data.name} - ${data.sector}`,
      html: `
        <h2>New Lead Recorded</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Sector:</strong> ${data.sector}</p>
        <hr />
        <p>Time: ${new Date().toLocaleString()}</p>
      `,
    });

    if (error) {
      console.error("DEBUG: Resend API returned an error:", error);
    } else {
      console.log("DEBUG: Resend email sent successfully:", resendData);
    }
  } catch (error) {
    console.error("DEBUG: Exception in sendLeadNotification:", error);
  }
}
