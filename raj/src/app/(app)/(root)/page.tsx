import type { ProfilePage as PageSchema, WithContext } from "schema-dts"

import { SectionSeparator } from "@/components/section-separator"
import { About } from "@/features/portfolio/components/about"
import { Overview } from "@/features/portfolio/components/overview"
import { ProfileCover } from "@/features/portfolio/components/profile-cover"
import { ProfileHeader } from "@/features/portfolio/components/profile-header"
import { Research } from "@/features/portfolio/components/research"
import { SocialLinks } from "@/features/portfolio/components/social-links-v2"
import { TechStack } from "@/features/portfolio/components/tech-stack"
import { USER } from "@/features/portfolio/data/user"
import { cn } from "@/lib/utils"

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <div className="screen-line-after border-x border-edge">
          <div
            className={cn(
              "h-8",
              "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
              "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
            )}
          />
        </div>
        <ProfileCover />
        <SectionSeparator variant={0} />
        <ProfileHeader />
        <SectionSeparator variant={1} />

        <Overview />
        <SocialLinks />
        <SectionSeparator variant={2} />

        <About />
        <SectionSeparator variant={3} />

        <Research />
        <SectionSeparator variant={1} />

        <TechStack />
        <SectionSeparator variant={4} />
      </div>
    </>
  )
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  }
}
