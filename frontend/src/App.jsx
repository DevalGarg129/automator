import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [health, setHealth] = useState("Checking...");
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/health")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend unavailable");
        }
        return response.json();
      })
      .then((data) => {
        setHealth("Healthy");
        setBackendData(data);
      })
      .catch(() => {
        setHealth("Unavailable");
      });
  }, []);

  return (
    <div className="dashboard">
      <header>
        <h1>Cloud Deployment Platform</h1>
        <p>Automated CI/CD Deployment Dashboard</p>
      </header>

      <main>
        <section className="card">
          <h2>Backend Status</h2>
          <p className={health === "Healthy" ? "healthy" : "unhealthy"}>
            {health}
          </p>
        </section>

        <section className="card">
          <h2>Deployment Information</h2>
          <p>Frontend: React</p>
          <p>Backend: Node.js + Express</p>
          <p>Containerization: Docker (coming soon)</p>
          <p>Cloud: AWS EC2 (coming soon)</p>
        </section>

        <section className="card">
          <h2>Backend Health</h2>
          {backendData ? (
            <>
              <p>Service: {backendData.service}</p>
              <p>Uptime: {backendData.uptime.toFixed(2)} seconds</p>
            </>
          ) : (
            <p>Waiting for backend...</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;