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
  practitionerSlug?: string;
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
  const badgeUrl = `https://hypnotherapy-finder.com/api/badge/${practitionerSlug}`;
  const embedCode = `<a href="${profileUrl}" target="_blank" rel="noopener">\n  <img src="${badgeUrl}" alt="Verified Practitioner - Hypnotherapy Finder" width="200" height="56" />\n</a>`;

  return (
    <Html>
      <Head />
      <Preview>Your listing is approved - here is your verified badge!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Claim Approved!</Heading>

          <Text style={text}>Hi {claimantName},</Text>

          <Text style={text}>
            Your listing <strong>{practitionerName}</strong> in {city}, {state} has been approved on Hypnotherapy Finder.
          </Text>

          <Section style={infoSection}>
            <Text style={infoText}><strong>Practitioner:</strong> {practitionerName}</Text>
            <Text style={infoText}><strong>Location:</strong> {city}, {state}</Text>
            <Text style={infoText}><strong>Status:</strong> Verified</Text>
          </Section>

          {adminNotes && (
            <Section style={notesSection}>
              <Text style={notesTitle}>Admin Notes:</Text>
              <Text style={notesText}>{adminNotes}</Text>
            </Section>
          )}

          {/* Verified badge section */}
          <Section style={badgeSection}>
            <Text style={badgeHeading}>Your Verified Practitioner Badge</Text>
            <Text style={{ ...text, margin: '0 0 20px 0' }}>
              You now have a verified badge you can display on your website. Here is how to add it in 3 simple steps:
            </Text>

            {/* Step 1 */}
            <Section style={stepSection}>
              <Text style={stepNumber}>Step 1 — Copy your badge code</Text>
              <Text style={{ ...text, margin: '0 0 10px 0', fontSize: '14px', color: '#555' }}>
                Select all the code below and copy it:
              </Text>
              <Section style={codeSection}>
                <Text style={codeText}>{embedCode}</Text>
              </Section>
            </Section>

            {/* Badge preview */}
            <Section style={{ textAlign: 'center' as const, margin: '8px 0 20px 0' }}>
              <Text style={{ ...text, fontSize: '13px', color: '#888', margin: '0 0 10px 0' }}>This is what your badge looks like:</Text>
              <Link href={profileUrl}>
                <img src={badgeUrl} alt="Verified Practitioner Badge" width="200" height="56" />
              </Link>
            </Section>

            {/* Step 2 */}
            <Section style={stepSection}>
              <Text style={stepNumber}>Step 2 — Paste it on your website</Text>
              <Text style={{ ...text, margin: '0 0 8px 0', fontSize: '14px', color: '#374151' }}>
                Paste the code into any page on your website. Great spots include:
              </Text>
              <Text style={bulletText}>&#10003; Your homepage footer or sidebar</Text>
              <Text style={bulletText}>&#10003; Your Contact or About page</Text>
              <Text style={bulletText}>&#10003; Your email signature</Text>
              <Text style={{ ...bulletText, marginBottom: '0' }}>&#10003; A "credentials" or "trust" section</Text>
            </Section>

            {/* Step 3 */}
            <Section style={{ ...stepSection, borderBottom: 'none', marginBottom: '0', paddingBottom: '0' }}>
              <Text style={stepNumber}>Step 3 — Click to verify it works</Text>
              <Text style={{ ...text, margin: '0', fontSize: '14px', color: '#374151' }}>
                After adding the badge, click it to confirm it links to your profile at:{' '}
                <Link href={profileUrl} style={{ color: '#4f46e5' }}>{profileUrl}</Link>
              </Text>
            </Section>
          </Section>

          <Text style={{ ...text, fontSize: '14px', color: '#6b7280', margin: '0 40px 24px' }}>
            You can always find your badge code again in your dashboard at any time.
          </Text>

          <Section style={buttonSection}>
            <Link href={dashboardUrl} style={button}>
              Go to Dashboard
            </Link>
          </Section>

          <Text style={text}>
            Thank you for being part of Hypnotherapy Finder!
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

const badgeSection = {
  backgroundColor: '#f0fdf4',
  borderRadius: '8px',
  margin: '32px 40px',
  padding: '24px',
  borderLeft: '4px solid #10b981',
};

const badgeHeading = {
  color: '#065f46',
  fontSize: '18px',
  fontWeight: 'bold' as const,
  margin: '0 0 12px 0',
};

const stepSection = {
  borderBottom: '1px solid #d1fae5',
  marginBottom: '20px',
  paddingBottom: '20px',
};

const stepNumber = {
  color: '#065f46',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  margin: '0 0 8px 0',
};

const bulletText = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 4px 0',
};

const codeSection = {
  backgroundColor: '#1e293b',
  borderRadius: '6px',
  padding: '12px 16px',
  margin: '8px 0 16px 0',
};

const codeText = {
  color: '#e2e8f0',
  fontSize: '12px',
  fontFamily: 'monospace',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre' as const,
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
