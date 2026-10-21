Mallikarjun Alyal — Personal Portfolio
A personal portfolio built to introduce Mallikarjun Alyal, showcase selected projects, explain his engineering journey, and make it easy for people to connect. The experience combines a dark cosmic visual identity with an editorial layout, responsive project cards, smooth navigation, a Three.js background, and a contact form.
Portfolio status: In active development. The visual experience, project details, and motion design may continue to evolve.

Repository: github.com/MALLIKARUNA/Portfolio1
Contents
- About
- Current sections
- Features
- Technology stack
- Project showcase
- Getting started
- Environment variables
- Run and validate
- Contact form email flow
- Ask About Mallikarjun
- Project structure
- Deployment
- Troubleshooting
- Security notes
- Contact
About
The portfolio presents Mallikarjun as an engineering student at Ballari Institute of Technology and Management (BITM), Ballari, Karnataka, India, exploring full-stack development, UI/UX design, and product thinking.

Its guiding idea is:
“I'm not here just to showcase what I've done. I'm here to share what I'm learning, what I'm thinking about, and what I hope to build next.”

The site prioritizes genuine project work, clear descriptions, and a focused way to connect rather than a long résumé-style page.
Current sections
The current page is composed from the following sections. The chapter identifiers are retained in code even though the visible numeric chapter labels have been removed from some headings.
Section	Purpose
Home (chapter-00)	Name, introduction, portrait, roles, social links, and primary calls to action.
Journey (chapter-01)	The beginning of the engineering journey and the motivation to build useful software.
Systems (chapter-02)	A categorized view of programming languages and technologies.
Work (chapter-04)	Project cards with descriptions, technology tags, repository links, and a live-demo link where configured.
Connect (chapter-07)	Email and social links plus a message form.


The previous UI/UX & Product Thinking, Milestones, and Perspective sections were removed to keep the portfolio focused and avoid text-heavy sections.
Features
- Cosmic visual identity: dark, space-inspired styling with accent colors, particles, and a Three.js canvas background.
- Editorial hero: personal introduction, portrait card, role descriptions, hackathon achievement, social profiles, and calls to action.
- Responsive layout: content adapts across desktop, tablet, and mobile viewports.
- Journey storytelling: a compact narrative about engineering foundations and the motivation to build digital products.
- Technology filters: filter the skills list by categories such as programming languages, frontend, backend, and databases.
- Project filters: browse project cards by category.
- Project links: cards link to the corresponding GitHub repositories; a live demo is shown only where configured.
- Smooth scrolling: Lenis is coordinated with GSAP ScrollTrigger, with a reduced-motion preference check in the smooth-scroll provider.
- Ask About Mallikarjun: a small portfolio question-and-answer panel for common questions about the projects and background.
- Contact form: validates visitor input, applies basic abuse controls, and submits a notification email using Resend when configured.
- Reusable data source: personal information, project details, social URLs, skills, and FAQ content are centralized in src/data/portfolioData.ts.
Technology stack
Area	Technologies
Framework	Next.js App Router
UI	React, TypeScript
Styling	Sass / SCSS Modules
3D background	Three.js, WebGL, GLSL shaders
Motion and scroll	Motion for React, GSAP, @gsap/react, Lenis, ScrollTrigger
Icons	Lucide React and project brand-icon components
Email	Resend Node.js SDK
Code quality	ESLint, TypeScript
Deployment target	Suitable for Vercel or another Next.js-compatible host


The actual dependencies and scripts are defined in package.json and package-lock.json.
Project showcase
The Work section currently includes these eight repositories. Descriptions and technology tags are maintained in src/data/portfolioData.ts; keep them aligned with the actual implementation and status of each repository.
Project	Description	Repository
DISASTRA	Adaptive multi-hazard disaster response platform prototype. The portfolio marks it as using simulated data.	Source
Placement Command	Campus placement and interview-scheduling project. The portfolio currently marks it as in development.	Source
MovieVerse	Movie discovery and browsing frontend.	Source
StyleHub	Fashion storefront and interactive cart interface.	Source · Live demo
NOTE-APPLICATION	Local-storage-based notes application as represented in the portfolio data.	Source
Weather App	City weather search using the OpenWeatherMap API, as represented in the portfolio data.	Source
Personal Portfolio Website	Earlier personal website built with HTML, CSS, and JavaScript.	Source
Portfolio1	This Next.js portfolio.	Source


Project status matters: a prototype or work-in-progress should not be described as a production deployment. Verify a demo URL before describing it as live.
Getting started
Prerequisites
- Node.js 20.9 or newer (required by the current Next.js version).
- npm (included with Node.js).
- Git, if cloning the repository.
- A Resend account and API key if you want to test contact-form email delivery.
1. Clone the repository
git clone https://github.com/MALLIKARUNA/Portfolio1.git
cd Portfolio1
2. Install dependencies
Use the lockfile for a reproducible install:
npm ci
If npm ci cannot complete because the lockfile is out of sync, review the package changes before using npm install.
3. Configure local environment variables
Create a file named .env.local in the project root, alongside package.json. Add the environment variables described below. Do not commit this file.
4. Start the development server
npm run dev
Open http://localhost:3000 in your browser. Next.js refreshes the page as files are changed.
Environment variables
The contact endpoint reads these server-side variables:
Variable	Purpose
RESEND_API_KEY	Secret API key used by the Resend server-side SDK.
RESEND_FROM_EMAIL	Sender identity accepted by Resend. For normal sending, use an address on a domain verified in your Resend account.
CONTACT_TO_EMAIL	Inbox that should receive contact-form messages. Defaults in the current route to mallikarjunalyal262@gmail.com if not set.


