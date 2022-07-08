import "@libs/constructor-third-party";
import { BackendProvider } from "@libs/provider-backend/BackendContext";
import { NavigatorProvider } from "@libs/provider-navigator";
import { PlayProvider } from "@libs/provider-play";
import "./App.css";

function App() {
  return (
    <BackendProvider>
      <PlayProvider>
        <NavigatorProvider />
      </PlayProvider>
    </BackendProvider>
  );
}

export default App;
