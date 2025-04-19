import { useEffect, useState, useCallback } from "react";
import { createClient, User } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Database } from "./types/supabase"; // Adjust the import path as necessary

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type Task = {
  id: number;
  title: string;
  user_id: string;
  created_at: string;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Define `fetchTasks` with useCallback
  const fetchTasks = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);

    if (!error) setTasks(data as Task[]);
  }, [user]);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user, fetchTasks]);

  const addTask = async () => {
    if (!user) {
      return;
    }

    if (!newTask) return;
    const { error } = await supabase.from("tasks").insert({
      title: newTask,
      user_id: user.id,
    });
    if (!error) {
      setNewTask("");
      fetchTasks();
    }
  };

  const deleteTask = async (id: number) => {
    await supabase.from("tasks").delete().eq("id", id);
    fetchTasks();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null); // Clear user state
  };

  if (!user)
    return (
      <div className="centered-container">
        <div className="auth-box">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
          />
        </div>
      </div>
    );

  return (
    <div className="app-container">
      <div className="header">
        <h1>Your Tasks</h1>
        <button onClick={signOut}>Logout</button>
      </div>

      <div className="task-input-container">
        <input
          className="task-input"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="task-button" onClick={addTask}>
          Add
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span>{task.title}</span>
            <button
              onClick={() => deleteTask(task.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
