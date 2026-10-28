import { useEffect } from 'react'
import Nav from './Nav'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { useDispatch, useSelector } from 'react-redux'
import getMessages from '../features/getMessages'
import { setArtifacts, setMessages } from '../redux/messageSlice'

function ChatArea() {
  const {selectedConversation}=useSelector(state=>state.conversation)
  const dispatch=useDispatch()
  useEffect(()=>{
    let cancelled=false
    dispatch(setMessages([]))
    dispatch(setArtifacts([]))
    if(!selectedConversation||selectedConversation.title==="New Chat")return()=>{cancelled=true}
    const getMesg=async()=>{
      const data=await getMessages(selectedConversation._id)
      if(cancelled)return
      const nextMessages=Array.isArray(data)?data:[]
      dispatch(setMessages(nextMessages))
      const latestArtifactMessage=[...nextMessages].reverse().find(msg=>msg.artifacts?.length)
      dispatch(setArtifacts(latestArtifactMessage?.artifacts||[]))
    }
    getMesg()
    return()=>{cancelled=true}
  },[dispatch,selectedConversation])
  return (
    <div className='flex-1 flex flex-col min-w-0'>
      <Nav/>
      <MessageList/>
      <ChatInput/>
    </div>
  )
}

export default ChatArea
