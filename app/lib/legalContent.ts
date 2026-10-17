export type LegalBlock =
  | { p: string; h?: undefined; ul?: undefined }
  | { h: string; p?: undefined; ul?: undefined }
  | { ul: string[]; p?: undefined; h?: undefined };

export type LegalSection = {
  id: string;
  title: string;
  body: LegalBlock[];
};

export const EFFECTIVE_DATE = "October 17, 2026";
export const COMPANY_FULL = "Rovestacks Technologies Limited";
export const RC_NUMBER = "9619939";

export const PRIVACY_SECTIONS: LegalSection[] = [
  { id: "scope", title: "1. Introduction & Scope", body: [
    { p: `This Privacy Policy is issued by ${COMPANY_FULL} ("Rovestacks," "the Company," "we," "our," or "us"), a company duly incorporated under the Companies and Allied Matters Act and registered with the Corporate Affairs Commission (CAC) of Nigeria under RC ${RC_NUMBER}. It describes how we collect, use, disclose, and safeguard information in connection with Rovenet, our classified and digital marketplace mobile application, and any other digital product or service we may operate under the Rovestacks name (each, a "Service").` },
    { p: "By creating an account, browsing listings, or otherwise using a Service, you acknowledge that you have read and understood this Policy. If you do not agree with our practices, please discontinue use of the Service." },
  ]},
  { id: "collect", title: "2. Information We Collect", body: [
    { h: "2.1 Information you provide directly" },
    { ul: [
      "Account details, including full name, phone number, email address, and password.",
      "Profile information, such as a display photo, city or local area, and optional business or seller details.",
      "Listing content, including photographs, descriptions, prices, and category information you submit for products, services, or job posts.",
      "Community content, including posts, replies, poll votes, gifts, and the communities you create or join.",
      "VTU redemption details supplied when requesting to redeem your earnings.",
      "Identity verification information, such as a government-issued identification document or National Identification Number (NIN), submitted for identity verification through our identity verification partner, currently Dojah, where required by us or by our payment or regulatory partners.",
      "Correspondence you send us, including support tickets and dispute reports.",
    ]},
    { h: "2.2 Information collected automatically" },
    { ul: [
      "Device information, including device type, operating system, unique device identifiers, and application version.",
      "Usage data, including listings viewed, community activity, campaigns completed, sponsored videos watched, game activity, session duration, and general interaction patterns.",
      "Approximate location, where permitted, used to surface relevant local listings.",
      "Log data, including IP address, access timestamps, and diagnostic or crash reports.",
    ]},
    { h: "2.3 Information from third parties" },
    { ul: [
      "Confirmation of successful or failed payments from our payment service providers, currently Paystack and Opay.",
      "Confirmation of VTU purchases or transfers from our VTU service provider, currently VTPass, where you elect to redeem earnings in that form.",
      "Confirmation of identity verification results from our identity verification partner, currently Dojah, where identity verification is required to access certain features.",
      "Basic account information from Google, where you choose to register or sign in using Google Sign-In, as described in Section 3 below.",
    ]},
  ]},
  { id: "google-signin", title: "3. Google Sign-In & Google User Data", body: [
    { p: "Rovenet offers the option to create an account or sign in using Google Sign-In. Where you choose this option, Google shares certain basic account information with us \u2014 limited to your name, email address, and profile photograph \u2014 solely for the purpose of creating and authenticating your Rovenet account." },
    { p: "We do not request access to your Gmail, Google Drive, Google Contacts, or any other Google service beyond the basic profile information necessary for sign-in." },
    { p: "Google user data obtained through Google Sign-In is used exclusively to operate and improve the authentication features of Rovenet. It is not used for advertising, sold, or transferred to third parties, except as necessary to provide the Service, comply with the law, or protect against fraud, and always subject to the limitations described in this Policy." },
    { p: "Our use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements." },
    { p: "This Privacy Policy is linked on our website's homepage and prominently displayed within the Rovenet application. We will notify you in-app or by email of any material change to how we use Google user data before such change takes effect." },
  ]},
  { id: "basis", title: "4. Legal Basis for Processing", body: [
    { p: "We process personal data on one or more of the following bases, consistent with the Nigeria Data Protection Act, 2023: performance of the contract formed by our Terms & Conditions when you register and use a Service; compliance with a legal obligation, including obligations imposed by our payment, identity verification, and VTU partners or by financial regulation; our legitimate interests in operating, securing, and improving our Services, provided those interests do not override your rights; and, where required, your explicit consent, such as for Google Sign-In, optional location access, or marketing communications." },
  ]},
  { id: "use", title: "5. How We Use Your Information", body: [
    { ul: [
      "To create, verify, and administer your account, including via Google Sign-In where you choose that option.",
      "To publish your listings and enable other users to search for and respond to them.",
      "To operate Communities, including displaying your posts and replies to other members, moderating content, and handling reports.",
      "To process payments for promotion packages, process task deposits, and process redemption requests.",
      "To verify your identity through Dojah where required to access certain features, such as WhatsApp Status Ad Marketing.",
      "To operate the in-app games, Social Hunt, and WhatsApp Status Ad Marketing features, including maintaining leaderboards and seasons and verifying genuine completion of campaigns before releasing payment.",
      "To detect, investigate, and prevent fraud, fake engagement, abuse of the rewards system, and other violations of our Terms & Conditions.",
      "To communicate with you regarding your account, transactions, and support requests.",
      "To maintain, secure, and improve the performance and safety of our Services.",
      "To comply with applicable law, regulation, and lawful requests from competent authorities.",
    ]},
  ]},
  { id: "share", title: "6. How We Share Your Information", body: [
    { p: "We do not sell personal data. We disclose information only in the following circumstances:" },
    { ul: [
      "With other users, limited to what you choose to include in a public listing, profile, or Community post. Content you post in a public community may be visible to anyone; content in a private community is visible to its members.",
      "With our payment service providers (Paystack, Opay), solely to process promotion-package payments and task deposits.",
      "With our VTU provider (VTPass), solely to fulfil a VTU redemption you request.",
      "With our identity verification partner (Dojah), solely to verify your identity where required to access certain features, such as WhatsApp Status Ad Marketing.",
      "With Google, solely as necessary to authenticate your account where you choose to sign in using Google Sign-In.",
      "With service providers supporting hosting, analytics, or customer support, bound by confidentiality obligations.",
      "Where required by law, regulation, court order, or to protect the rights, safety, or property of Rovestacks, our users, or the public.",
      "In connection with a merger, acquisition, financing, or sale of assets, subject to continued protection consistent with this Policy.",
    ]},
  ]},
  { id: "transfers", title: "7. International Data Transfers", body: [
    { p: "As Rovestacks extends its Services beyond Nigeria, personal data may be processed in, or transferred to, other African jurisdictions or to service providers located outside Nigeria. Where this occurs, we take reasonable steps to ensure such transfers are subject to adequate safeguards consistent with the Nigeria Data Protection Act and applicable regulations." },
  ]},
  { id: "retention", title: "8. Data Retention", body: [
    { p: "We retain account and transaction information for as long as your account remains active and for a reasonable period thereafter to satisfy legal, accounting, fraud-prevention, and payment-partner recordkeeping requirements. Where you delete your account, we remove or anonymise personal data we no longer need, but transaction, wallet, and redemption records may be retained for as long as required by law, fraud prevention, and our payment and VTU partners. Listing content may be archived or removed once a listing is closed, expired, or withdrawn, and Community posts you made may be removed or shown as anonymous after account deletion." },
  ]},
  { id: "rights", title: "9. Your Rights", body: [
    { p: "Subject to applicable law, you have the right to:" },
    { ul: [
      "Access the personal data we hold about you and request a copy of it.",
      "Request correction of inaccurate or incomplete personal data.",
      "Request deletion of your account and associated personal data, subject to information we are legally required to retain.",
      "Object to, or request restriction of, certain processing activities.",
      "Request portability of certain personal data, where technically feasible.",
      "Withdraw consent at any time where processing is based on consent, such as Google Sign-In or location access.",
      "Lodge a complaint with the Nigeria Data Protection Commission (NDPC) or another competent supervisory authority.",
    ]},
    { p: "Requests may be submitted using the contact details in Section 14. We will respond within the timeframes required by applicable law." },
  ]},
  { id: "cookies", title: "10. Cookies and Similar Technologies", body: [
    { p: "Our website and related digital properties may use cookies and similar technologies to remember preferences, understand aggregate usage, and keep you signed in. You can control cookies through your browser settings; disabling certain cookies may affect site functionality." },
  ]},
  { id: "security", title: "11. Data Security", body: [
    { p: "We maintain administrative, technical, and physical safeguards designed to protect personal data, including encrypted transmission of payment-related information, passcode-protected app access, and restricted internal access to sensitive records. No method of transmission or storage is completely secure, and we cannot guarantee absolute security." },
  ]},
  { id: "children", title: "12. Children's Privacy", body: [
    { p: "Our Services are not directed at, and are not intended for use by, individuals under the age of 18. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us so that we may take appropriate action." },
  ]},
  { id: "automated", title: "13. Automated Verification", body: [
    { p: "Certain features, such as eligibility checks for WhatsApp Status Ad Marketing, may involve automated verification of criteria such as WhatsApp status audience size or identity verification results from Dojah. Where a decision materially affects your access to earnings, you may request human review by contacting support." },
  ]},
  { id: "contact-privacy", title: "14. Contact Us", body: [
    { ul: ["Email: privacy@rovestacks.com", `Company: ${COMPANY_FULL} (RC ${RC_NUMBER}), registered with the Corporate Affairs Commission, Nigeria`] },
  ]},
  { id: "changes-privacy", title: "15. Changes to This Policy", body: [
    { p: "We may update this Policy from time to time, including to reflect changes in how we use Google user data or data processed through our identity verification partner. Material changes will be communicated in-app or by email prior to becoming effective. Continued use of a Service after an update constitutes acceptance of the revised Policy." },
  ]},
];

