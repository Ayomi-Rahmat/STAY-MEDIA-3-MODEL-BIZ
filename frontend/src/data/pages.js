// Text for the information pages (Privacy, Terms, FAQ) and the blog article bodies.
// These are DRAFT wording so the pages work end to end. The client (and a lawyer for the legal pages)
// should review and replace them. Later the admin dashboard will manage this content.

import { SITE } from "./site";

export const PRIVACY = {
  title: "Privacy Policy",
  updated: "November 2026",
  intro: `This policy explains what information ${SITE.name} collects through this website, why we collect it and how we look after it.`,
  sections: [
    {
      heading: "Information we collect",
      body: [
        "Details you give us when you create an account, make a booking or reservation, send an enquiry or subscribe to our newsletter: your name, email address, phone number and booking details.",
        "Basic technical information such as your browser type and the pages you visit, collected through analytics tools to help us improve the site.",
      ],
    },
    {
      heading: "How we use your information",
      body: [
        "To create and manage your account and to process and confirm your bookings.",
        "To reply to your enquiries and send booking confirmations and updates.",
        "To send our newsletter, only if you subscribed. You can unsubscribe at any time.",
        "To understand how the website is used and make it better.",
      ],
    },
    {
      heading: "Payments",
      body: [
        "Online payments, where available, are handled by a third-party payment provider. We do not store your full card details on our servers.",
      ],
    },
    {
      heading: "Sharing your information",
      body: [
        "We do not sell your personal information. We share it only with service providers who help us run the website, send emails or process payments, and where the law requires it.",
      ],
    },
    {
      heading: "Keeping your information safe",
      body: [
        "We use reasonable technical and organisational measures to protect your data, including securely storing passwords. No online service can be guaranteed to be completely secure.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        `You can ask to see, correct or delete the personal information we hold about you by contacting us at ${SITE.email}.`,
      ],
    },
    {
      heading: "Contact us",
      body: [`Questions about this policy? Email ${SITE.email} or call ${SITE.phone}.`],
    },
  ],
};

export const TERMS = {
  title: "Terms & Policies",
  updated: "November 2026",
  intro: `By using this website and making bookings with ${SITE.name}, you agree to the terms below.`,
  sections: [
    {
      heading: "Using the website",
      body: [
        "You agree to give accurate information and to use the website only for lawful purposes.",
        "You are responsible for keeping your account password confidential.",
      ],
    },
    {
      heading: "Bookings and reservations",
      body: [
        "A booking request is not confirmed until you receive a confirmation from us.",
        "We may contact you to confirm or adjust details such as time, availability or number of guests.",
        "Restaurant, hotel and club bookings may each have their own arrival, check-in or entry requirements, which we will share at the time of booking.",
      ],
    },
    {
      heading: "Cancellations and changes",
      body: [
        "Please contact us as early as possible if you need to change or cancel a booking.",
        "Any cancellation, refund or deposit rules that apply to a booking will be shown before you confirm it.",
      ],
    },
    {
      heading: "Payments",
      body: ["Prices are shown in the currency displayed on the site. Payments are processed securely by our payment provider."],
    },
    {
      heading: "Our responsibility",
      body: [
        "We work hard to keep the information on this website accurate, but menus, prices, room details and event information can change without notice.",
      ],
    },
    {
      heading: "Changes to these terms",
      body: ["We may update these terms from time to time. The date at the top shows when they were last changed."],
    },
  ],
};

export const FAQS = [
  {
    q: "How do I reserve a table?",
    a: "Open the Restaurant page, scroll to the reservation form, choose your date, time and number of guests, and submit. You will receive a reference number once your request is received.",
  },
  {
    q: "Do I need an account to book?",
    a: "You can send enquiries without an account. Creating a free account lets you see and manage all your bookings, payments and notifications in one place, across the restaurant, hotel and club.",
  },
  {
    q: "Is it one account for the restaurant, hotel and club?",
    a: "Yes. One login works across all three businesses.",
  },
  {
    q: "How will I know my booking is confirmed?",
    a: "We will confirm your booking using the contact details you provide. Registered customers can also see the status of every booking in their account.",
  },
  {
    q: "Can I change or cancel a booking?",
    a: "Please contact us as early as possible using the contact form or phone number on this site, and we will help you change or cancel it.",
  },
  {
    q: "What are your opening hours?",
    a: "The restaurant's opening hours are shown on the Restaurant page. Hotel reception and club events have their own schedules, which will appear on their pages.",
  },
  {
    q: "Can I book a room or a club table online?",
    a: "Hotel room booking and club reservations are coming soon. In the meantime, send us an enquiry from the Hotel or Club page and we will get back to you.",
  },
  {
    q: "How do I contact you?",
    a: `Use the contact form on the homepage, email ${SITE.email} or call ${SITE.phone}.`,
  },
];

// Longer text for each blog article, matched to BLOG_POSTS by slug.
// SAMPLE filler - replace with real articles (later, written from the admin dashboard).
export const BLOG_BODIES = {
  "healthy-fast-food-myth-or-reality": [
    "Fast food has a reputation problem, but the picture is changing. Fresh ingredients, grilled options and smaller portions are making it easier to eat well without giving up flavour.",
    "The secret is in the details: how food is cooked, what goes on the side and how sauces are used. A grilled chicken wrap with salad can be a very different meal from a deep-fried alternative.",
    "At the end of the day, balance matters most. Enjoy your favourites, choose fresh options when you can, and savour every bite.",
  ],
  "is-fast-food-getting-healthier": [
    "Across the industry, menus are evolving. More restaurants now list ingredients clearly, offer lighter choices and cook with less oil.",
    "Customers are asking better questions, and kitchens are responding with fresher produce, wholegrain options and more vegetarian dishes.",
    "The trend is encouraging: great taste and better choices are no longer opposites.",
  ],
  "hot-chickpeas-flake-recipe": [
    "Crispy, spicy and surprisingly simple: this chickpea snack takes minutes to prepare and keeps well for days.",
    "Drain and dry the chickpeas, toss them with a little oil and your favourite spices, then roast until golden and crunchy.",
    "Serve them warm as a snack, or sprinkle them over salads and soups for extra texture.",
  ],
};
