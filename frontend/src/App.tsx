import { AuthProvider } from './contexts/AuthContext';
import { Chat } from './components/Chat';
import './styles/chat.css';

function App() {
  return (
    <AuthProvider>
      <Chat />
    </AuthProvider>
  );
}

export default App;

