<a name="readme-top"></a>

<div align="center">
  <img width="3000" height="1000" alt="image" src="https://github.com/user-attachments/assets/b6ef1bfb-6a06-44a2-acad-bf1c093deeb6" />
</div>

<p align="center">
  <b>Xio:</b> A self-hosted LLM workspace to chat with your own files.<br />
  Simple, local-first, and built for developers and teams who value control.
</p>

---

### Overview

Xio is a full-stack application that turns any document, URL, or media source into contextual knowledge, enabling natural language interaction through your selected LLM backend.

Use local models or hosted ones. Connect your vector DB of choice. Keep everything on your own machine—or scale it in the cloud. Flexible, private, and built for real workflows.

---

### Key Features

- Multi-format document support: PDF, TXT, DOCX, CSV, YouTube URLs, and more  
- Drop-in audio transcription with Whisper  
- Pluggable LLM and embedding providers  
- Workspace-based content separation  
- Local or cloud deployment support  
- Clean chat UI with chunk references  
- Fully open source and developer-friendly

---

### Supported Providers

**LLMs**  
- OpenAI  
- Azure  
- Anthropic  
- Hugging Face  
- Ollama  
- LocalAI  
- Together  
- Cohere  
- LM Studio  
- Groq  
- Text Generation Web UI  
- Many more...

**Vector Databases**  
- Chroma  
- Pinecone  
- Qdrant  
- Weaviate  
- PGVector  
- Milvus  
- LanceDB  
- Zilliz  
- Astra DB

**Audio Transcription**  
- Whisper (local or remote)  
- Built-in support for YouTube transcription  

---

### Folder Structure

```plaintext
xio/
├── backend/                     # Core backend logic and services
│   ├── chat/                    # Core chat logic
│   ├── embeddings/              # Chunking and vector generation
│   ├── ingest/                  # File and URL ingestion logic
│   ├── llm/                     # LLM wrappers and model utilities
│   ├── sources/                 # Uploaded file management
│   ├── utils/                   # Support functions and helpers
│   └── server.js                # Backend entry point
│
├── frontend/                    # Vite + React frontend
│   ├── components/              # UI components
│   ├── pages/                   # Page-level routes
│   ├── styles/                  # Global styles and theme
│   └── index.tsx                # Frontend entry point
│
├── collector/                   # Background service for parsing sources
├── embed/                       # Web embed widget for live chat integration
├── browser-extension/           # Chrome extension for scraping/saving content
│
├── docker-compose.yml           # Docker orchestration file
├── .env                         # Environment configuration
└── README.md                    # Project overview
 ```
---

### Deployment Options
You can self-host Xio using Docker, or deploy it to most modern cloud environments with minimal configuration.

Available templates:

Docker

Render

Railway

DigitalOcean

AWS

GCP

---

### Development

yarn setup
yarn dev:server
yarn dev:frontend
yarn dev:collector

Fill in .env files in /server and /frontend before running.

---

### Updates and Links

Website: Soon

Docs: [Xio](https://xio-2.gitbook.io/xio/)

Twitter: [XioLLM](https://x.com/XioLLM)
