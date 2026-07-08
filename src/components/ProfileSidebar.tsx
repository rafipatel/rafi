import { useState } from "react";
import { Github, Linkedin, Mail, FileText, MapPin, Twitter } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolioData";

const HuggingFaceIcon = () => (
  <svg className="h-[18px] w-[18px]" viewBox="0 0 95 88" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M47.21 73.59a12.79 12.79 0 1 0 0-25.58 12.79 12.79 0 0 0 0 25.58Z" />
    <path d="M81.09 60.8a12.79 12.79 0 1 0-25.58 0 12.79 12.79 0 0 0 25.58 0Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M47.5 87.5C74.08 87.5 95.5 68.61 95.5 44.5S74.08 1.5 47.5 1.5-.5 20.39-.5 44.5 20.92 87.5 47.5 87.5ZM27 61.41a12.79 12.79 0 1 1 25.58 0 12.79 12.79 0 0 1-25.58 0Zm41.3-12.79a12.79 12.79 0 1 0 0 25.58 12.79 12.79 0 0 0 0-25.58Z" />
  </svg>
);

const initials = personalInfo.name
  .split(" ")
  .map((w) => w[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

const links = [
  { label: "LinkedIn", href: socialLinks.linkedin, icon: Linkedin },
  { label: "GitHub", href: socialLinks.github, icon: Github },
  { label: "Hugging Face", href: socialLinks.huggingface, icon: HuggingFaceIcon },
  { label: "X (Twitter)", href: socialLinks.x, icon: Twitter },
  { label: "Email", href: `mailto:${socialLinks.email}`, icon: Mail },
  { label: "CV", href: socialLinks.cv, icon: FileText },
];

const ProfileSidebar = () => {
  const [imgOk, setImgOk] = useState(true);

  return (
    <aside className="flex flex-col gap-6">
      {/* Avatar */}
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <div className="h-28 w-28 overflow-hidden rounded-full border border-border bg-secondary">
          {imgOk ? (
            <img
              src="/headshot.jpg"
              alt={personalInfo.name}
              className="h-full w-full object-cover"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/10 font-serif text-3xl font-semibold text-primary">
              {initials}
            </div>
          )}
        </div>

        <h1 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-foreground">
          {personalInfo.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {personalInfo.currentRole}
          {personalInfo.currentCompany ? (
            <> @ <span className="text-foreground/80">{personalInfo.currentCompany}</span></>
          ) : null}
        </p>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {personalInfo.location}
        </p>
      </div>

      {/* Links */}
      <nav aria-label="Profile links" className="flex flex-col">
        {links.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex min-h-[44px] cursor-pointer items-center gap-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
