import LegalPage, { LegalLink, type LegalSection } from '../components/LegalPage';

const LEGAL_EFFECTIVE = '16 October 2026';
const LEGAL_UPDATED = '16 October 2026';

const sections: LegalSection[] = [
  {
    title: 'Who this policy covers',
    body: (
      <p>
        This policy explains how Cashstream Advisors ("Cash Stream Advisors", "we", "us"), a firm of Chartered
        Accountants at No. 729/2, Flat 503, 5th Floor, Tamilnadu Towers, Chennai 600081, collects, uses, stores and
        protects personal data from anyone who visits this website, submits a consultation request or contacts us
        through it, wherever you are based. It applies alongside, not instead of, the confidentiality duties we owe
        you once you become a client, which are governed by our engagement letter.
      </p>
    ),
  },
  {
    title: 'What we collect',
    body: (
      <>
        <ul>
          <li>
            <strong>Contact details you give us:</strong> name, email, phone or WhatsApp number, and anything you
            write in a consultation request or contact form.
          </li>
          <li>
            <strong>Details about your query:</strong> whatever you tell us about your tax or FEMA situation, so we
            can prepare before we speak.
          </li>
          <li>
            <strong>Technical and usage data:</strong> IP address, browser type, pages visited and similar data
            collected automatically by Google Analytics.
          </li>
          <li>
            <strong>Cookies:</strong> see Section 6.
          </li>
        </ul>
        <p>
          We do not ask for sensitive documents such as PAN, passport or financial statements through the website.
          Those are exchanged securely once an engagement begins.
        </p>
      </>
    ),
  },
  {
    title: 'Why we collect it',
    body: (
      <>
        <ul>
          <li>To respond to your consultation request and understand what you need.</li>
          <li>To operate and improve this website.</li>
          <li>To send you information you have specifically asked for.</li>
          <li>To meet our legal and professional obligations.</li>
        </ul>
        <p>We do not sell personal data, and we do not share it with third parties for their own marketing.</p>
      </>
    ),
  },
  {
    title: 'Legal basis for processing',
    body: (
      <>
        <p>
          We process the data you submit because you have given it to us for a specific purpose (requesting a
          consultation) and because it is needed to respond to that request.
        </p>
        <p>
          If you are in the EU or UK, our legal basis is your consent and our legitimate interest in responding to
          your enquiry. If you are in India, the Information Technology Act, 2000 and the IT (Reasonable Security
          Practices and Sensitive Personal Data or Information) Rules, 2011 apply today, and the Digital Personal
          Data Protection Act, 2023 will apply fully from 13 May 2027, including its consent and purpose-limitation
          requirements.
        </p>
      </>
    ),
  },
  {
    title: 'How long we keep it',
    body: (
      <p>
        We keep client records and consultation requests for seven years, in line with the record-keeping practice
        we follow as Chartered Accountants. After that we delete or anonymise them, unless the law requires us to
        keep them longer. Website analytics data is kept for the period set in our Google Analytics account.
      </p>
    ),
  },
  {
    title: 'Cookies and analytics',
    body: (
      <p>
        This site uses Google Analytics to understand how visitors use it (pages viewed, time on site, general
        location). We do not use any other analytics, advertising or tracking tools on this site. Analytics data is
        aggregated and does not identify you personally. You can block or delete cookies in your browser settings,
        or install Google's opt-out add-on; doing so does not stop you from using the site.
      </p>
    ),
  },
  {
    title: 'Cross-border data transfer',
    body: (
      <p>
        Google Analytics processes data on servers that may be outside India. Where data is processed outside
        India, we rely on the provider's safeguards and do not transfer it for any other purpose.
      </p>
    ),
  },
  {
    title: 'Your rights',
    body: (
      <>
        <p>Depending on where you are, you may have the right to:</p>
        <ul>
          <li>
            <strong>Access</strong> the personal data we hold about you.
          </li>
          <li>
            <strong>Correct</strong> inaccurate or incomplete data.
          </li>
          <li>
            <strong>Delete</strong> your data, subject to any legal or professional duty to keep it.
          </li>
          <li>
            <strong>Withdraw consent</strong> you previously gave.
          </li>
          <li>
            <strong>Complain</strong> to the relevant authority, such as the Data Protection Board of India once the
            DPDPA is in force, or the authority in your own country.
          </li>
        </ul>
        <p>
          To use any of these rights, write to <a href="mailto:nihar@cashstreamadvisors.com">nihar@cashstreamadvisors.com</a>.
        </p>
      </>
    ),
  },
  {
    title: 'Data security',
    body: (
      <p>
        We take reasonable technical and organisational steps to protect personal data against unauthorised access,
        loss or misuse.
      </p>
    ),
  },
  {
    title: "Children's data",
    body: (
      <p>
        This website is not directed at children, and we do not knowingly collect personal data from anyone under
        18. If you believe a minor has sent us data, write to us and we will deal with it promptly.
      </p>
    ),
  },
  {
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this policy from time to time, especially as the DPDPA comes into force in phases up to May
        2027. The date at the top of this page shows when it was last changed.
      </p>
    ),
  },
  {
    title: 'Contact us',
    body: (
      <p>
        Cashstream Advisors, No. 729/2, Flat 503, 5th Floor, Tamilnadu Towers, Chennai 600081, India.{' '}
        <a href="mailto:nihar@cashstreamadvisors.com">nihar@cashstreamadvisors.com</a>
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      metaTitle="Privacy Policy | Cash Stream Advisors"
      metaDescription="How Cash Stream Advisors collects, uses and protects personal data submitted through this website."
      path="/privacy-policy/"
      effectiveDate={LEGAL_EFFECTIVE}
      updatedDate={LEGAL_UPDATED}
      inShort={
        <>
          We collect only what you send us and basic site analytics. We do not sell your data. We keep client
          records for seven years. You can ask us to correct or delete your data at any time by writing to{' '}
          <a href="mailto:nihar@cashstreamadvisors.com">nihar@cashstreamadvisors.com</a>.
        </>
      }
      sections={sections}
      alsoSee={
        <>
          Also see: <LegalLink to="/terms-and-conditions/">Terms &amp; Conditions</LegalLink> and{' '}
          <LegalLink to="/disclaimer/">Disclaimer</LegalLink>.
        </>
      }
    />
  );
}