export const TERMS_SECTIONS: LegalSection[] = [
  { id: "intro", title: "1. Introduction & Acceptance", body: [
    { p: `These Terms & Conditions ("Terms") constitute a binding agreement between you and ${COMPANY_FULL} ("Rovestacks," "the Company"), a company duly incorporated under the Companies and Allied Matters Act and registered with the Corporate Affairs Commission (CAC) of Nigeria under RC ${RC_NUMBER}, governing your access to and use of Rovenet and any other product or service Rovestacks may operate (each, a "Service"). By creating an account or otherwise using a Service, you agree to be bound by these Terms. If you do not agree, you must not access or use the Service.` },
  ]},
  { id: "definitions", title: "2. Definitions", body: [
    { ul: [
      `"Rovestacks" means the company operating the Service.`,
      `"Rovenet" means the classified and digital marketplace mobile application.`,
      `"User," "you," or "your" means any individual or entity that registers for or uses the Service.`,
      `"Listing" means any product, service, or job posting submitted by a User.`,
      `"Campaign" means a sponsored WhatsApp status advertisement made available through the WhatsApp Status Ad Marketing feature.`,
      `"Community" means a public or private group within Rovenet in which Users can post, reply, vote in polls, and interact.`,
      `"Social Hunt" means the feature through which Users watch sponsored videos from brands and receive in-app credits.`,
      `"Credits" and "Rewards" mean the in-app balances Users may earn or receive through Rovenet, as described in these Terms.`,
    ]},
  ]},
  { id: "eligibility", title: "3. Eligibility", body: [
    { p: "You must be at least 18 years old and capable of forming a binding contract under applicable law to register for or use the Service. By using the Service, you represent and warrant that you meet these requirements." },
  ]},
  { id: "description", title: "4. Description of Service", body: [
    { p: "Rovenet is a classified and digital marketplace platform connecting buyers and sellers of products, services, and jobs across Nigeria, with the intention of eventual expansion across Africa. In addition to classifieds, Rovenet offers Communities, WhatsApp Status Ad Marketing, Social Hunt, and in-app games under a single user account. For classifieds, Rovenet functions as a communication channel: it allows Users to post Listings and allows other Users to view, respond to, and negotiate directly with Listing owners." },
    { ul: [
      "Rovenet does not process checkout, hold inventory, or facilitate delivery of goods or services listed on the platform.",
      "All negotiation, payment between buyers and sellers, and arrangement of pickup or delivery occurs directly between the parties, outside of Rovenet.",
      "Rovestacks is not a party to, and assumes no responsibility for, any transaction concluded between a buyer and a seller as a result of a Listing.",
    ]},
  ]},
  { id: "account", title: "5. Account Registration and Security", body: [
    { p: "You are responsible for maintaining the confidentiality of your account credentials, including any passcode used to secure the application, and for all activity that occurs under your account. You agree to notify us promptly of any unauthorized use of your account." },
    { p: "You may also register or sign in using Google Sign-In. Where you do so, you authorize us to receive basic Google account information (your name, email address, and profile photograph) for the purpose of creating and authenticating your account, in accordance with our Privacy Policy." },
  ]},
  { id: "identity-verification", title: "6. Identity Verification (KYC)", body: [
    { p: "Access to certain features of Rovenet, including WhatsApp Status Ad Marketing, may require you to complete identity verification. Identity verification is performed through our identity verification partner, currently Dojah, and may involve verifying information such as your name, government-issued identification, or National Identification Number (NIN) against official records." },
    { p: "Rovestacks may restrict, delay, or suspend access to features requiring identity verification where such verification cannot be completed, fails, or reveals information inconsistent with your account details." },
  ]},
  { id: "listings", title: "7. Listings and Content Standards", body: [
    { p: "Categories include, without limitation, Vehicles, Property, Phones & Tablets, Electronics, Home & Furniture, Beauty & Personal, Services, Repair & Construction, Commercial Equipment, Leisure & Activities, Babies & Kids, Food & Agriculture, Animals & Pets, Jobs, and Fashion." },
    { ul: [
      "You are solely responsible for the accuracy, legality, and quality of any Listing you submit.",
      "Rovestacks may remove any Listing that violates these Terms, applicable law, or that we reasonably believe is fraudulent, misleading, or unsafe.",
      "Posting a Listing is free of charge. Sellers may optionally purchase promotion packages to increase a Listing's visibility.",
    ]},
  ]},
  { id: "communities", title: "8. Communities and User Content", body: [
    { p: "Rovenet includes Communities, in which Users may post, reply, vote in polls, and interact with other members. Communities may be public or private, and Rovestacks may restrict who can create or moderate them." },
    { ul: [
      "You are solely responsible for content you post in a Community, and you grant Rovestacks the licence described in Section 14 to host and display it.",
      "Rovestacks and community moderators may remove content, restrict members, or close a Community that violates these Terms or applicable law, and may act on reports from other Users.",
      "Where the app allows Users to send gifts to authors of posts, gifts are made using in-app Rewards, are final once sent, and are not refundable. Rewards received as gifts are subject to the Earnings and Redemption provisions of these Terms.",
      "Views expressed in a Community are those of the User who posted them and not of Rovestacks.",
    ]},
  ]},
  { id: "promotion", title: "9. Promotion Packages and Payment", body: [
    { p: "Sellers may purchase promotion packages through a supported payment gateway (currently Paystack and Opay) to feature or boost a Listing for a defined period. Prices are displayed prior to payment. Payments for promotion packages are non-refundable once processed, as further described in our Refund Policy." },
  ]},
  { id: "whatsapp-ads", title: "10. WhatsApp Status Ad Marketing", body: [
    { p: `Rovenet includes a WhatsApp status advertising feature connecting brands and sponsors ("Sponsors") with Users who post sponsored ad campaigns to their personal WhatsApp status ("Creators").` },
    { ul: [
      "A Sponsor must fund a Campaign by depositing the campaign budget through a supported payment gateway before the Campaign is published to Creators.",
      "Once approved and funded, Campaign payments are non-refundable, as further described in our Refund Policy.",
      "Creators must genuinely post and maintain Campaign content on their WhatsApp status as instructed. Rovestacks may withhold payment, suspend accounts, or reverse credited earnings where a Campaign posting is reasonably determined to have been fraudulent, including through falsified proof of posting, early removal, or multiple accounts controlled by one person.",
      "Rovestacks reserves the right to review, moderate, or reject any Campaign content, including content that is unlawful, misleading, or violates WhatsApp's own policies.",
    ]},
  ]},
  { id: "games", title: "11. In-App Games, Social Hunt and Rewards", body: [
    { p: "Rovenet offers in-app games, currently including Jump Jump, Trivia, and Ludo, as loyalty and engagement features, with additional games planned from time to time. Some games may run in seasons or ranked formats, may offer a limited number of free plays before Credits are required, and may offer Rewards to top-ranked players, in each case as displayed within the relevant feature. Credits or Rewards earned may be redeemed subject to the rules displayed within the relevant feature and Section 12 below." },
    { p: "Through Social Hunt, Users may watch sponsored videos hosted on third-party platforms such as YouTube or TikTok and receive Credits as shown in the app. Rovestacks may limit, withhold, or reverse Credits where viewing is reasonably determined to be automated, repeated, or otherwise not genuine." },
    { p: "Rovestacks may adjust game mechanics, seasons, Rewards, or availability at its discretion, and may exclude Users who cheat, collude, or exploit defects in a game." },
  ]},
  { id: "earnings", title: "12. Earnings and Redemption", body: [
    { ul: [
      "Users may accumulate earnings through eligible activities, such as completed Campaigns, Social Hunt, in-app games, and Community gifts.",
      "Earnings may be redeemed only as airtime, data, or other VTU products through our VTU partner, currently VTPass.",
      "Redemption requests are subject to identity and account verification and may be delayed or declined where Rovestacks reasonably suspects fraud or a violation of these Terms.",
    ]},
  ]},
  { id: "third-party", title: "13. Third-Party Payment, Verification, and VTU Services", body: [
    { p: "All payments are processed through licensed third-party payment service providers, currently Paystack and Opay; VTU redemptions are processed through VTPass; identity verification is processed through Dojah. Rovestacks does not store your full card or bank login credentials. Rovestacks is not responsible for delays, errors, or service interruptions caused by these third parties once an instruction has been correctly submitted to them." },
  ]},
  { id: "ip", title: "14. Intellectual Property", body: [
    { p: "The Rovestacks and Rovenet names, logos, and all associated trademarks, together with the design, software, and content of the Service (excluding User-submitted content), are the property of Rovestacks or its licensors. By submitting a Listing or other content, you grant Rovestacks a non-exclusive, worldwide, royalty-free licence to host, display, and distribute that content solely for the purpose of operating and promoting the Service." },
  ]},
  { id: "prohibited", title: "15. Prohibited Conduct", body: [
    { ul: [
      "Posting counterfeit, stolen, illegal, or prohibited goods or services.",
      "Creating multiple accounts to manipulate tasks, rewards, referrals, or Listing visibility.",
      "Using bots, scripts, or automated tools to complete Campaigns or interact with the Service.",
      "Harassing, defrauding, or misrepresenting yourself to another User.",
      "Circumventing, disabling, or interfering with security features of the Service, including identity verification.",
      "Posting unlawful, hateful, sexually explicit, or misleading content in a Community, or spamming or harassing other members.",
      "Colluding with other Users, using multiple accounts, or exploiting defects to gain an unfair advantage in games, Social Hunt, or leaderboards.",
    ]},
  ]},
  { id: "suspension", title: "16. Account Suspension and Termination", body: [
    { p: "Rovestacks may suspend or terminate any account, at its discretion, where it reasonably believes these Terms, applicable law, or the policies of our payment, verification, or VTU partners have been violated. Where appropriate, Rovestacks will attempt to notify the affected User of the reason for suspension or termination." },
  ]},
  { id: "liability", title: "17. Disclaimers and Limitation of Liability", body: [
    { p: `The Service is provided on an "as is" and "as available" basis, without warranties of any kind, whether express or implied. To the fullest extent permitted by law, Rovestacks is not liable for any dispute, loss, or damage arising from a transaction between a buyer and seller, from content posted by Users, or from the acts or omissions of third-party payment, verification, or VTU partners. Rovestacks' aggregate liability for any claim arising from your use of the Service shall not exceed the total fees you paid to Rovestacks in the three months preceding the claim.` },
  ]},
  { id: "indemnity", title: "18. Indemnification", body: [
    { p: "You agree to indemnify and hold Rovestacks harmless from any claim, liability, or expense, including reasonable legal fees, arising from your breach of these Terms, your Listings, or your use of the Service." },
  ]},
  { id: "dispute", title: "19. Dispute Resolution and Governing Law", body: [
    { p: "These Terms are governed by the laws of the Federal Republic of Nigeria. Parties shall first attempt to resolve any dispute through good-faith negotiation. Where a dispute cannot be resolved amicably within thirty (30) days, it shall be subject to the exclusive jurisdiction of the courts of Nigeria." },
  ]},
  { id: "general", title: "20. General Provisions", body: [
    { ul: [
      "Severability: if any provision of these Terms is held unenforceable, the remaining provisions remain in full force.",
      "Force majeure: Rovestacks is not liable for delays or failures resulting from causes beyond its reasonable control.",
      "Assignment: Rovestacks may assign these Terms in connection with a merger, acquisition, or sale of assets.",
      "Entire agreement: these Terms, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and Rovestacks regarding the Service.",
    ]},
  ]},
  { id: "changes-terms", title: "21. Changes to These Terms", body: [
    { p: "We may update these Terms from time to time. Material changes will be communicated in-app or by email prior to becoming effective. Continued use of the Service after an update constitutes acceptance of the revised Terms." },
  ]},
  { id: "contact-terms", title: "22. Contact Us", body: [
    { ul: ["Email: legal@rovestacks.com", `Company: ${COMPANY_FULL} (RC ${RC_NUMBER}), registered with the Corporate Affairs Commission, Nigeria`] },
  ]},
];

