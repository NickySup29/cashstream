import LegalPage, { LegalLink, type LegalSection } from '../components/LegalPage';

const LEGAL_EFFECTIVE = '16 October 2026';
const LEGAL_UPDATED = '16 October 2026';

const sections: LegalSection[] = [
  {
    title: 'Acceptance of these terms',
    body: (
      <p>
        By using this website you agree to these Terms &amp; Conditions. If you do not agree, please do not use the
        site. These terms cover use of the website itself. Once you become a client, a separate engagement letter
        governs our professional services.
      </p>
    ),
  },
  {
    title: 'Nature of this website',
    body: (
      <p>
        This website gives general information about the services of Cashstream Advisors in international
        taxation, tax litigation, FEMA advisory, foreign business setup, Indian company compliance and
        bookkeeping.{' '}
        <strong>
          Nothing on this website is professional advice, and no advisor-client relationship is created by
          browsing the site, sending a message or submitting a consultation request.
        </strong>{' '}
        That relationship, and the duties that come with it, begins only when an engagement is agreed in writing.
      </p>
    ),
  },
  {
    title: 'No guarantee of outcomes',
    body: (
      <p>
        Tax and regulatory outcomes depend on the facts. Nothing on this website, including case studies, FAQ
        answers and explanations of how a provision works, is a guarantee or prediction of any result for you.
        Case studies are illustrative and anonymised, and do not mean a similar result will follow in any other
        matter.
      </p>
    ),
  },
  {
    title: 'Accuracy of information',
    body: (
      <p>
        We take reasonable care to keep this site accurate and current, but tax law, FEMA rules and company law
        change often, and we cannot promise every page reflects the latest change at every moment. Where this site
        and current law differ, the law applies. Please confirm anything important with us before you rely on it.
      </p>
    ),
  },
  {
    title: 'Intellectual property',
    body: (
      <p>
        The text, design, graphics and structure of this website belong to Cashstream Advisors unless credited
        otherwise. You may not copy, distribute or use them commercially without our written permission.
      </p>
    ),
  },
  {
    title: 'Limitation of liability',
    body: (
      <p>
        To the fullest extent the law allows, Cashstream Advisors is not liable for any loss or damage arising from
        your use of, or reliance on, this website's content. This does not limit any duty we owe you under a
        separate written engagement letter, or any liability that cannot be excluded by law.
      </p>
    ),
  },
  {
    title: 'Visitors from outside India',
    body: (
      <p>
        This site can be viewed from other countries. Visiting it from outside India does not change which law
        governs these terms (Section 9) and does not, by itself, create a professional relationship under any
        other country's rules.
      </p>
    ),
  },
  {
    title: 'No solicitation',
    body: (
      <p>
        This website is for general information only. It is not an advertisement or solicitation, in line with
        the Code of Ethics of the Institute of Chartered Accountants of India. Anyone who contacts us does so on
        their own initiative. See our <LegalLink to="/disclaimer/">Disclaimer</LegalLink>.
      </p>
    ),
  },
  {
    title: 'Governing law and jurisdiction',
    body: (
      <p>
        These terms are governed by the laws of India. Any dispute arising from your use of this website is
        subject to the jurisdiction of the courts at Chennai, India.
      </p>
    ),
  },
  {
    title: 'Changes to these terms',
    body: (
      <p>
        We may update these terms from time to time. If you keep using the website after a change, you accept the
        updated terms. The date at the top of this page shows when they were last changed.
      </p>
    ),
  },
  {
    title: 'Contact us',
    body: (
      <p>
        Cashstream Advisors, No. 729/2, Flat 503, 5th Floor, Tamilnadu Towers, Chennai 600081, India.{' '}
        <a href="mailto:contact@cashstreamadvisors.com">contact@cashstreamadvisors.com</a>
      </p>
    ),
  },
];

export default function TermsAndConditions() {
  return (
    <LegalPage
      title="Terms & Conditions"
      metaTitle="Terms & Conditions | Cash Stream Advisors"
      metaDescription="The terms that apply when you use the Cash Stream Advisors website."
      path="/terms-and-conditions/"
      effectiveDate={LEGAL_EFFECTIVE}
      updatedDate={LEGAL_UPDATED}
      inShort={
        <>
          This site gives general information, not advice. Using it does not make you our client. A client
          relationship starts only when we agree it in writing. These terms are governed by Indian law and the
          courts at Chennai.
        </>
      }
      sections={sections}
      alsoSee={
        <>
          Also see: <LegalLink to="/privacy-policy/">Privacy Policy</LegalLink> and{' '}
          <LegalLink to="/disclaimer/">Disclaimer</LegalLink>.
        </>
      }
    />
  );
}
