import type { User } from "@/features/portfolio/types/user"

export const USER = {
  firstName: "Kshitij",
  lastName: "Dhyani",
  displayName: "Rajvardhan (Raj) Patil",
  username: "wimpywarlord",
  gender: "male",
  pronouns: "he/him",
  bio: "Seeking truth in an attempt to mainline the secret to the universe",
  flipSentences: [
    "Your PATH is uniquely yours",
    "Limit the number of details every detail perfect",
    "Work becomes flow at the limits of ability",
    "Happiness is a skill you identify and develop",
  ],
  address: "Kolhapur — Phoenix",
  phoneNumber: "", // not public
  email: "cGF0aWxyYWp2YXJkaGFuMjdAZ21haWwuY29t", // base64 encoded
  website: "",
  jobTitle: "Seeking Truth",
  jobs: [
    {
      title: "Software Developer",
      company: "University of Colorado - Boulder",
      website: "https://www.colorado.edu/ceae/larsonlab",
    },
  ],
  about: `
- Part of projects [gradmits.com](https://gradmits.com), and [gradbro.com](https://gradbro.com).
- Started coding to help myself fight problems that I observed.
- Cooked up:
  - Reddit marketing automation system - [Redbrro](https://github.com/patilrajvardhan27/Redbro)
  - Building energy analysis tool — [Saber](https://saber-six-rho.vercel.app/).
  - Association Portal — [CAK](https://cak-kolhapur.com/).
  - Campus utility app for my university — [MessIt](https://play.google.com/store/apps/details?id=com.vinnovateit.messit).
`,
  avatar: "/assets/logo.jpg",
  ogImage: "/assets/logo.jpg",
  namePronunciationUrl: "/assets/my_name.mp3",
  timeZone: "America/Phoenix",
  keywords: [
    "kshitij dhyani",
    "kshitij",
    "dhyani",
    "wimpywarlord",
    "gradbro",
    "tjay",
    "type_kshitij",
  ],
  dateCreated: "2024-01-01",
} satisfies User
