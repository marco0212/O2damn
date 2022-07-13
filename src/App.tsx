import "@libs/constructor-third-party";
import { BackendProvider } from "@libs/provider-backend/BackendContext";
import { ListProvider } from "@libs/provider-list";
import { NavigatorProvider, Switch } from "@libs/provider-navigator";
import { PlayProvider } from "@libs/provider-play";
import "./App.css";

function App() {
  return (
    <NavigatorProvider>
      <BackendProvider>
        <ListProvider>
          <PlayProvider>
            <Switch />
          </PlayProvider>
        </ListProvider>
      </BackendProvider>
    </NavigatorProvider>
  );
}

export default App;
