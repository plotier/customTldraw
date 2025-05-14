
# ✏️ Custom Tldraw Editor

A visual editor built with [Tldraw](https://tldraw.com/) that supports AI-generated drawing suggestions using Gemini. This project was developed for a technical assessment, implementing key features such as shape persistence, visual modification, and client-server communication via tRPC.

👉 [**Live demo**](https://custom-tldraw-gtcih8ufc-plotiers-projects.vercel.app/)

---

## 🚀 Technologies Used

- **Next.js (App Router)**
- **TailwindCSS** + **Shadcn UI**
- **tRPC** (`@trpc/server` & `@trpc/client`)
- **Tldraw**
- **Google Gemini AI (Flash 2.0)**
- **Lucide Icons**

---

## ✨ Features

### 🖌 Editor
- Based on [Tldraw](https://tldraw.com/)
- Real-time persistence: document data is saved to the backend (`saveDocument`) whenever changes are made
- On load, the app fetches the document (`getDocument`) to initialize the canvas

### 🎨 Action Button
- Iterates through existing `shapes` and assigns them random colors

### 🤖 AI Suggestions (Gemini)
- User can type a prompt like: `"a house with a tree and a path"`
- The AI responds with **up to 3 brief steps** suggesting how to draw it using Tldraw tools (shapes, lines, text, etc.)
- The response is text-only — it does **not** modify the canvas
- Suggestions are returned in the same language as the input prompt

### ⚙️ API & tRPC
- `GET` `/api/trpc/getDocument` → Fetches the store
- `POST` `/api/trpc/saveDocument` → Saves the current state
- `POST` `/api/trpc/generateDrawingFromPrompt` → Generates drawing suggestions from user prompt

### 🧑‍💻 UI and UX
- UI built using **Shadcn components**: `Button`, `Dialog`, `Sidebar`
- Custom navigation bar
- Icons powered by **Lucide**
- Loading state managed with Tailwind spinner
- Error messages are displayed to the user

---

## 📁 Project Structure

```
src/
├── app/                # Next.js App Router
├── components/         # UI components (Navbar, Sidebar, Buttons)
├── hooks/              # Custom hooks
├── lib/                # Utilities
├── server/             # tRPC logic and routes
```

---

## 🛠 Setup & Development

### 1. Clone the repository

```bash
git clone https://github.com/your-username/custom-tldraw.git
cd custom-tldraw
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file with your Google Gemini API key:

```
GOOGLE_API_KEY=YOUR_API_KEY
```

### 4. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000`

---

## 🧪 API Testing

You can test the tRPC endpoints directly from the client.

Example call to `generateDrawingFromPrompt`:

```ts
await trpc.generateDrawingFromPrompt.mutate({ prompt: "a house with a chimney" });
```

---

## 🔮 Future Improvements

- Persistent storage using a real database (SQLite)
- Auto-drawing based on Gemini's output
- User system with login
- Export designs as SVG or PNG