export const REFUND_SECTIONS: LegalSection[] = [
  { id: "overview", title: "1. Overview", body: [
    { p: `This Refund Policy explains when payments made on Rovenet are, and are not, eligible for a refund. It is issued by ${COMPANY_FULL} (RC ${RC_NUMBER}), registered with the Corporate Affairs Commission of Nigeria, and forms part of, and should be read together with, our Terms & Conditions.` },
  ]},
  { id: "promo-nonrefundable", title: "2. Promotion Package Payments \u2014 Non-Refundable", body: [
    { p: "Payments made by sellers to purchase a promotion package are final and non-refundable once processed, including where:" },
    { ul: [
      "The promoted Listing is sold, removed, or expires before the promotion period ends.",
      "The seller changes their mind after purchasing the promotion.",
      "The seller is dissatisfied with the visibility or results generated by the promotion.",
    ]},
  ]},
  { id: "campaign-nonrefundable", title: "3. Campaign Deposit / Approval Payments \u2014 Non-Refundable", body: [
    { p: "Payments made by Sponsors to fund and approve a WhatsApp status ad Campaign are final and non-refundable once the Campaign has been approved and made available to Creators, including where:" },
    { ul: [
      "The Sponsor is dissatisfied with the volume, quality, or nature of engagement received.",
      "The Sponsor wishes to cancel the Campaign after it has gone live.",
      "The Campaign was fulfilled by Creators in a manner that technically satisfied the stated requirements.",
    ]},
    { p: "Where Rovestacks determines a Campaign was fraudulently fulfilled, Rovestacks may withhold payment to the Creator and, at its discretion, permit the Sponsor to reallocate the affected portion of their deposit to a replacement Campaign in place of a cash refund." },
  ]},
  { id: "errors", title: "4. Erroneous or Duplicate Charges", body: [
    { p: "If you are charged in error, such as a duplicate charge caused by a technical fault, contact us within 14 days of the charge with your transaction reference. We will investigate and, where a genuine processing error is confirmed, reverse the duplicate or erroneous charge. This exception does not extend to the non-refundable categories described in Sections 2 and 3 where the payment was correctly processed for the service requested." },
  ]},
  { id: "chargebacks", title: "5. Chargebacks", body: [
    { p: "We ask that you contact us to resolve any payment concern before initiating a chargeback with your bank or card issuer. Initiating a chargeback for a payment that falls within the non-refundable categories in this Policy, without first raising the issue with us, may result in suspension of your account pending investigation." },
  ]},
  { id: "earnings-refund", title: "6. Earnings and Redemption", body: [
    { p: "This Refund Policy governs payments made by sellers and Sponsors to Rovenet. It does not affect a User's ability to redeem earnings validly credited to their account, which is governed separately by the Earnings and Redemption provisions of our Terms & Conditions." },
    { p: "Gifts sent to other Users within Communities are final once sent. Where in-app Credits are purchased, they are non-refundable once credited to your account, save for a duplicate or erroneous charge under Section 4." },
  ]},
  { id: "statutory", title: "7. Statutory Rights", body: [
    { p: "Nothing in this Policy limits any right you may have under applicable Nigerian consumer protection law that cannot lawfully be excluded or limited by agreement." },
  ]},
  { id: "raise-dispute", title: "8. How to Raise a Payment Dispute", body: [
    { ul: [
      "Email billing@rovestacks.com with your registered phone number or email, transaction reference, and a description of the issue.",
      "We aim to acknowledge disputes within 3 business days and resolve them within 14 business days.",
      "Resolution timelines may also depend on information made available to us by Paystack or Opay.",
    ]},
  ]},
  { id: "changes-refund", title: "9. Changes to This Policy", body: [
    { p: "We may update this Policy from time to time. Material changes will be communicated in-app or by email prior to becoming effective." },
  ]},
];