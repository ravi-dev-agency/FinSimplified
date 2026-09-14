export type LegalDoc = {
  slug: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

/**
 * Placeholder wording. Have these reviewed before you go live —
 * they are not a substitute for legal advice.
 */
export const legalDocs: LegalDoc[] = [
  {
    slug: "disclaimer",
    title: "Financial education disclaimer",
    intro:
      "FinSimplified publishes financial education. It is not financial advice.",
    sections: [
      {
        heading: "Not advice",
        body: [
          "Nothing on this site is personalised financial, investment, tax or legal advice. We do not know your circumstances, and general information cannot account for them.",
          "We are not registered with SEBI as an investment adviser or research analyst, and we do not distribute or sell financial products.",
        ],
      },
      {
        heading: "Calculators",
        body: [
          "Calculator results are illustrative estimates produced from the assumptions you enter. They are not projections, guarantees, or predictions of what you will receive.",
          "Real outcomes differ because markets are not steady, and because fees, exit loads, taxes and inflation are usually not included.",
        ],
      },
      {
        heading: "Market risk",
        body: [
          "Investments carry risk, including the possible loss of the amount invested. Past performance does not guarantee future results.",
          "Consider speaking to a qualified, registered adviser before making financial decisions.",
        ],
      },
      {
        heading: "Accuracy",
        body: [
          "Indian tax, insurance and regulatory rules change. We try to keep pages current, but we cannot guarantee that every page reflects the latest position.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy policy",
    intro: "What we collect, which is as little as we can manage.",
    sections: [
      {
        heading: "Calculator inputs",
        body: [
          "Numbers you type into calculators are processed in your browser and are not sent to us or stored on our servers.",
        ],
      },
      {
        heading: "Analytics",
        body: [
          "We may collect anonymous usage statistics to understand which pages help people. Replace this section with your actual analytics provider and its data practices before publishing.",
        ],
      },
      {
        heading: "Contact",
        body: ["Add a contact address here before you go live."],
      },
    ],
  },
];
