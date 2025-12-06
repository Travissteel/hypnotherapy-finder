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

interface WelcomeEmailProps {
  name: string;
  loginUrl: string;
}

export default function WelcomeEmail({
  name = 'John Doe',
  loginUrl = 'https://hypnotherapy-finder.com/login',
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Hypnotherapy Finder!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Hypnotherapy Finder! 👋</Heading>

          <Text style={text}>Hi {name},</Text>

          <Text style={text}>
            Thank you for joining Hypnotherapy Finder, the premier directory connecting qualified hypnotherapists with clients seeking transformative care.
          </Text>

          <Section style={infoSection}>
            <Text style={infoTitle}>What you can do:</Text>
            <Text style={infoText}>
              ✓ Claim your practitioner listing
            </Text>
            <Text style={infoText}>
              ✓ Manage your professional profile
            </Text>
            <Text style={infoText}>
              ✓ Update your contact information
            </Text>
            <Text style={infoText}>
              ✓ Enhance your visibility to clients
            </Text>
          </Section>

          <Text style={text}>
            Ready to get started? Log in to your account and claim your listing.
          </Text>

          <Section style={buttonSection}>
            <Link href={loginUrl} style={button}>
              Log In to Your Account
            </Link>
          </Section>

          <Text style={text}>
            If you have any questions or need assistance, our support team is here to help.
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

const infoTitle = {
  color: '#1e40af',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
};

const infoText = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '28px',
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
