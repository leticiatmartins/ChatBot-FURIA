import { useState } from "react";
import logo from "../assets/logo.svg";
import "../index.css";
import { motion } from "framer-motion";

const welcomeMessage = {
  from: "bot",
  text: (
    <div>
      <p>Salve, Furioso! 🐆</p>
      <p>Quer saber tudo sobre a FURIA?</p>
      <p>Me pergunta sobre:</p>
      <ul className="list-disc list-inside text-sm mt-2">
        <li>👕 Coleção de Roupas</li>
        <li>⚔️ Time e Jogadores</li>
        <li>🎮 Próximas Partidas</li>
      </ul>
    </div>
  ),
};

const ChatBox = () => {
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleClear = () => {
    setMessages([welcomeMessage]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const lower = input.toLowerCase();
      let botResponse = (
        <p>
          Hmm... não entendi muito bem. Tenta perguntar sobre{" "}
          <strong>jogos</strong>, <strong>time</strong>,{" "}
          <strong>roupas</strong>. 👀
        </p>
      );

      if (lower.includes("jogo") || lower.includes("jogos") || lower.includes("partida")) {
        botResponse = (
          <div>
            <p>📅 Próximos jogos da FURIA:</p>
            <ul className="list-disc list-inside text-sm mt-2">
            <li>
          🏆 <strong>PGL Astana 2025</strong> — 10 a 18 de maio
        </li>
        <li>
          🏆 <strong>Intel Extreme Masters Dallas 2025</strong> — 19 a 25 de maio
        </li>
        <li>
          🏆 <strong>BLAST.tv Austin Major 2025</strong> — 03 a 22 de junho
        </li>
            </ul>
            <p className="mt-2">
              Fique ligado no nosso{" "}
              <a
                href="https://x.com/furia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline"
              >
                Twitter
              </a>{" "}
              pra atualizações ao vivo!
            </p>
          </div>
        );
      } else if (lower.includes("roupa") || lower.includes("roupas") || lower.includes("coleção")) {
        botResponse = (
          <p>
            Você pode conferir nossa coleção oficial na{" "}
            <a
              href="https://www.furia.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline"
            >
              loja da FURIA
            </a>
            . Tem camisa, boné, moletom e mais! 🧢🔥
          </p>
        );

    }else if (lower.includes("oi") || lower.includes("Oiee") || lower.includes("Olá") || lower.includes("ola")) {
            botResponse = (
                <p>
                OIIIII Furioso, tudo bem? O que quer sobre hoje{" "}
                <strong>jogos</strong>, <strong>time</strong>,{" "}
                <strong>roupas</strong>. 👀
              </p>
            );
      } else if (lower.includes("time") || lower.includes("jogadores")) {
        botResponse = (
          <div>
            <p>💣 Time CS:GO da FURIA:</p>
            <p><strong>Masculino:</strong></p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>KSCERATO (Entry)</li>
              <li>yuurih (Rifler)</li>
              <li>arT (IGL)</li>
              <li>chelo (Support)</li>
              <li>FalleN (AWPer)</li>
            </ul>
            <p><strong>Feminino:</strong></p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>kaahSENSEI (Suporte)</li>
              <li>Izaa (Rifler)</li>
              <li>Gabs (AWPer)</li>
              <li>Bizinha (Entry)</li>
              <li>Lulitenz (IGL)</li>
            </ul>
            <p><strong>Treinador:</strong></p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>Sidnei Macedo (Treinador)</li>
            </ul>
          </div>
        );
      } 
      

      setMessages((prev) => [...prev, { from: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 1000); // Simula 1 segundo de "digitando..."
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 border-r border-gray-200">
        <img src={logo} alt="FURIA logo" className="h-12 mb-6" />
        <nav className="flex flex-col gap-4 text-sm">
          <a
            href="https://liquipedia.net/counterstrike/FURIA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-600 transition"
          >
            Wikipedia da FURIA
          </a>
          <a
            href="https://www.furia.gg/produtos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-600 transition"
          >
            Produtos
          </a>
          <a
            href="https://www.furia.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-600 transition"
          >
            Perfil Oficial
          </a>
          <a
            href="https://www.instagram.com/furiagg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-600 transition"
          >
           Instagram
          </a>
          <a
            href="https://www.youtube.com/channel/UCE4elIT7DqDv545IA71feHg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-gray-600 transition"
          >
           YouTube
          </a>
        </nav>
      </aside>

      {/* Chat */}
      <main className="flex flex-col flex-1 p-6 bg-gray-300">
        <div className="flex-1 flex flex-col overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-xl max-w-[75%] ${
                msg.from === "bot"
                  ? "bg-gray-200 text-black self-start" // Bot no lado esquerdo
                  : "bg-gray-100 text-black self-end" // Usuário no lado direito
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="p-3 rounded-xl bg-gray-200 text-black self-start"
            >
              Digitando...
            </motion.div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 rounded-l-xl p-3 border border-gray-300 bg-white text-black focus:outline-none"
            placeholder="Fala comigo, Furioso!"
          />
          <button
            onClick={handleSend}
            className="bg-black text-white px-4 rounded-xl hover:bg-gray-700 transition"
          >
            Enviar
          </button>
          <button
            onClick={handleClear}
            className="bg-black text-white px-4 rounded-xl hover:bg-gray-600 transition"
          >
            Limpar
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChatBox;
