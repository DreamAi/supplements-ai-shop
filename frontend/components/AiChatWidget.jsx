import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

export default function AiChatWidget(){
  const [open,setOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const ref = useRef();

  const send = async () => {
    if(!text) return;
    const userMsg = { role:"user", content:text };
    setMessages(prev=>[...prev, userMsg]);
    setText('');
    try{
      const res = await axios.post('/api/ai-chat', { message: text });
      setMessages(prev=>[...prev, { role:"assistant", content: res.data.reply }]);
    }catch(e){
      setMessages(prev=>[...prev, { role:"assistant", content: "Sorry — I'm having trouble right now." }]);
    }
  };

  useEffect(()=>{ if(ref.current) ref.current.scrollTop = ref.current.scrollHeight; },[messages]);

  return (
    <div className="fixed bottom-6 right-6 w-80 z-50">
      <div className="bg-white border rounded-lg shadow">
        <div className="p-3 flex justify-between items-center bg-black text-white rounded-t-lg">
          <div>AI Helper</div>
          <button onClick={()=>setOpen(o=>!o)}>{open ? '–' : '+'}</button>
        </div>
        {open && (
          <>
            <div ref={ref} className="h-64 overflow-auto p-3 space-y-2">
              {messages.map((m,i)=>(
                <div key={i} className={m.role==="user" ? "text-right text-sm" : "text-left text-sm"}>
                  <div className={m.role==="user" ? "inline-block bg-gray-200 px-2 py-1 rounded" : "inline-block bg-gray-100 px-2 py-1 rounded"}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 flex gap-2">
              <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 border rounded p-2" placeholder="Ask about products, orders..." />
              <button onClick={send} className="bg-black text-white px-3 rounded">Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
