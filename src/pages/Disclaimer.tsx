import LegalPage, { LegalLink, type LegalSection } from '../components/LegalPage';

const LEGAL_EFFECTIVE = '16 October 2026';
const LEGAL_UPDATED = '16 October 2026';

const sections: LegalSection[] = [
  {
    title: 'Purpose of this website',
    body: (
      <p>
        This website gives general information about Cashstream Advisors and our areas of practice: international
        taxation, tax litigation, FEMA advisory, foreign business setup, Indian company compliance and bookkeeping.
        It is not an advertisement, a solicitation or an invitation to engage us, in line with the rules of the
        Institute of Chartered Accountants of India (ICAI) on how Chartered Accountants may present themselves.
      </p>
    ),
  },
  {
    title: 'No solicitation, no advertising',
    body: (
      <p>
        In line with the ICAI Code of Ethics, nothing on this website is designed to solicit clients or advertise
        our services. If any content is found to conflict with ICAI's guidelines, we will change it. Anyone who
        wishes to engage us does so on their own initiative.
      </p>
    ),
  },
  {
    title: 'No ratings, reviews or testimonials',
    highlighted: true,
    body: (
      <p>
        Following ICAI's restrictions, this website does not show, and will not show, star ratings, review scores,
        client testimonials or client names or logos, on this page or anywhere else. Case studies on this site
        describe the nature of past work in general, anonymised terms. They are not testimonials or endorsements.
      </p>
    ),
  },
  {
    title: 'Not a substitute for professional advice',
    body: (
      <p>
        Tax, FEMA and regulatory matters depend on the facts. General information on this site cannot take your
        particular facts into account. It is not a substitute for personal advice from a direct consultation and a
        written engagement. If you act, or choose not to act, based only on this website, you do so at your own
        risk.
      </p>
    ),
  },
  {
    title: 'No advisor-client relationship',
    body: (
      <p>
        Browsing this website, reading it or submitting a consultation request does not create an advisor-client
        relationship or a duty of confidentiality on our part. That begins only when an engagement is agreed in
        writing. See our <LegalLink to="/terms-and-conditions/">Terms &amp; Conditions</LegalLink>.
      </p>
    ),
  },
  {
    title: 'Accuracy and currency of information',
    body: (
      <p>
        We take reasonable care to keep this site accurate, but tax, FEMA and company law change often, sometimes
        faster than a website can be updated. Where this site and current law differ, the law applies. Please
        confirm anything important with us before you rely on it.
      </p>
    ),
  },
  {
    title: 'External links',
    body: (
      <p>
        Where this site links to other sites, such as government portals or regulators, we do not control them and
        are not responsible for their content or availability. A link does not mean we endorse the site beyond the
        context in which it is mentioned.
      </p>
    ),
  },
  {
    title: 'Limitation of liability',
    body: (
      <p>
        To the extent the law allows, Cashstream Advisors accepts no liability for loss arising from reliance on
        this website's general content, as distinct from advice given within a written engagement. See our{' '}
        <LegalLink to="/terms-and-conditions/">Terms &amp; Conditions</LegalLink> for the full limitation of
        liability.
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

export default function Disclaimer() {
  return (
    <LegalPage
      title="Disclaimer"
      metaTitle="Disclaimer | Cash Stream Advisors"
      metaDescription="Important information about the nature and limits of the content on this website."
      path="/disclaimer/"
      effectiveDate={LEGAL_EFFECTIVE}
      updatedDate={LEGAL_UPDATED}
      inShort={
        <>
          The content here is general information, not advice for your situation. We do not show reviews, ratings
          or testimonials, in line with ICAI rules. Reading this site does not make you our client.
        </>
      }
      sections={sections}
      alsoSee={
        <>
          Also see: <LegalLink to="/privacy-policy/">Privacy Policy</LegalLink> and{' '}
          <LegalLink to="/terms-and-conditions/">Terms &amp; Conditions</LegalLink>.
        </>
      }
    />
  );
}