Example .env.local (replace the placeholders with your own values):
RESEND_API_KEY=re_replace_with_your_real_key
RESEND_FROM_EMAIL="Mallikarjun Alyal <hello@your-verified-domain.com>"
CONTACT_TO_EMAIL=mallikarjunalyal262@gmail.com
Important:
- Never add the Resend API key to a variable beginning with NEXT_PUBLIC_.
- Never commit .env.local or paste the API key into public source code, logs, screenshots, or documentation.
- Resend generally requires a verified sending domain for regular delivery to arbitrary recipients. The shared onboarding@resend.dev sender is intended for testing and may be restricted to your own account email.
- The current contact endpoint sends the notification to the configured owner inbox and sets the visitor's address as replyTo. It does not currently send a separate confirmation email to every visitor.
- A successful API response means Resend accepted the request; check the Resend email logs for delivery, bounce, or rejection status.
Run and validate
The repository defines these npm scripts:
# Start local development
npm run dev

# Run ESLint
npm run lint

# Create an optimized production build
npm run build

# Start the production server (run build first)
npm run start
For a production-mode local check:
npm run build
npm run start
Then open http://localhost:3000.
Contact form email flow
The contact form is implemented in src/components/sections/Chapter07Connect.tsx. It submits the visitor's name, email, topic, and message to POST /api/contact.

The server handler in src/app/api/contact/route.ts:
1. Applies basic in-memory request rate limiting.
2. Parses the JSON payload and validates the required fields and lengths.
3. Checks a hidden honeypot field to filter some automated submissions.
4. Checks the Resend API key configuration.
5. Sends an email to CONTACT_TO_EMAIL, setting the visitor's email as replyTo.
6. Returns a success or error response that the form uses to show feedback.
The current in-memory rate limiter is a basic safeguard, not a distributed production-grade abuse-prevention system. If the application scales across multiple server instances, consider a shared rate-limit store and additional protection.
Ask About Mallikarjun
The assistant UI is in src/components/ai/AskAssistant.tsx, and its endpoint is src/app/api/chat/route.ts.

In the currently inspected implementation, responses are selected from a curated FAQ/portfolio knowledge base with keyword-based matching and predefined fallback answers. This is not currently a general-purpose LLM integration. If a hosted LLM is added later, keep its API key server-side and ground responses in accurate portfolio data.

Keep the assistant's project and achievement descriptions synchronized with the verified content in src/data/portfolioData.ts. Avoid stale or inaccurate claims, particularly around hackathon names and awards.
Project structure
A simplified view of the important files:
Portfolio1/
├── public/
│   └── images/
│       └── projects/             # Project preview images used by cards
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts     # Portfolio Q&A endpoint
│   │   │   └── contact/route.ts  # Contact email endpoint
│   │   ├── page.tsx              # Composes the homepage sections
│   │   └── ...                   # Root layout and global app styles
│   ├── components/
│   │   ├── ai/                   # Ask About Mallikarjun UI
│   │   ├── icons/                # Brand icon components
│   │   ├── layout/               # Navbar and footer
│   │   ├── providers/            # Smooth-scroll provider
│   │   ├── scenes/               # Three.js cosmic canvas
│   │   └── sections/             # Hero, Journey, Systems, Work, Connect
│   ├── data/
│   │   └── portfolioData.ts      # Personal info, projects, skills, FAQ data
│   ├── styles/                  # Shared styles and design tokens
│   └── types/                   # Shared TypeScript types
├── .gitignore                   # Ignores .env* and build/dependency files
├── next.config.ts
├── package.json
├── package-lock.json
└── README.md
Deployment
This is a Next.js application and can be deployed on Vercel or another platform that supports the current Next.js version.

General deployment checklist:
1. Push the project to GitHub.
2. Import the repository into your hosting provider.
3. Configure the required environment variables in the hosting provider's project settings—never upload .env.local as a public file.
4. For email delivery, verify the sender domain in Resend and set RESEND_FROM_EMAIL to the permitted sender address.
5. Build and deploy the application.
6. Submit a real contact-form test and check the Resend dashboard logs. Verify delivery rather than assuming that a successful UI message guarantees inbox delivery.
Useful official documentation:
- Next.js installation and requirements
- Next.js deployment
- Resend with Next.js
Troubleshooting
The site does not start
- Confirm Node.js is version 20.9 or newer.
- Run npm ci from the project root.
- Check the terminal for TypeScript, dependency, or port errors.
- If port 3000 is already in use, stop the other development server or use the port printed by Next.js.
The contact form fails
- Confirm .env.local is in the project root.
- Verify RESEND_API_KEY, RESEND_FROM_EMAIL, and CONTACT_TO_EMAIL are set correctly.
- Restart npm run dev after modifying environment variables.
- Check the browser Network panel and terminal logs for the /api/contact response.
- Check Resend email logs for provider rejection or delivery status.
- Confirm the sender domain and recipient are permitted by your Resend account configuration.
Changes do not appear
- Confirm you are editing the same repository and folder served by npm run dev.
- Check the terminal for compile errors.
- Restart the development server if a dependency or environment change requires it.
Security notes
- .gitignore currently ignores .env*; keep credentials out of Git history.
- Only server-side route handlers should read RESEND_API_KEY.
- Never trust client-side validation alone; the contact route validates submitted data on the server.
- Avoid logging message contents, API keys, or other sensitive information unnecessarily.
- Review portfolio claims and assistant responses periodically so they remain accurate.
Contact
Mallikarjun Alyal
Ballari Institute of Technology and Management (BITM)
Ballari, Karnataka, India
- Email: mallikarjunalyal262@gmail.com
- GitHub: MALLIKARUNA
- LinkedIn: Mallikarjun Alyal
- Instagram: @mallikarjuna____03
