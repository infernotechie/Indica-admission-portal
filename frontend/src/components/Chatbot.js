// src/components/Chatbot.js
import React, { useState, useEffect, useRef, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { AuthContext } from "../contexts/AuthContext";
import "./Chatbot.css";

const Chatbot = () => {
  const { user } = useContext(AuthContext); // ✅ use context
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [currentChat, setCurrentChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    autoResizeInput();
  }, [currentChat, isTyping]);

  const autoResizeInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const messageToSend = input;
    setCurrentChat((prev) => [...prev, { from: "user", text: messageToSend }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:8000/api/chatbot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: messageToSend }),
      });
      const data = await res.json();
      const botReply = data.reply || "Sorry, I couldn't understand that.";
      setCurrentChat((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch {
      setCurrentChat((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Error: Unable to connect to server." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    autoResizeInput();
  };

  return (
    <div className="chatbot-container">
      {/* ✅ Show button only if user is logged in */}
      {user && (
        <button className="chatbot-toggle" onClick={toggleChat}>
          💬
        </button>
      )}

      {isOpen && user && (
        <div className="chatbot-window">
          <div className="chat-main">
            <div className="chatbot-header">
              <h4>Indica Chatbot</h4>
              <button onClick={toggleChat} className="close-btn">
                ×
              </button>
            </div>

            <div className="chatbot-messages">
              {currentChat.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.from}`}>
                  {msg.from === "bot" ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    <>{msg.text}</>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="chat-message bot typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-input">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Type a message..."
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSend}>➤</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
