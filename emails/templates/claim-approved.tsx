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
} from '@react-email/components';

interface ClaimApprovedEmailProps {
  practitionerName: string;
  claimantName: string;
  city: string;
  state: string;
  dashboardUrl: string;
  adminNotes?: string;
}

export default function ClaimApprovedEmail({
  practitionerName = 'Dr. Smith',
  claimantName = 'John Doe',
  city = 'Los Angeles',
  state = 'California',
  dashboardUrl = 'https://hypnotherapy-finder.com/dashboard',
  adminNotes,
}: ClaimApprovedEmailProps) {
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
