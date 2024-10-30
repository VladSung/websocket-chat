import { Chat } from './components/chat'
import { useWsChat } from './hooks/useWsChat'
import './App.css'
function App() {
  const {messages, sendMessage, clientId, loading} = useWsChat('ws://localhost:8080')
  return (
    <>
      <h1>Chat</h1>
      <div>Your id: {clientId}</div>
      <Chat clientId={clientId} loading={loading} messages={messages} sendMessage={sendMessage} />
    </>
  )
}

export default App
