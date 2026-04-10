import React, { useState, useRef, useEffect } from 'react';
import RadiomicsApp from './RadiomicsApp';
import ModelOverview from './ModelOverview';
import ProjectInfo from './ProjectInfo';

const MedicalAIDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm CareBot. Implemented using a LLM, You can ask me anything and I will respond to you in Natural language", 
      sender: 'bot' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isReceiving, setIsReceiving] = useState(false);
  const chatboxRef = useRef(null);
  const chatId = useRef(crypto.randomUUID());

  const renderContent = () => {
    switch(activeSection) {
      case 'pneumonia':
        return <RadiomicsApp />;
      case 'overview':
        return <ModelOverview setActiveSection={setActiveSection} />;
      case 'project':
        return <ProjectInfo />;
      default:
        return <ModelOverview setActiveSection={setActiveSection} />;
    }
  };

  const sendMessageToWebSocket = (message) => {
    setIsReceiving(true);
    const url = "wss://backend.buildpicoapps.com/api/chatbot/chat";
    const websocket = new WebSocket(url);

    websocket.addEventListener("open", () => {
      websocket.send(
        JSON.stringify({
          chatId: chatId.current,
          appId: "should-benefit",
          systemPrompt: "You are the CareBot, your mission is to provide support and guidance for better health and well-being.",
          message: message,
        })
      );
    });

    let responseBuffer = "";

    websocket.addEventListener("message", (event) => {
      responseBuffer += event.data.replace(/\n/g, ' ');
    });

    websocket.addEventListener("close", (event) => {
      if (responseBuffer) {
        const botResponse = { text: responseBuffer.trim(), sender: 'bot' };
        setMessages((prev) => [...prev, botResponse]);
      } else if (event.code !== 1000) {
        const errorResponse = {
          text: "Error getting response from server. Please try again later.",
          sender: 'bot',
        };
        setMessages((prev) => [...prev, errorResponse]);
      }
      setIsReceiving(false);
    });
  };

  const sendMessage = () => {
    if (inputMessage.trim() && !isReceiving) {
      const userMessage = { text: inputMessage, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setInputMessage('');

      // Send the message to the WebSocket API
      sendMessageToWebSocket(inputMessage);
    }
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <nav className="p-4">
          <h1 className="text-2xl font-bold mb-6">MedAI Hub</h1>
          <ul>
            <button 
              onClick={() => setActiveSection('overview')}
              className={`w-full text-left p-2 mb-2 rounded ${activeSection === 'overview' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            >
              🏠 Dashboard
            </button>
            <button 
              onClick={() => setActiveSection('pneumonia')}
              className={`w-full text-left p-2 mb-2 rounded ${activeSection === 'pneumonia' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            >
              🫁 Pneumonia Detection
            </button>
            <button 
              onClick={() => setActiveSection('project')}
              className={`w-full text-left p-2 mb-2 rounded ${activeSection === 'project' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            >
              📘 Project Info
            </button>
          </ul>
        </nav>
      </div>
      <main className="flex-grow p-6 overflow-y-auto flex">
        <div className="w-2/3 pr-6">
          {renderContent()}
        </div>
        <div className="w-1/3 bg-white shadow-md rounded-lg flex flex-col">
          <div 
            ref={chatboxRef}
            className="flex-grow overflow-y-auto p-4"
          >
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-2 p-2 rounded ${
                  msg.sender === 'bot' 
                    ? 'bg-blue-100 text-left self-start' 
                    : 'bg-green-100 text-right self-end'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your health question..."
              className="flex-grow p-2 border rounded-l"
            />
            <button 
              onClick={sendMessage}
              disabled={isReceiving}
              className="bg-blue-500 text-white p-2 rounded-r"
            >
              {isReceiving ? '...' : 'Send'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MedicalAIDashboard;
