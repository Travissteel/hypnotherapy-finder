import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  CodeBlock,
  Hr,
} from '@react-email/components';

interface ClaimApprovedEmailProps {
  practitionerName: string;
  claimantName: string;
  city: string;
  state: string;
  dashboardUrl: string;
  practitionerSlug: string;
  adminNotes?: string;
}

export default function ClaimApprovedEmail({
  practitionerName = 'Dr. Smith',
  claimantName = 'John Doe',
  city = 'Los Angeles',
  state = 'California',
  dashboardUrl = 'https://hypnotherapy-finder.com/dashboard',
  practitionerSlug = 'dr-smith-los-angeles',
  adminNotes,
}: ClaimApprovedEmailProps) {
  const profileUrl = `https://hypnotherapy-finder.com/practitioner/${practitionerSlug}`;
  const badgeCode = `<a href="${profileUrl}" target="_blank" rel="noopener">
  <img src="https://hypnotherapy-finder.com/badges/verified-practitioner.svg"
       alt="Verified on Hypnotherapy Finder"
       width="180" height="60" />
</a>`;
  return (
    <Html>
      <Head />
      <Preview>Your claim has been approved!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🎉 Claim Approved!</Heading>

          <Text style={text}>Hi {claimantName},</Text>

          <Text style={text}>
            Great news! Your claim for the listing <strong>{practitionerName}</strong> in {city}, {state} has been approved.
          </Text>

          <Section style={infoSection}>
            <Text style={infoText}>
              <strong>Practitioner:</strong> {practitionerName}
            </Text>
            <Text style={infoText}>
              <strong>Location:</strong> {city}, {state}
            </Text>
            <Text style={infoText}>
              <strong>Status:</strong> Approved ✅
            </Text>
          </Section>

          {adminNotes && (
            <Section style={notesSection}>
              <Text style={notesTitle}>Admin Notes:</Text>
              <Text style={notesText}>{adminNotes}</Text>
            </Section>
          )}

          <Text style={text}>
            You can now manage your listing from your dashboard. Update your profile, add photos, and enhance your visibility.
          </Text>

          <Section style={buttonSection}>
            <Link href={dashboardUrl} style={button}>
              Go to Dashboard
            </Link>
          </Section>

          <Hr style={divider} />

          <Section style={badgeSection}>
            <Heading style={h2}>Get Your Verified Badge</Heading>
            <Text style={badgeText}>
              Add our "Verified Practitioner" badge to your website to show clients you're a trusted professional listed on Hypnotherapy Finder. This also helps us verify you as the listing owner.
            </Text>

            <Text style={badgeText}>
              <strong>Copy this code and paste it into your website:</strong>
            </Text>

            <Section style={codeSection}>
              <Text style={codeText}>{badgeCode}</Text>
            </Section>

            <Text style={badgeText}>
              <strong>Benefits of adding the badge:</strong>
            </Text>
            <Text style={benefitsList}>
              ✓ Shows clients you're verified and trusted<br />
              ✓ Links directly to your profile<br />
              ✓ Boosts your credibility<br />
              ✓ Helps potential clients find you
            </Text>
          </Section>

          <Hr style={divider} />

          <Text style={text}>
            Thank you for being part of our hypnotherapy directory!
          </Text>

          <Text style={footer}>
            Hypnotherapy Finder<br />
            Connecting clients with qualified hypnotherapists
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#333',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 40px',
  textAlign: 'center' as const,
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 40px',
};

const infoSection = {
  backgroundColor: '#f0f7ff',
  borderRadius: '8px',
  margin: '32px 40px',
  padding: '24px',
};

const infoText = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '8px 0',
};

const notesSection = {
  backgroundColor: '#fff7ed',
  borderRadius: '8px',
  margin: '32px 40px',
  padding: '24px',
  borderLeft: '4px solid #fb923c',
};

const notesTitle = {
  color: '#9a3412',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  textTransform: 'uppercase' as const,
};

const notesText = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
};

const buttonSection = {
  margin: '32px 40px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#4f46e5',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '48px 40px 0',
  textAlign: 'center' as const,
};

const divider = {
  borderColor: '#e6ebf1',
  margin: '32px 40px',
};

const h2 = {
  color: '#333',
  fontSize: '22px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
  textAlign: 'center' as const,
};

const badgeSection = {
  margin: '32px 40px',
  padding: '24px',
  backgroundColor: '#f0fdf4',
  borderRadius: '8px',
  border: '1px solid #bbf7d0',
};

const badgeText = {
  color: '#333',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '12px 0',
};

const codeSection = {
  backgroundColor: '#1f2937',
  borderRadius: '6px',
  padding: '16px',
  margin: '16px 0',
  overflowX: 'auto' as const,
};

const codeText = {
  color: '#e5e7eb',
  fontSize: '12px',
  fontFamily: 'monospace',
  lineHeight: '20px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
  wordBreak: 'break-all' as const,
};

const benefitsList = {
  color: '#166534',
  fontSize: '15px',
  lineHeight: '28px',
  margin: '12px 0 0 0',
};
