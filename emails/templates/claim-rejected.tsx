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

interface ClaimRejectedEmailProps {
  practitionerName: string;
  claimantName: string;
  city: string;
  state: string;
  rejectionReason: string;
  contactUrl: string;
  adminNotes?: string;
}

export default function ClaimRejectedEmail({
  practitionerName = 'Dr. Smith',
  claimantName = 'John Doe',
  city = 'Los Angeles',
  state = 'California',
  rejectionReason = 'Unable to verify ownership',
  contactUrl = 'https://hypnotherapy-finder.com/contact',
  adminNotes,
}: ClaimRejectedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Update on your claim submission</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Claim Status Update</Heading>

          <Text style={text}>Hi {claimantName},</Text>

          <Text style={text}>
            Thank you for submitting a claim for <strong>{practitionerName}</strong> in {city}, {state}.
          </Text>

          <Text style={text}>
            After careful review, we were unable to approve your claim at this time.
          </Text>

          <Section style={reasonSection}>
            <Text style={reasonTitle}>Reason:</Text>
            <Text style={reasonText}>{rejectionReason}</Text>
          </Section>

          {adminNotes && (
            <Section style={notesSection}>
              <Text style={notesTitle}>Additional Information:</Text>
              <Text style={notesText}>{adminNotes}</Text>
            </Section>
          )}

          <Text style={text}>
            If you believe this is an error or would like to provide additional verification, please contact our support team.
          </Text>

          <Section style={infoSection}>
            <Text style={infoText}>
              <strong>What you can do:</strong>
            </Text>
            <Text style={infoText}>
              • Provide additional verification documents
            </Text>
            <Text style={infoText}>
              • Verify your professional credentials
            </Text>
            <Text style={infoText}>
              • Contact us with questions
            </Text>
          </Section>

          <Section style={buttonSection}>
            <Link href={contactUrl} style={button}>
              Contact Support
            </Link>
          </Section>

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

const reasonSection = {
  backgroundColor: '#fef2f2',
  borderRadius: '8px',
  margin: '32px 40px',
  padding: '24px',
  borderLeft: '4px solid #ef4444',
};

const reasonTitle = {
  color: '#991b1b',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  textTransform: 'uppercase' as const,
};

const reasonText = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
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
