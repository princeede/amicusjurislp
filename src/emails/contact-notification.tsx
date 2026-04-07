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

type ContactNotificationEmailProps = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  submittedAt?: string;
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

export function ContactNotificationEmail({
  name,
  email,
  phone,
  subject,
  message,
  submittedAt,
}: ContactNotificationEmailProps) {
  const formattedDate =
    submittedAt ??
    new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <Html>
      <Head />
      <Preview>New enquiry from {name}: {subject}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerEyebrow}>AMICUS JURIS LP</Text>
            <Heading style={headerTitle}>New Website Enquiry</Heading>
            <Text style={headerSubtitle}>{formattedDate}</Text>
          </Section>

          <Section style={card}>
            <Text style={sectionLabel}>Subject</Text>
            <Heading style={subjectHeading}>{subject}</Heading>

            <Hr style={divider} />

            <Section style={detailsRow}>
              <Text style={detailLabel}>From</Text>
              <Text style={detailValue}>{name}</Text>
            </Section>

            <Section style={detailsRow}>
              <Text style={detailLabel}>Email</Text>
              <Link href={`mailto:${email}`} style={detailLink}>
                {email}
              </Link>
            </Section>

            {phone ? (
              <Section style={detailsRow}>
                <Text style={detailLabel}>Phone</Text>
                <Link href={`tel:${phone}`} style={detailLink}>
                  {phone}
                </Link>
              </Section>
            ) : null}

            <Hr style={divider} />

            <Text style={sectionLabel}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Section style={ctaSection}>
            <Link href={`mailto:${email}?subject=Re:%20${encodeURIComponent(subject)}`} style={ctaButton}>
              Reply to {name.split(" ")[0]}
            </Link>
          </Section>

          <Hr style={footerDivider} />

          <Section style={footer}>
            <Text style={footerText}>
              This enquiry was submitted through the contact form at{" "}
              <Link href="https://amicusjurislp.com" style={footerLink}>
                amicusjurislp.com
              </Link>
              .
            </Text>
            <Text style={footerMeta}>
              Amicus Juris LP &middot; Barristers and Solicitors &middot; Legal Practitioners in Nigeria
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactNotificationEmail;

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
  padding: "32px 32px 24px",
  background: brand.foreground,
  borderRadius: "20px 20px 0 0",
  textAlign: "left",
};

const headerEyebrow: React.CSSProperties = {
  margin: 0,
  color: brand.accentSoft,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
};

const headerTitle: React.CSSProperties = {
  margin: "12px 0 8px",
  color: "#fffaf1",
  fontSize: 30,
  lineHeight: 1.1,
  fontWeight: 600,
  fontFamily: "Georgia, 'Times New Roman', serif",
};

const headerSubtitle: React.CSSProperties = {
  margin: 0,
  color: "rgba(255, 250, 241, 0.7)",
  fontSize: 13,
};

const card: React.CSSProperties = {
  padding: "32px",
  background: brand.surface,
  borderLeft: `1px solid ${brand.border}`,
  borderRight: `1px solid ${brand.border}`,
};

const sectionLabel: React.CSSProperties = {
  margin: "0 0 8px",
  color: brand.mutedStrong,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
};

const subjectHeading: React.CSSProperties = {
  margin: "0 0 4px",
  color: brand.foreground,
  fontSize: 22,
  fontWeight: 600,
  lineHeight: 1.3,
  fontFamily: "Georgia, 'Times New Roman', serif",
};

const divider: React.CSSProperties = {
  borderColor: brand.border,
  borderStyle: "solid",
  borderWidth: "0 0 1px 0",
  margin: "24px 0",
};

const detailsRow: React.CSSProperties = {
  marginBottom: 16,
};

const detailLabel: React.CSSProperties = {
  margin: "0 0 4px",
  color: brand.mutedStrong,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

const detailValue: React.CSSProperties = {
  margin: 0,
  color: brand.foreground,
  fontSize: 15,
  lineHeight: 1.5,
};

const detailLink: React.CSSProperties = {
  color: brand.accent,
  fontSize: 15,
  textDecoration: "none",
  fontWeight: 500,
};

const messageText: React.CSSProperties = {
  margin: 0,
  color: brand.muted,
  fontSize: 15,
  lineHeight: 1.7,
  whiteSpace: "pre-wrap",
};

const ctaSection: React.CSSProperties = {
  padding: "0 32px 32px",
  background: brand.surface,
  borderLeft: `1px solid ${brand.border}`,
  borderRight: `1px solid ${brand.border}`,
  borderRadius: "0 0 20px 20px",
};

const ctaButton: React.CSSProperties = {
  display: "inline-block",
  padding: "14px 28px",
  background: brand.foreground,
  color: "#fffaf1",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  textDecoration: "none",
  borderRadius: 999,
};

const footerDivider: React.CSSProperties = {
  borderColor: "transparent",
  margin: "24px 0 16px",
};

const footer: React.CSSProperties = {
  textAlign: "center",
  padding: "0 16px",
};

const footerText: React.CSSProperties = {
  margin: "0 0 8px",
  color: brand.mutedStrong,
  fontSize: 12,
  lineHeight: 1.6,
};

const footerLink: React.CSSProperties = {
  color: brand.accent,
  textDecoration: "none",
};

const footerMeta: React.CSSProperties = {
  margin: 0,
  color: brand.mutedStrong,
  fontSize: 11,
};
