import { useState } from 'react';
import Icon from '@/components/ui/icon';

const MOCK_CHATS = [
  {
    id: 'c1',
    seller: 'СтройМастер',
    lot: 'Ремонт квартир под ключ',
    lastMsg: 'Да, завтра в 14:00 подойдёт.',
    time: '14:32',
    unread: 1,
    messages: [
      { id: 'm1', from: 'me', text: 'Добрый день! Интересует ремонт 65 м², возможно встретиться?', time: '14:20' },
      { id: 'm2', from: 'them', text: 'Здравствуйте! Конечно, можем встретиться или обсудить онлайн.', time: '14:25' },
      { id: 'm3', from: 'me', text: 'Когда вам удобно?', time: '14:30' },
      { id: 'm4', from: 'them', text: 'Да, завтра в 14:00 подойдёт.', time: '14:32' },
    ]
  },
  {
    id: 'c2',
    seller: 'Алексей М.',
    lot: 'iPhone 14 Pro 256GB',
    lastMsg: 'Телефон ещё актуален?',
    time: 'Вчера',
    unread: 0,
    messages: [
      { id: 'm1', from: 'me', text: 'Телефон ещё актуален?', time: 'Вчера 18:00' },
    ]
  },
];

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<typeof MOCK_CHATS[0] | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_CHATS[0]?.messages || []);

  const handleSelectChat = (chat: typeof MOCK_CHATS[0]) => {
    setSelectedChat(chat);
    setMessages(chat.messages);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { id: `m${Date.now()}`, from: 'me', text: message.trim(), time: 'Сейчас' }]);
    setMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 animate-fade-in">
      <h1 className="text-2xl font-black text-foreground mb-5">Сообщения</h1>

      <div className="bg-card border border-border rounded-2xl overflow-hidden" style={{ height: '65vh' }}>
        <div className="flex h-full">
          {/* Chat list */}
          <div className={`${selectedChat ? 'hidden sm:flex' : 'flex'} w-full sm:w-72 flex-col border-r border-border shrink-0`}>
            <div className="p-3 border-b border-border">
              <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
                <Icon name="Search" size={14} className="text-muted-foreground" />
                <input placeholder="Поиск..." className="bg-transparent text-sm text-foreground outline-none flex-1 placeholder:text-muted-foreground" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {MOCK_CHATS.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleSelectChat(chat)}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors border-b border-border/50 text-left ${selectedChat?.id === chat.id ? 'bg-secondary' : ''}`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm shrink-0">
                      {chat.seller.charAt(0)}
                    </div>
                    {chat.unread > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-0.5">
                      <p className="text-sm font-semibold text-foreground">{chat.seller}</p>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{chat.lastMsg}</p>
                    <p className="text-[10px] text-muted-foreground/60 truncate">{chat.lot}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat window */}
          {selectedChat ? (
            <div className="flex-1 flex flex-col min-w-0">
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <button onClick={() => setSelectedChat(null)} className="sm:hidden text-muted-foreground">
                  <Icon name="ArrowLeft" size={20} />
                </button>
                <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                  {selectedChat.seller.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{selectedChat.seller}</p>
                  <p className="text-xs text-muted-foreground">{selectedChat.lot}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${msg.from === 'me' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-secondary text-foreground rounded-bl-sm'}`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.from === 'me' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Напишите сообщение..."
                  className="flex-1 bg-secondary text-foreground text-sm px-4 py-2.5 rounded-xl outline-none border border-transparent focus:border-primary placeholder:text-muted-foreground"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl flex items-center justify-center transition-colors"
                >
                  <Icon name="Send" size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex flex-1 items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Icon name="MessageCircle" size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Выберите чат</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
