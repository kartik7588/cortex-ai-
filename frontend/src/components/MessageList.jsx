import{useEffect,useRef}from'react'
import{useSelector}from'react-redux'
import{Braces,FileSearch,Globe2,Image,Presentation,Waypoints}from'lucide-react'
import MessageBubble from'./MessageBubble'
import LoadingAnimation from'./LoadingAnimation'
const starters=[['Explain or reason through a problem',Waypoints],['Build or debug code',Braces],['Research current information',Globe2],['Analyze a PDF',FileSearch],['Create a presentation',Presentation],['Work with an image',Image]]
function MessageList(){
 const{selectedConversation}=useSelector(s=>s.conversation),{messages,isLoading}=useSelector(s=>s.message),bottomRef=useRef(null)
 useEffect(()=>{requestAnimationFrame(()=>bottomRef.current?.scrollIntoView({behavior:'smooth',block:'end'}))},[messages.length,isLoading])
 const empty=messages.length===0||!selectedConversation
 return <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-10" aria-label="Conversation">{empty?<div className="mx-auto flex min-h-full max-w-[820px] flex-col justify-center py-10"><div className="max-w-2xl"><h1 className="text-3xl font-medium leading-tight tracking-[-0.035em] md:text-4xl">Start with the work in front of you.</h1><p className="mt-4 max-w-xl text-[15px] leading-7 text-[var(--text-secondary)]">CortexAI routes each request to the right specialist. Choose one yourself in the composer, or leave it on Auto.</p></div><div className="mt-10 border-y border-[var(--line)]">{starters.map(([label,Icon],i)=><div key={label} className={`flex items-center gap-4 py-3.5 ${i<starters.length-1?'border-b border-[var(--line)]':''}`}><Icon size={17} className="text-[var(--accent)]" aria-hidden="true"/><span className="text-sm text-[var(--text-secondary)]">{label}</span><span className="mono ml-auto hidden text-[10px] text-[var(--text-muted)] sm:block">{String(i+1).padStart(2,'0')}</span></div>)}</div><p className="mt-6 text-xs text-[var(--text-muted)]">Attach a PDF or image directly in the composer when source material matters.</p></div>:<div className="mx-auto max-w-[820px] space-y-8">{messages.map((msg,i)=><MessageBubble key={msg._id||`${msg.role}-${i}`} role={msg.role} content={msg.content} images={msg.images||[]}/>)}{isLoading&&<LoadingAnimation/>}</div>}<div ref={bottomRef}/></main>
}
export default MessageList
