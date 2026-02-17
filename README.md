![Vibe](/GRP.png)

# Vibe

Vibe is a next-generation, AI-powered coding IDE that executes development tasks from a single prompt, built with **Next.js**, **Clerk**, **Convex**, **Inngest**, **Sentry**, **Firecrawl**, **Shadcn UI**, and the **Google Gemini API**.

## Features

- **AI Code Generation**: Generate production-ready code using **Gemini**.
- **Inline Code Suggestions**: AI code suggestions directly inside the editor.
- **GitHub Import**/**Export**: Import/Export any GitHub repository.
- **Editor Preview**: Instantly preview your application inside the IDE.
- **Secure Authentication**: Powered by **Clerk**.
- **Background Jobs**: Managed with **Inngest**.
- **Error Monitoring**: Integrated with **Sentry**.
- **Modern UI**: Built with **Tailwind CSS** and **Shadcn**.
- **Real-Time Database & Backend**: Powered by **Convex**.

## Tech Stack

**Frontend**
- Next.js
- React
- TypeScript
- Shadcn UI
- Tailwind CSS

**Backend**
- Convex
- Inngest
- Firecrawl

**Authentication**
- Clerk

**AI Providers**
- Google Gemini API
- OpenAI (Optional)
- Anthropic (Optional)
- xAI (Optional)

**Error Monitoring**
- Sentry

## Getting Started
### Prerequisites

Make sure you have:
- Node.js (v22+ recommended)
- A Clerk account
- A Convex account
- Gemini API key (Gemini)
- A Sentry account (optional but recommended)

## Installation
### Install dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file in the root directory:
```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_JWT_ISSUER_DOMAIN=

# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
CONVEX_INTERNAL_KEY=CONVEX_INTERNAL_KEY # Keep it as it is.

# AI Providers
GEMINI_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
# OR
OPENAI_API_KEY=
# OR
ANTHROPIC_API_KEY=
# OR
XAI_API_KEY=

# Background & Crawling
FIRECRAWL_API_KEY=

# Monitoring
SENTRY_AUTH_TOKEN=
```

## Configuration Guide
**1. Clerk Setup**
- **Create application**
  - Go to **Clerk Dashboard → Create application**
  - Application name: `YOUR_APP`
  - Sign in options: Enable **Email** and **GitHub**
  - Click **Create application**
  - Copy the `.env` credentials and Paste it into `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` in your `.env.local` file

- **Configure OAuth**
  - Go to **Configure → SSO connections**
  - Click **GitHub**
  - Enable **Use custom credentials**
  - **Create OAuth app**
    - Now in a new tab, open **GitHub → Settings → Developer Settings**
    - Click **OAuth Apps → New OAuth App**
    - Application name: `YOUR_APP`
    - Homepage URL: `http://localhost:3000`
    - Authorization callback URL: Copy the `Authorization Callback URL` from **Clerk** and Paste it
    - Click **Register application**
      - Click **Generate a new client secret**
    - Copy the **GitHub Client ID** and **Client secrets** and Paste it into **Clerk Client ID** and **Client Secret**
    - Scopes: Type `repo` then click **Add**
  - Click **Save**

- **Configure JWT**
  - Go to **Configure → Sessions → JWT templates**
  - Click **Add new template**
  - Template: Select `Convex`
  - Click **Save**
  - Copy the **Issuer Domain** from **Clerk JWT template** and Paste it into `CLERK_JWT_ISSUER_DOMAIN`

- **Configure Billing**
  - Go to **Configure → Billing → Settings**
  - **Enable user billing**
  - Click **Save**
  - Go to **Subscription plans**
  - Click **Create Plan**
    - Name: `Pro`
    - Key: Must be `pro`
    - Monthly base fee: Type any amount for testing purposes
    - Click **Save**

**2. Convex Setup**
- **Create Project**
  - Go to **Convex Dashboard → Create Project**
  - Project name: `YOUR_CONVEX_PROJECT`
  - Click **Create**

- **Configure Environment Variables**
  - Go to **Your convex project → Settings → Environment variables**
  - **Add** these **4** variables
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
  - `CLERK_JWT_ISSUER_DOMAIN`
  - `CONVEX_INTERNAL_KEY`=`CONVEX_INTERNAL_KEY`
  - Click **Save**

- **Link Project**
  - Inside this project root directory, open the terminal and run this command: `npx convex dev`
  - **Depending on whether you’ve run this before or if it’s your first time, you’re probably seeing a login link. Just click the link and sign in with your account.**
  - Now **choose an existing project**
  - Select `YOUR_CONVEX_PROJECT`
  - Hit **Enter**
  - Now in your `.env.local` file, you can see there are automatically added two variables, `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL`

**3. AI Setup**
- If you use Gemini, then paste your Gemini API key into `GOOGLE_GENERATIVE_AI_API_KEY` and `GEMINI_API_KEY`. In case you want to use other AI providers like **OpenAI**, **Grok**, and **Claude**, then make sure you don't forget to change these 4 files' configuration:
  - Like if you want to use OpenAI and its models, then change the model to: `openai("gpt-4")`
  - Same process for **xAI** and **Anthropic**

```bash
# src\app\api\quick-edit\route.ts

const { output } = await generateText({
    model: google("gemini-2.5-pro"),  # openai("gpt-4")
    output: Output.object({ schema: quickEditSchema }),
    prompt,
});

# src\app\api\suggestion\route.ts

const { output } = await generateText({
    model: google("gemini-2.5-pro"),  # xai("grok-3") 
    output: Output.object({ schema: suggestionSchema }),
    prompt,
});

# src\features\editor\extensions\quick-edit\route.ts

const { output } = await generateText({
    model: google("gemini-2.5-pro"),  # anthropic("claude-opus-4-0")
    output: Output.object({ schema: quickEditSchema }),
    prompt,
});

# src\features\conversations\inngest\process-message.ts

const titleAgent = createAgent({
    name: "title-generator",
    system: TITLE_GENERATOR_SYSTEM_PROMPT,
    model: gemini({   # openai, anthropic, grok
        model: "gemini-2.5-pro",  # models
    }),
});

const codingAgent = createAgent({
    name: "vibe",
    description: "An expert AI coding assistant",
    system: systemPrompt,
    model: gemini({   # openai, anthropic, grok
        model: "gemini-2.5-pro",  # models
    }),
});

```
- Make sure you put the API keys of your AI providers `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `XAI_API_KEY`

**4. Firecrawl Setup**
- Go to **Firecrawl Dashboard → API Keys**
- Copy the `API Key` and Paste it into `FIRECRAWL_API_KEY` in your `.env.local` file

**5. Sentry Setup**