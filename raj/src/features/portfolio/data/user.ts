import type { User } from "@/features/portfolio/types/user"

export const USER = {
  firstName: "Raj",
  lastName: "Patil",
  displayName: "Rajvardhan (Raj) Patil",
  username: "patilrajvardhan27",
  gender: "male",
  pronouns: "he/him",
  bio: "Seeking truth in an attempt to mainline the secret to the universe",
  flipSentences: [
    "Your PATH is uniquely yours",
    "Limit the number of details every detail perfect",
    "Work becomes flow at the limits of ability",
    "Happiness is a skill you identify and develop",
  ],
  address: "Kolhapur — Boulder",
  phoneNumber: "", // not public
  email: "cGF0aWxyYWp2YXJkaGFuMjdAZ21haWwuY29t", // base64 encoded
  website: "https://portfolio-raj-2.vercel.app",
  jobTitle: "Seeking Truth",
  jobs: [
    {
      title: "Full Stack Developer",
      company: "University of Colorado Boulder — ICS",
      website: "https://verbs.colorado.edu",
    },
    {
      title: "Software Engineering Student Assistant",
      company: "University of Colorado Boulder — CEAE",
      website: "https://www.colorado.edu/ceae/larsonlab",
    },
  ],
  about: `
- Part of projects [gradmits.com](https://gradmits.com), and [gradbro.com](https://gradbro.com).
- Started coding to help myself fight problems that I observed.
- Cooked up:
  - AI dating app built for women's priorities — [Manter](https://github.com/patilrajvardhan27/Manter)
  - AI dining companion for CU Boulder — [Buff Bites](https://buffbites.live/)
  - Reddit marketing automation system — [Redbro](https://github.com/patilrajvardhan27/Redbro)
  - Building energy analysis tool — [Saber](https://saber-six-rho.vercel.app/).
  - Association Portal — [CAK](https://cak-kolhapur.com/).
  - Campus utility app for my university — [MessIt](https://play.google.com/store/apps/details?id=com.vinnovateit.messit).
`,
  avatar: "/assets/logo.jpg",
  ogImage: "/assets/logo.jpg",
  namePronunciationUrl: "/assets/my_name.mp3",
  timeZone: "America/Denver",
  keywords: [
    "raj patil",
    "rajvardhan patil",
    "rajvardhan",
    "patil",
    "patilrajvardhan27",
    "gradbro",
    "gradmits",
  ],
  dateCreated: "2024-01-01",
} satisfies User
