🩺 Medical Voice Agent

An intelligent **AI-powered medical voice consultation platform** where users can talk to **10 different AI specialist doctors** in real-time for medical concerns. This project integrates **Next.js**, **NeonDB**, **Clerk**, **AssemblyAI**, **Vois**, and **Gemini API** to deliver a seamless voice-enabled healthcare experience.

## 🚀 Features

* 🎙 **Real-time voice consultation** with AI specialist doctors
* 🏥 **10 medical specializations** for tailored assistance
* 🧠 **Gemini API** integration to analyze user queries and suggest the right doctor
* 🔒 **Clerk Authentication** for secure login and user management
* 🗄 **NeonDB (PostgreSQL)** for efficient backend storage
* 🗣 **AssemblyAI** for speech-to-text transcription
* 🔊 **Vois Integration** for realistic AI voice responses
* 💬 **Shadcn UI components** for dialogs, tables, and user-friendly design
* 🌐 **Next.js** full-stack framework for smooth frontend & backend handling


## 🛠️ Tech Stack

| Technology       | Purpose                                    |
| ---------------- | ------------------------------------------ |
| **Next.js**      | Frontend & backend framework               |
| **NeonDB**       | Serverless PostgreSQL database             |
| **Clerk**        | Authentication and user management         |
| **Gemini API**   | AI-powered query understanding             |
| **AssemblyAI**   | Speech-to-text transcription               |
| **Vois**         | Voice synthesis and real-time conversation |
| **Shadcn UI**    | Dialog boxes, tables, and UI components    |
| **Tailwind CSS** | Styling and responsive design              |

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository


git clone https://github.com/your-username/medical-voice-agent.git
cd medical-voice-agent


### 2️⃣ Install Dependencies
npm install


### 3️⃣ Configure Environment Variables

Create a `.env.local` file in the project root and add the following:

env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

DATABASE_URL=your_neon_database_url

ASSEMBLYAI_API_KEY=your_assembly_ai_key
VOIS_API_KEY=your_vois_key
GEMINI_API_KEY=your_gemini_api_key


### 4️⃣ Run Database Migrations

If using Drizzle ORM (or similar):
npm run db:migrate


### 5️⃣ Start the Development Server


npm run dev

## 🔥 Usage

1. **Login** using Clerk authentication.
2. **Describe your medical concern** in the voice consultation dialog.
3. **AI will analyze** your input using Gemini API and suggest the best specialist.
4. **Start a voice consultation** with the selected AI doctor (powered by AssemblyAI & Vois).
5. **Get medical advice** in real-time.

## 🧑‍⚕️ Specializations

* General Physician
* Cardiologist
* Dermatologist
* Neurologist
* Orthopedic
* Gynecologist
* Pediatrician
* Psychiatrist
* ENT Specialist
* Dentist


