import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [message, setMessage] = useState("Connecting to TaskFlow API...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await api.get("/health");
        setMessage(response.data.message);
      } catch (error) {
        setMessage("Unable to connect to TaskFlow API");
        console.error(error);
      }
    };

    checkBackend();
  }, []);

  return (
      <div>
        <h1>TaskFlow</h1>
        <p>{message}</p>
      </div>
  );
}

export default App;