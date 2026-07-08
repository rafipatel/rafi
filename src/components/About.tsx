import { skills, personalDetails, aboutMe } from "@/data/portfolioData";

const About = () => {
  return (
    <section id="about" className="mt-16 scroll-mt-20">
      <h2 className="mb-5 font-serif text-2xl font-semibold text-foreground">About</h2>

      <div className="space-y-4 text-[15px] leading-7 text-muted-foreground">
        <p className="whitespace-pre-line">{aboutMe.bio}</p>
      </div>

      <dl className="mt-6 space-y-2 text-sm">
        {personalDetails.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
            <dt className="w-36 shrink-0 font-medium text-foreground">{item.label}</dt>
            <dd className="text-muted-foreground">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Skills</h3>
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill.name}
              className="rounded border border-border bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
            >
              {skill.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
