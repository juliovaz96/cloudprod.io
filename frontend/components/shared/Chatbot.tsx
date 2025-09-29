import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { MessageSquare, X, Send, Minimize2, Maximize2, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hi! I'm the C2PLabs AI assistant. I can help you with questions about our platform, deployment strategies, or getting started with cloud infrastructure. What would you like to know?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const suggestedQuestions = [
  "How do I get started with C2PLabs?",
  "What cloud providers do you support?",
  "Can I deploy to multiple clouds?",
  "How does the prompt-to-prototype feature work?",
  "What's included in the free tier?"
];

const botResponses: Record<string, string> = {
  "how do i get started": "Getting started with C2PLabs is easy! Simply sign up for a free account, and you can immediately start using our prompt-to-prototype feature. Just describe your infrastructure needs in natural language, and our AI will generate a production-ready architecture.",
  "cloud providers": "C2PLabs supports all major cloud providers including AWS, Azure, Google Cloud Platform, and on-premises infrastructure. You can deploy to multiple clouds simultaneously with our unified management interface.",
  "multiple clouds": "Yes! One of C2PLabs' key features is multi-cloud deployment. You can design your infrastructure once and deploy it across AWS, Azure, GCP, or any combination of clouds. Our platform handles the provider-specific configurations automatically.",
  "prompt-to-prototype": "Our prompt-to-prototype feature uses advanced AI to convert your natural language descriptions into complete infrastructure architectures. Simply describe what you need (e.g., 'I need a scalable web app with database and caching'), and we'll generate the full cloud architecture with best practices built-in.",
  "free tier": "Our free tier includes access to the prompt-to-prototype feature, visual canvas designer, basic templates, and deployment to one cloud environment. You can create up to 3 projects and deploy up to 5 resources per month.",
  "pricing": "We offer flexible pricing starting with a free tier. Paid plans include unlimited projects, advanced features, team collaboration, enterprise security, and priority support. Visit our pricing page for detailed information.",
  "support": "We provide comprehensive support including documentation, video tutorials, community forums, and direct support for paid plans. Our team typically responds within 24 hours.",
  "default": "I'd be happy to help! You can ask me about getting started, our features, pricing, supported cloud providers, or any technical questions about infrastructure deployment."
};

export function Chatbot({ isOpen, onToggle, className }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return botResponses.default;
  };

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputValue.trim();
    if (!content) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(content),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={onToggle}
          size="lg"
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        height: isMinimized ? 'auto' : '500px'
      }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-6 right-6 z-50 ${className}`}
    >
      <Card className={`w-80 ${isMinimized ? 'h-auto' : 'h-[500px]'} flex flex-col shadow-2xl`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">C2PLabs Assistant</h3>
              <p className="text-xs text-muted-foreground">Usually replies instantly</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-8 h-8"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="w-8 h-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-3 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ml-2 mr-2 ${
                    message.sender === 'user' ? 'order-1 bg-secondary' : 'order-2 bg-primary'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-3 h-3" />
                    ) : (
                      <Bot className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-1">
                  {suggestedQuestions.slice(0, 3).map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(question)}
                      className="text-xs h-6 px-2"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows={1}
                  className="flex-1 resize-none border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  );
}