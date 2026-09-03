# 📝 Doc Chat: AI-Powered PDF Chat

A full-stack SaaS application that allows users to upload PDF documents and engage in intelligent, context-aware conversations with their data. 

<p align="center">
  <img width="1920" height="1080" alt="thumbnail" src="https://github.com/user-attachments/assets/56865897-3355-4135-b7d0-5d35d293e76d" />
</p>
<p align="center">
  <img width="49%" alt="working-demo" src="https://github.com/user-attachments/assets/90d4a836-a92e-45ca-abf6-530177704599" />
  <img width="49%" alt="chat-preview" src="https://github.com/user-attachments/assets/3befc6b8-040b-4346-b2fe-f784317b0517" />
</p>

## 📖 How to Use
1. **Upload:** Create a free account and upload any standard PDF document (manuals, research papers, textbooks).
2. **Process:** The system automatically reads, chunks, and vectorizes the document in seconds.
3. **Chat:** Ask direct questions in the chat interface. The AI will instantly search the document and provide accurate, context-aware answers based strictly on the uploaded file.

## 🚀 Key Engineering Features

* **End-to-End Type Safety (tRPC):** Instead of relying on fragile REST endpoints, the entire API layer is built with **tRPC**. This ensures strict, compile-time type safety across the Next.js client and server boundaries, completely eliminating a whole class of runtime errors.
* **Vector Search Database (Pinecone):** To give the AI "memory" of large documents without exceeding token limits, uploaded PDFs are converted into vector embeddings and stored in **Pinecone**. This allows for lightning-fast semantic similarity searches whenever a user asks a question.
* **AI Orchestration (LangChain):** The complex Retrieval-Augmented Generation (RAG) pipeline is orchestrated using **LangChain**. It seamlessly connects the user's prompt, the retrieved document context from Pinecone, and the LLM to generate highly accurate responses.
* **Optimized PDF Rendering:** Utilizes `react-pdf` to render large documents smoothly directly in the browser. The split-pane UI allows users to read the source material alongside the active AI chat.
* **Secure File Hosting:** Uploaded files are securely managed and served via **UploadThing**, ensuring fast processing and a clean separation of media storage from the core database.

## 🛠️ The Tech Stack

* **Framework:** Next.js 13 (App Router), React, TypeScript
* **API Layer:** tRPC (with React Query)
* **AI & Machine Learning:** LangChain, OpenAI
* **Vector Database:** Pinecone
* **Relational Database:** PostgreSQL, Prisma ORM
* **Authentication:** Clerk
* **UI & Styling:** Tailwind CSS, Radix UI Primitives, `react-textarea-autosize`

## 💻 Local Development Setup

To run this project locally, you will need active accounts/API keys for Clerk, Pinecone, UploadThing, and OpenAI.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Akash4510/doc-chat.git](https://github.com/Akash4510/doc-chat.git)
   cd doc-chat
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory and populate it with your keys:
   ```env
   DATABASE_URL=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   OPENAI_API_KEY=
   PINECONE_API_KEY=
   UPLOADTHING_SECRET=
   UPLOADTHING_APP_ID=
   ```

4. **Initialize Database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
