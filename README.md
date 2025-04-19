# 📝 Supabase Task Manager

A simple task management web application built with **Vite**, **TypeScript**, and **Supabase**.  
Each user can log in using **email or Google**, and manage **their own tasks (CRUD)**.

---

## 🚀 Features

- ✅ Authentication via Email and Google (Supabase Auth UI)
- ✅ CRUD operations for personal tasks
- ✅ Only authenticated users can access their own data
- ✅ Responsive design for phones and laptops
- ✅ Built with modern tech stack (Vite + TypeScript + Supabase)

---

## 🛠️ Tech Stack

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/)
- Supabase Auth UI
- Vanilla CSS (Responsive)

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/supabase-task-manager.git
cd supabase-task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> You can find these values in your [Supabase project settings](https://app.supabase.com/project/_/settings/api).

### 4. Generate Supabase types (optional but recommended)

```bash
npx supabase login
npx supabase gen types typescript --project-id your-project-id > src/types/supabase.ts
```

> You can also manually define types if preferred.

---

## 🧪 Running the App

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
│
├── App.tsx             # Main app component
├── main.tsx            # Vite entry
├── types/
│   └── supabase.ts     # (Optional) Supabase-generated types
└── index.css           # Global vanilla CSS styles
```

---

## 📸 Screenshots

- **Login screen**
  - Centered, clean UI with Google/email login
- **Task dashboard**
  - Create, view, and delete tasks
  - Only sees your own tasks

---

## 🔐 Security Notes

- Each task is associated with a `user_id`
- Only the logged-in user can view and modify their tasks
- Make sure your Supabase RLS (Row Level Security) is enabled with appropriate policies:
  
```sql
-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Select own tasks
CREATE POLICY "User can select own tasks"
  ON tasks FOR SELECT
  USING (auth.uid() = user_id);

-- Insert own tasks
CREATE POLICY "User can insert own tasks"
  ON tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Delete own tasks
CREATE POLICY "User can delete own tasks"
  ON tasks FOR DELETE
  USING (auth.uid() = user_id);
```

---

## 🧑‍💻 Author

**Your Name**  
GitHub: [@your-username](https://github.com/your-username)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Contributions

PRs, feedback, and stars are always welcome!
