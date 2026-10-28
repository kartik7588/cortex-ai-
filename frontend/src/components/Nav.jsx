import { useSelector } from 'react-redux'
function Nav(){
  const {selectedConversation}=useSelector((state)=>state.conversation)
  const {messages}=useSelector((state)=>state.message)
  if(!selectedConversation)return null
  return <header className="flex h-14 shrink-0 items-center border-b border-[var(--line)] px-5 pl-15 lg:pl-6"><h1 className="min-w-0 flex-1 truncate text-sm font-semibold tracking-[-0.015em]">{selectedConversation.title||'New conversation'}</h1><span className="mono ml-4 text-[11px] text-[var(--text-muted)]">{messages.length} {messages.length===1?'message':'messages'}</span></header>
}
export default Nav
