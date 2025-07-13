import "../css/ChatBot.css"
import React, { useState } from 'react';
import axios from 'axios';

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'مرحبًا، أنا مساعد منصة مرويات.'
    },
    {
      sender: 'assistant',
      text: 'مهمتي مساعدتك في استكشاف القصص النبوية، معرفة مواقعها الجغرافية، ترجمتها، أو البحث عن أماكن محددة.'
    },
    {
      sender: 'assistant',
      text: 'كيف يمكنني مساعدتك اليوم؟'
    }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    try {
      // استبدل هذا باستدعاء API الخاص بك
      const response = await axios.post('/api/chat', { question: input });
      const assistantMessage = response.data.reply;

      setMessages(prev => [...prev, { sender: 'assistant', text: assistantMessage }]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: 'assistant', text: 'حدث خطأ أثناء الاتصال بالخادم.' }
      ]);
    }

    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
<div className="chat-button" onClick={toggleChat}>
  🤖 المساعد الذكي
</div>

      {isOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <span>مساعد مرويات</span>
            <button onClick={toggleChat}>×</button>
          </div>

          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble ${msg.sender}`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              ></div>
            ))}
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="اكتب سؤالك هنا..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSend();
              }}
            />
            <button onClick={handleSend}>إرسال</button>
          </div>

          <div className="quick-buttons">
            <button
              onClick={() =>
                setMessages(prev => [
                  ...prev,
                  { sender: 'assistant', text: 'اكتب اسم المكان للحصول على الملخص.' }
                ])
              }
            >
              طلب ملخص القصة
            </button>
            <button
              onClick={() =>
                setMessages(prev => [
                  ...prev,
                  { sender: 'assistant', text: 'اكتب اسم المكان لمعرفة موقعه الجغرافي.' }
                ])
              }
            >
              احداثيات و المدينة
            </button>
            <button
              onClick={() =>
                setMessages(prev => [
                  ...prev,
                  { sender: 'assistant', text: 'اكتب اسم المكان لترجمة ملخصه للإنجليزية.' }
                ])
              }
            >
              ترجمة الملخص
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
