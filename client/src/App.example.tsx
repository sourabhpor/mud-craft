import { Chatbot } from "./components/Chatbot";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Your existing app content here */}
      <header>
        <h1>MudCraft</h1>
      </header>

      <main>{/* Your pages and components */}</main>

      {/* Add the Chatbot component - it will appear as a floating button */}
      <Chatbot />
    </div>
  );
}

export default App;
