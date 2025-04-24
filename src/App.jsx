import { useState } from 'react';
import logo from './logo.svg';

function App() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Salve, Furioso! 🐆 Pronto pra saber tudo sobre a FURIA?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'user', text: input }];
    const lower = input.toLowerCase();

    let botResponse = "Hmm... ainda não tenho essa info, mas logo menos 😅";

    if (lower.includes('jogo') || lower.includes('partida')) {
      botResponse = 'O próximo jogo da FURIA é dia 27/04 às 21h contra G2! Prepara o coração 💥';
    } else if (lower.includes('roupa') || lower.includes('coleção')) {
      botResponse = (
        <>
          Estilo FURIA é na loja oficial 🧢{' '}
          <a href="https://www.furia.gg" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">
            https://www.furia.gg
          </a>
        </>
      );
    } else if (lower.includes('time') || lower.includes('jogadores')) {
      botResponse = 'O squad atual tem KSCERATO, yuurih, chelo, FalleN e arT. Time de respeito! 🧠';
    } else if (lower.includes('oi') || lower.includes('olá')) {
      botResponse = 'Oi, Furioso! Pronto pra saber tudo sobre a FURIA?';
    }

    setMessages([...newMessages, { from: 'bot', text: botResponse }]);
    setInput('');
  };

  const handleClear = () => {
    setMessages([{ from: 'bot', text: 'Salve, Furioso! 🐆 Pronto pra saber tudo sobre a FURIA?' }]);
  };

  return (
    <div
      style={{ fontFamily: "'Helvetica World', Arial, sans-serif" }}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-mono"
    >
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-6">
        <img src={logo} alt="Logo da FURIA" className="w-32 mx-auto mb-4" />
        <h1 className="text-2xl mb-4 font-bold text-black">CHAT</h1>
        <div className="space-y-2 h-64 overflow-y-auto mb-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`text-sm ${msg.from === 'bot' ? 'text-black' : 'text-black text-right'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 p-2 rounded bg-gray-800 text-white "
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite algo sobre a FURIA..."
          />
          <button className="bg-black px-4 py-2 rounded hover:bg-gray-700" onClick={handleSend}>
            Enviar
          </button>
          <button className="bg-black px-4 py-2 rounded hover:bg-gray-700" onClick={handleClear}>
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
