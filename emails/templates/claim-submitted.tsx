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

interface ClaimSubmittedEmailProps {
  practitionerName: string;
  claimantName: string;
  city: string;
  state: string;
  website?: string;
  pixelUrl: string;
  dashboardUrl: string;
}

export default function ClaimSubmittedEmail({
  practitionerName = 'Dr. Smith',
  claimantName = 'John Doe',
  city = 'Los Angeles',
  state = 'California',
  website,
  pixelUrl = 'https://hypnotherapy-finder.com/api/verify-pixel/00000000-0000-0000-0000-000000000000',
  dashboardUrl = 'https://hypnotherapy-finder.com/dashboard',
}: ClaimSubmittedEmailProps) {
  const embedCode = `<img src="${pixelUrl}" alt="Hypnotherapy Finder listing pending verification" width="220" height="56" />`;

  return (
    <Html>
      <Head />
      <Preview>One more step — verify you own {practitionerName} to get approved</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Claim Received</Heading>

          <Text style={text}>Hi {claimantName},</Text>

          <Text style={text}>
            We've received your claim for <strong>{practitionerName}</strong> in {city}, {state}. Before we approve
            it, we need to confirm you actually control the business behind this listing — this keeps spam and fake
            profiles off Hypnotherapy Finder.
          </Text>

          <Section style={infoSection}>
            <Text style={infoText}><strong>Status:</strong> Pending verification</Text>
            {website && <Text style={infoText}><strong>Website on file:</strong> {website}</Text>}
          </Section>

          <Section style={pixelSection}>
            <Text style={pixelHeading}>Verify Ownership — 2 Simple Steps</Text>
            <Text style={{ ...text, margin: '0 0 20px 0' }}>
              Add this small pixel to {website || 'your website'}. As soon as we detect it loading from there, your
              claim will be fast-tracked for approval.
            </Text>

            <Section style={stepSection}>
              <Text style={stepNumber}>Step 1 — Copy this code</Text>
              <Section style={codeSection}>
                <Text style={codeText}>{embedCode}</Text>
              </Section>
            </Section>

            <Section style={{ textAlign: 'center' as const, margin: '8px 0 20px 0' }}>
              <Text style={{ ...text, fontSize: '13px', color: '#888', margin: '0 0 10px 0' }}>This is what it looks like:</Text>
              <img src={pixelUrl} alt="Hypnotherapy Finder listing pending verification" width={220} height={56} />
            </Section>

            <Section style={{ ...stepSection, borderBottom: 'none', marginBottom: '0', paddingBottom: '0' }}>
              <Text style={stepNumber}>Step 2 — Paste it anywhere on your site</Text>
              <Text style={{ ...text, margin: '0', fontSize: '14px', color: '#374151' }}>
                Your homepage footer, About page, or contact page all work. Once we see it there, an admin will do a
                final review and approve your listing — you'll then get your full "Verified Practitioner" badge to
                replace this one.
              </Text>
            </Section>
          </Section>

          <Text style={{ ...text, fontSize: '14px', color: '#6b7280', margin: '0 40px 24px' }}>
            You can check your verification status any time from your dashboard.
          </Text>

          <Section style={buttonSection}>
            <Link href={dashboardUrl} style={button}>
              Go to Dashboard
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

const pixelSection = {
  backgroundColor: '#fffbeb',
  borderRadius: '8px',
  margin: '32px 40px',
  padding: '24px',
  borderLeft: '4px solid #f59e0b',
};

const pixelHeading = {
  color: '#92400e',
  fontSize: '18px',
  fontWeight: 'bold' as const,
  margin: '0 0 12px 0',
};

const stepSection = {
  borderBottom: '1px solid #fde68a',
  marginBottom: '20px',
  paddingBottom: '20px',
};

const stepNumber = {
  color: '#92400e',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  margin: '0 0 8px 0',
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
