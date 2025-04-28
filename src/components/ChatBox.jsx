import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import logo from '../assets/logo.svg';
import '../index.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Salve, Furioso! 🐆 Pronto pra saber tudo sobre a FURIA?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Faz o scroll automático pra última mensagem
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const lower = input.toLowerCase();
    let botResponse = "Hmm... ainda não tenho essa info, mas logo menos 😅";

    if (lower.includes('jogo') || lower.includes('partida')) {
      botResponse = 'O próximo jogo da FURIA é dia 27/04 às 21h contra G2! Prepara o coração 💥';
    } else if (lower.includes('roupa') || lower.includes('coleção')) {
      botResponse = (
        <>
          Estilo FURIA é na loja oficial 🧢{' '}
          <a
            href="https://www.furia.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-400"
          >
            furia.gg
          </a>
        </>
      );
    } else if (lower.includes('time') || lower.includes('jogadores')) {
      botResponse = 'O squad atual tem KSCERATO, yuurih, chelo, FalleN e arT. Time de respeito! 🧠';
    } else if (lower.includes('oi') || lower.includes('olá')) {
      botResponse = 'Oi, Furioso! Pronto pra saber tudo sobre a FURIA?';
    }

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Ativa efeito digitando...
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1000); // tempo de "digitando" em milissegundos
  };

  const handleClear = () => {
    setMessages([{ from: 'bot', text: 'Salve, Furioso! 🐆 Pronto pra saber tudo sobre a FURIA?' }]);
    setIsTyping(false);
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
        
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo da FURIA" className="w-24 mb-2" />
          <h1 className="text-3xl font-extrabold text-black">Chat</h1>
        </div>

        <div className=" h-[400px] overflow-y-auto p-4 rounded-lg flex flex-col gap-2">
          {messages.map((msg, idx) => (
            <Message key={idx} from={msg.from} text={msg.text} />
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-300 text-black text-sm px-3 py-2 rounded-lg animate-pulse">
                Digitando...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 p-3 rounded-lg bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite algo sobre a FURIA..."
          />
          <button
            className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition"
            onClick={handleSend}
          >
            Enviar
          </button>
          <button
            className="bg-gray-300 text-black rounded-lg px-4 py-2 hover:bg-gray-400 transition"
            onClick={handleClear}
          >
            Limpar
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChatBox;
