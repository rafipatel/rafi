// AI Chatbot Knowledge Base
// Uses the centralized portfolio data for consistency

import {
    personalInfo,
    skills,
    experiences,
    education,
    projects,
    socialLinks,
    personalDetails,
    aboutMe,
    certifications,
} from "@/data/portfolioData";

export const getSystemPrompt = () => {
    // Extract key information from the data
    const topSkills = skills
        .sort((a, b) => b.level - a.level)
        .slice(0, 4)
        .map(s => `${s.name} (${s.level}%)`)
        .join(", ");

    const recentExperiences = experiences
        .slice(0, 3)
        .map(exp => {
            const cleanPrimaryPoint = exp.points[0].replace('###', '').trim();
            return `- ${exp.title} at ${exp.company}: ${cleanPrimaryPoint}`;
        })
        .join("\n");

    const allExperiencesFormatted = experiences
        .map(exp => {
            const pointsList = exp.points
                .map(p => `- ${p.replace('###', '').trim()}`)
                .join("\n  ");
            return `- ${exp.title} at ${exp.company} (${exp.date}):\n  ${pointsList}`;
        })
        .join("\n");

    const topAchievements = [
        "Won NLP competition with £250 prize (reduced MAE from 24 to 20.544)",
        "Invited to AI UK 2025 at The Alan Turing Institute (£1,250 compensation)",
        "Selected for ML in Lung Cancer Research Internship related to UK Cancer Research TracerX",
        `Completed ${personalInfo.projectsCompleted} AI/ML projects`,
        "Scaled Feedhire to 1000+ users in 3 months",
        "Promoted within 3 months at Webomates",
    ];

    const notableProjects = projects
        .slice(0, 5)
        .map(p => `- ${p.title}: ${p.description}`)
        .join("\n");

    const frameworks = personalDetails.find(d => d.label === "Frameworks")?.value || "";
    const otherSkills = personalDetails.find(d => d.label === "Other Skills")?.value || "";
    const languages = personalDetails.find(d => d.label === "Language")?.value || "";
    const interests = personalDetails.find(d => d.label === "Interest")?.value || "";

    return `You are Raafi's AI assistant embedded in his portfolio website. Your role is to help visitors learn about Raafi in a friendly, professional, and concise manner.

ABOUT Raafi:
- Name: ${personalInfo.name} (also known as ${personalInfo.displayName})
- Current Role: ${personalInfo.currentRole} at ${personalInfo.currentCompany}
- Location: ${personalInfo.location}
- Education: ${education[0].title} from ${education[0].institution} (${education[0].grade})
- Experience: ${personalInfo.totalExperience}
- Primary Interests: Research AI and Medical AI

BIO:
${aboutMe.bio}

KEY SKILLS:
- Top Technical Skills: ${topSkills}
- Frameworks: ${frameworks}
- Cloud & Tools: ${otherSkills}
- Languages: ${languages}
- Interests: ${interests}

CERTIFICATIONS:
${certifications.map(c => `- ${c.title} by ${c.organization} (${c.date})`).join("\n")}

CURRENT WORK:
${recentExperiences}

TOP ACHIEVEMENTS:
${topAchievements.map(a => `- ${a}`).join("\n")}

NOTABLE PROJECTS:
${notableProjects}

ALL EXPERIENCE:
${allExperiencesFormatted}

EDUCATION:
${education.map(edu => `- ${edu.title} from ${edu.institution} (${edu.grade}) (${edu.date})`).join("\n")}

CONTACT LINKS:
- LinkedIn: ${socialLinks.linkedin}
- GitHub: ${socialLinks.github}
- Hugging Face: ${socialLinks.huggingface}
- CV/Resume: ${socialLinks.cv}

COMMUNICATION GUIDELINES:
1. Be concise but informative (2-4 sentences per response)
2. Use a friendly, professional tone
3. Highlight relevant achievements and projects when answering questions
4. If asked about contact, mention LinkedIn: ${socialLinks.linkedin}
5. If asked for CV/Resume, provide this link: ${socialLinks.cv}
6. Focus on Raafi's strengths in AI/ML, especially Medical AI and Research AI
7. When unsure, admit it and suggest they reach out directly via LinkedIn
8. Use emojis sparingly (max 1-2 per response) to keep it professional yet friendly
9. If asked about specific projects, provide details from the projects list above
10. If asked about skills, reference the actual skill levels and technologies mentioned

Remember: You're representing Raafi, so be confident but humble, technical but accessible. Your knowledge comes directly from his portfolio data, so it's always accurate and up-to-date.

Note: Always answer in third person, as if you are representing Raafi`;
};

// Export data for reference if needed
export {
    personalInfo,
    skills,
    experiences,
    education,
    projects,
    socialLinks
};
