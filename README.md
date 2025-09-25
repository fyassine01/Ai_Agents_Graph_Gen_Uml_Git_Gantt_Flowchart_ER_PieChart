<p align="center">
  
<img width="1917" height="895" alt="Screenshot 2025-08-26 200003" src="https://github.com/user-attachments/assets/26e8cb6e-a3c5-4b84-ab17-600799fa56d9" />
<img width="1072" height="895" alt="Screenshot 2025-08-27 203225" src="https://github.com/user-attachments/assets/d6a191a6-c131-4630-b07d-4230895f6ac0" />
<img width="1918" height="897" alt="Screenshot 2025-08-26 200225" src="https://github.com/user-attachments/assets/12615cac-d24a-467a-995f-043b65a49d6f" />
<img width="1919" height="909" alt="Screenshot 2025-08-26 200211" src="https://github.com/user-attachments/assets/9b2bb396-7439-4777-8571-e7215b04e7e0" />
<img width="1902" height="887" alt="Screenshot 2025-08-22 230109" src="https://github.com/user-attachments/assets/b13fe516-894b-43bc-91b9-3b081ca1e043" />

</p>

<h1 align="center">AI Agents for Diagram Generation</h1>

<p align="center">
  A full-stack web application that leverages a multi-agent AI system to interpret natural language and automatically generate technical diagrams (UML, Flowchart, Gantt, etc.) using Mermaid.js.
  <br />
  <br />
  <a href="#-key-features"><strong>Explore the features »</strong></a>
  <br />
  <br />
  <a href="#-getting-started">Getting Started</a>
  ·
  <a href="#-architecture--tech-stack">Tech Stack</a>
  ·
  <a href="#-license">License</a>
</p>

<!-- You can replace this screenshot with an animated GIF of the app in action -->
<!-- GIF DEMO -->
<p align="center">
  <img src="https://github.com/mouadziani/mouadziani/blob/main/chat.png?raw=true" alt="Application Screenshot" width="80%">
</p>

---

## 🎯 About The Project

In modern software development and project management, technical diagrams are essential for communication. However, their manual creation is often **time-consuming, prone to human error, and difficult to adapt** to evolving project needs. This project addresses these challenges by providing an intelligent, conversational platform that automates the entire diagramming process.

Users can simply describe the diagram they need in plain text, and our system of specialized AI agents collaborates to generate the precise, clean, and valid Mermaid.js code, rendering it visually in real-time.

### ✨ Key Features

*   ✅ **Conversational AI Interface:** Interact with an AI in a chat-like interface to create and modify diagrams.
*   ✅ **Multi-Agent System:** Utilizes a system of **smol agents** and a **Multi-Agent Communication Protocol (MCP)** for sophisticated request handling and generation.
*   ✅ **Wide Range of Diagrams:** Supports various types, including **UML (Class, Sequence), Flowcharts, Gantt charts, ER Diagrams, Git Graphs, and Pie Charts**.
*   ✅ **Conversation History:** All your chats are saved. Revisit, modify, and build upon previous diagrams at any time.
*   ✅ **Secure Authentication:** User accounts and conversations are protected via JWT-based authentication.
*   ✅ **Code & SVG Export:** View the generated Mermaid.js code, copy it to your clipboard, or download the final diagram as a high-quality SVG file.
*   ✅ **Responsive & Modern UI:** A clean, intuitive interface built with React and Tailwind CSS, available in both light and dark modes.

---

## 🛠️ Architecture & Tech Stack

The application is built on a decoupled, service-oriented architecture to ensure scalability and maintainability.

### System Flow
<p align="center">
  <img src="https://github.com/mouadziani/mouadziani/blob/main/archi1.png?raw=true" alt="System Architecture Flow" width="80%">
</p>

### Layered Architecture
<p align="center">
  <img src="https://github.com/mouadziani/mouadziani/blob/main/archi2.png?raw=true" alt="Layered Architecture" width="60%">
</p>

### Technologies Used

| Category      | Technologies                                                                  |
|---------------|-------------------------------------------------------------------------------|
| **Backend**       | **Python 3.12**, **FastAPI**, **SQLAlchemy**, **Uvicorn**, **PostgreSQL**, **python-jose[cryptography]** for JWT, **Passlib[bcrypt]** |
| **Frontend**      | **React.js**, **Tailwind CSS**, **Axios**, **Mermaid.js**, **jwt-decode**           |
| **AI & LLM**      | **Groq API** (powered by the `gpt-oss-120b` model)                             |
| **Database**      | **PostgreSQL** (Production) & **SQLite** (Development)                          |
| **DevOps**        | **Git**, **GitHub**                                                            |


---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   **Node.js** and **npm** (`v18` or later)
*   **Python** (`v3.10` or later) and **pip**
*   **Git**

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Backend Setup:**
    ```sh
    cd backend

    # Create and activate a virtual environment
    python -m venv venv
    # On Windows:
    .\venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate

    # Install dependencies
    pip install -r requirements.txt

    # Create a .env file from the example
    cp .env.example .env
    ```
    Now, open the `.env` file and fill in your credentials:
    ```env
    # Database URL for PostgreSQL
    DATABASE_URL="postgresql://user:password@localhost:5432/your_db_name"
    
    # Groq API Key
    GROQ_API_KEY="your_groq_api_key_here"
    
    # JWT Settings
    SECRET_KEY="generate_a_strong_random_secret_key" # You can use openssl rand -hex 32
    ALGORITHM="HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES=60
    ```

3.  **Frontend Setup:**
    ```sh
    cd ../frontend

    # Install dependencies
    npm install

    # Create a local environment file
    cp .env.local.example .env.local
    ```
    The `.env.local` file should contain the URL of your backend API:
    ```env
    REACT_APP_API_URL=http://localhost:8000
    ```

### Running the Application

1.  **Start the Backend Server:**
    *   Make sure you are in the `backend` directory with the virtual environment activated.
    *   Run the Uvicorn server:
    ```sh
    uvicorn app.main:app --reload
    ```
    The backend will be running at `http://localhost:8000`.

2.  **Start the Frontend Development Server:**
    *   Open a new terminal and navigate to the `frontend` directory.
    *   Run the React app:
    ```sh
    npm start
    ```
    The application will open automatically in your browser at `http://localhost:3000`.

---

## 📜 License

Distributed under the MIT License. See `LICENSE.txt` for more information.

---

## 🙏 Acknowledgments

This project was developed as a final-year project at ENSA Berrechid, under the invaluable guidance of our supervisors from **3D SMART FACTORY** and our academic advisor.

*   M. Thierry Bertin Gardelle (3D SMART FACTORY)
*   M. Hamza Mouncif (3D SMART FACTORY)
*   Mme. Chaymae Benhammacht (3D SMART FACTORY)
*   PR. Anass Assarrar (ENSA Berrechid)

---

## 📧 Contact

Yassine FARAH - [@farah-yassine](https://www.linkedin.com/in/farah-yassine/) - yassine.farahee@gmail.com

Project Link: [https://github.com/fyassine01/AI_agent_generative_diagram](https://github.com/fyassine01/AI_agent_generative_diagram)
