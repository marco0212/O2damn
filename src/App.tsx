import { AuthProvider } from "@libs/provider-auth/AuthContext";
import { BackendProvider } from "@libs/provider-backend/BackendContext";
import { ListProvider } from "@libs/provider-list";
import { NavigatorProvider, Switch } from "@libs/provider-navigator";
import { PlayProvider } from "@libs/provider-play";
import "./App.css";

function App() {
  return (
    <NavigatorProvider>
      <BackendProvider>
        <AuthProvider>
          <ListProvider>
            <PlayProvider>
              <Switch />
            </PlayProvider>
          </ListProvider>
        </AuthProvider>
      </BackendProvider>
    </NavigatorProvider>
  );
}

export default App;
