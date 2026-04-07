import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ContactConfirmationEmailProps = {
  name: string;
  subject: string;
  message: string;
};

const brand = {
  background: "#f3efe6",
  surface: "#fffaf1",
  foreground: "#132027",
  muted: "#4f5f68",
  mutedStrong: "#6f7c83",
  accent: "#a67c37",
  accentSoft: "#d9be8c",
  border: "rgba(19, 32, 39, 0.1)",
};

export function ContactConfirmationEmail({
  name,
  subject,
  message,
}: ContactConfirmationEmailProps) {
  const firstName = name.split(" ")[0];

  return (
    <Html>
      <Head />
      <Preview>
        Thank you for contacting Amicus Juris LP — we&apos;ve received your enquiry.
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerEyebrow}>AMICUS JURIS LP</Text>
            <Text style={headerTagline}>Legal Practitioners &middot; A Legacy in Motion</Text>
          </Section>

          <Section style={card}>
            <Heading style={greeting}>Dear {firstName},</Heading>

            <Text style={paragraph}>
              Thank you for reaching out to <strong>Amicus Juris LP</strong>. Your enquiry has
              been received and a member of the firm will respond within one business day.
            </Text>

            <Text style={paragraph}>
              In the meantime, if your matter is urgent, please feel free to reach us directly
              by phone.
            </Text>

            <Section style={summaryBox}>
              <Text style={summaryLabel}>Your Enquiry</Text>
              <Text style={summarySubject}>{subject}</Text>
              <Hr style={summaryDivider} />
              <Text style={summaryMessage}>
                &ldquo;{message.length > 240 ? `${message.slice(0, 240)}…` : message}&rdquo;
              </Text>
            </Section>

            <Text style={paragraph}>
              We appreciate you taking the time to contact us and look forward to assisting
              you.
            </Text>

            <Text style={signOff}>Warm regards,</Text>
            <Text style={signature}>The Amicus Juris LP Team</Text>
          </Section>

          <Section style={contactCard}>
            <Text style={contactTitle}>Contact</Text>
            <Text style={contactItem}>
              <strong>Email:</strong>{" "}
              <Link href="mailto:info@amicusjurislp.com" style={contactLink}>
                info@amicusjurislp.com
              </Link>
            </Text>
            <Text style={contactItem}>
              <strong>Phone:</strong> +234 810 804 7574
            </Text>
            <Text style={contactItem}>
              <strong>Office:</strong> Suite 15, Augustus Aihkomou Street, Utako, Abuja
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              <Link href="https://amicusjurislp.com" style={footerLink}>
                amicusjurislp.com
              </Link>
            </Text>
            <Text style={footerMeta}>
              &copy; {new Date().getFullYear()} Amicus Juris LP &middot; Barristers and Solicitors
            </Text>
            <Text style={footerDisclaimer}>
              This is an automated confirmation. Please do not reply to this message; a member
              of the firm will be in touch directly.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactConfirmationEmail;

// ---------- styles ----------

const body: React.CSSProperties = {
  margin: 0,
  padding: "32px 16px",
  backgroundColor: brand.background,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  color: brand.foreground,
};

const container: React.CSSProperties = {
  maxWidth: 600,
  margin: "0 auto",
};

const header: React.CSSProperties = {
  padding: "36px 32px",
  background: brand.foreground,
  borderRadius: "20px 20px 0 0",
  textAlign: "center",
};

const headerEyebrow: React.CSSProperties = {
  margin: 0,
  color: brand.accentSoft,
  fontSize: 16,
  fontWeight: 700,
  letterSpacing: "0.32em",
  textTransform: "uppercase",
  fontFamily: "Georgia, 'Times New Roman', serif",
};

const headerTagline: React.CSSProperties = {
  margin: "10px 0 0",
  color: "rgba(255, 250, 241, 0.7)",
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

const card: React.CSSProperties = {
  padding: "36px 32px",
  background: brand.surface,
  borderLeft: `1px solid ${brand.border}`,
  borderRight: `1px solid ${brand.border}`,
};

const greeting: React.CSSProperties = {
  margin: "0 0 20px",
  color: brand.foreground,
  fontSize: 22,
  fontWeight: 600,
  fontFamily: "Georgia, 'Times New Roman', serif",
};

const paragraph: React.CSSProperties = {
  margin: "0 0 16px",
  color: brand.muted,
  fontSize: 15,
  lineHeight: 1.7,
};

const summaryBox: React.CSSProperties = {
  margin: "24px 0",
  padding: "20px 24px",
  background: brand.background,
  borderLeft: `4px solid ${brand.accent}`,
  borderRadius: "0 12px 12px 0",
};

const summaryLabel: React.CSSProperties = {
  margin: "0 0 6px",
  color: brand.mutedStrong,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
};

const summarySubject: React.CSSProperties = {
  margin: "0 0 4px",
  color: brand.foreground,
  fontSize: 16,
  fontWeight: 600,
  fontFamily: "Georgia, 'Times New Roman', serif",
};

const summaryDivider: React.CSSProperties = {
  borderColor: brand.border,
  borderStyle: "solid",
  borderWidth: "0 0 1px 0",
  margin: "12px 0",
};

const summaryMessage: React.CSSProperties = {
  margin: 0,
  color: brand.muted,
  fontSize: 14,
  lineHeight: 1.6,
  fontStyle: "italic",
};

const signOff: React.CSSProperties = {
  margin: "24px 0 4px",
  color: brand.muted,
  fontSize: 15,
};

const signature: React.CSSProperties = {
  margin: 0,
  color: brand.foreground,
  fontSize: 15,
  fontWeight: 600,
  fontFamily: "Georgia, 'Times New Roman', serif",
};

const contactCard: React.CSSProperties = {
  padding: "24px 32px",
  background: brand.surface,
  borderLeft: `1px solid ${brand.border}`,
  borderRight: `1px solid ${brand.border}`,
  borderTop: `1px solid ${brand.border}`,
  borderRadius: "0 0 20px 20px",
};

const contactTitle: React.CSSProperties = {
  margin: "0 0 12px",
  color: brand.mutedStrong,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
};

const contactItem: React.CSSProperties = {
  margin: "0 0 6px",
  color: brand.muted,
  fontSize: 13,
  lineHeight: 1.6,
};

const contactLink: React.CSSProperties = {
  color: brand.accent,
  textDecoration: "none",
};

const footer: React.CSSProperties = {
  textAlign: "center",
  padding: "24px 16px 0",
};

const footerText: React.CSSProperties = {
  margin: "0 0 6px",
  fontSize: 13,
};

const footerLink: React.CSSProperties = {
  color: brand.accent,
  textDecoration: "none",
  fontWeight: 600,
};

const footerMeta: React.CSSProperties = {
  margin: "0 0 8px",
  color: brand.mutedStrong,
  fontSize: 11,
};

const footerDisclaimer: React.CSSProperties = {
  margin: 0,
  color: brand.mutedStrong,
  fontSize: 11,
  fontStyle: "italic",
  lineHeight: 1.5,
};
