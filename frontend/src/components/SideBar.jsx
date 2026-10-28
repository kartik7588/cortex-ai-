import { useEffect, useRef, useState } from 'react'
import { Check, Coins, LogOut, Menu, MoreHorizontal, PanelLeftClose, PanelLeftOpen, Pencil, Plus, Trash2, User, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../features/getConversations'
import { updateConversation } from '../features/updateConversation'
import { deleteConversation } from '../features/deleteConversation'
import { removeConversation, setConversations, setConvTitle, setSelectedConversation } from '../redux/conversationSlice'
import logOut from '../features/logOut'
import { setUserdata } from '../redux/userSlice'
import BillingDrawer from './BillingDrawer'

function SideBar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showBilling, setShowBilling] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [menuId, setMenuId] = useState(null)
  const [renamingId, setRenamingId] = useState(null)
  const [renameValue, setRenameValue] = useState('')
  const [busyId, setBusyId] = useState(null)
  const [actionError, setActionError] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)
  const renameRef = useRef(null)
  const deleteDialogRef = useRef(null)
  const cancelDeleteRef = useRef(null)
  const previousFocusRef = useRef(null)
  const dispatch = useDispatch()
  const { conversations, selectedConversation } = useSelector((state) => state.conversation)
  const { userData } = useSelector((state) => state.user)

  useEffect(() => {
    if (userData) getConversations().then((data) => dispatch(setConversations(data || [])))
  }, [dispatch, userData])

  useEffect(() => {
    if (!menuId) return
    const close = (event) => {
      if (!event.target.closest('.conversation-menu')) setMenuId(null)
    }
    const escape = (event) => { if (event.key === 'Escape') setMenuId(null) }
    window.addEventListener('pointerdown', close)
    window.addEventListener('keydown', escape)
    return () => { window.removeEventListener('pointerdown', close); window.removeEventListener('keydown', escape) }
  }, [menuId])

  useEffect(() => { if (renamingId) renameRef.current?.select() }, [renamingId])

  useEffect(() => {
    if (!pendingDelete) return
    previousFocusRef.current = document.activeElement
    requestAnimationFrame(() => cancelDeleteRef.current?.focus())
    const handleKey = (event) => {
      if (event.key === 'Escape' && deleteDialogRef.current?.getAttribute('aria-busy') !== 'true') setPendingDelete(null)
      if (event.key !== 'Tab') return
      const controls = [...deleteDialogRef.current.querySelectorAll('button:not(:disabled)')]
      if (!controls.length) return
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      previousFocusRef.current?.focus?.()
    }
  }, [pendingDelete])

  const select = (conversation) => {
    dispatch(setSelectedConversation(conversation))
    setMobileOpen(false)
    setMenuId(null)
  }

  const beginRename = (conversation) => {
    setMenuId(null)
    setRenamingId(conversation._id)
    setRenameValue(conversation.title === 'New Chat' ? '' : conversation.title)
    setActionError('')
  }

  const saveRename = async (conversationId) => {
    const title = renameValue.trim()
    if (!title) { setActionError('Enter a name for this conversation.'); return }
    setBusyId(conversationId)
    try {
      const updated = await updateConversation({ id: conversationId, title })
      dispatch(setConvTitle({ conversationId, title: updated.title }))
      setRenamingId(null)
    } catch {
      setActionError('Conversation could not be renamed. Try again.')
    } finally { setBusyId(null) }
  }

  const requestDelete = (conversation) => {
    setMenuId(null)
    setActionError('')
    setPendingDelete(conversation)
  }

  const confirmDelete = async () => {
    const conversation = pendingDelete
    if (!conversation) return
    setBusyId(conversation._id)
    setActionError('')
    try {
      await deleteConversation(conversation._id)
      dispatch(removeConversation(conversation._id))
      setPendingDelete(null)
    } catch {
      setActionError('Conversation could not be deleted. Try again.')
    } finally { setBusyId(null) }
  }

  return <>
    <button className="icon-button fixed left-3 top-2 z-30 border border-[var(--line)] bg-[var(--rail)] lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open conversations"><Menu size={18}/></button>
    {mobileOpen && <button className="fixed inset-0 z-30 bg-black/70 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close conversations"/>}
    <aside className={`fixed inset-y-0 left-0 z-40 flex shrink-0 flex-col border-r border-[var(--line)] bg-[var(--rail)] transition-[width,transform] duration-200 lg:static ${collapsed ? 'lg:w-14' : 'lg:w-[272px]'} w-[min(88vw,320px)] ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`} aria-label="Conversation navigation">
      <div className={`flex h-14 shrink-0 items-center border-b border-[var(--line)] ${collapsed ? 'justify-center px-2' : 'gap-3 px-4'}`}>
        <button className="icon-button lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close conversations"><X size={18}/></button>
        {!collapsed && <><span className="grid h-7 w-7 place-items-center border border-[var(--line-strong)] text-sm font-semibold text-[var(--accent)]">C</span><span className="flex-1 text-sm font-semibold">CortexAI</span></>}
        <button className="icon-button hidden lg:inline-flex" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <PanelLeftOpen size={17}/> : <PanelLeftClose size={17}/>}</button>
      </div>
      <div className={collapsed ? 'px-2 py-3' : 'p-3'}><button className={collapsed ? 'icon-button w-full' : 'text-button w-full justify-start border border-[var(--line)]'} onClick={() => select(null)} aria-label="New conversation"><Plus size={17}/>{!collapsed && <span className="text-sm font-semibold">New conversation</span>}</button></div>
      {!collapsed && <div className="px-4 pb-2 pt-2 text-xs font-medium text-[var(--text-muted)]">Recent</div>}
      <nav className="flex-1 overflow-y-auto px-2">
        {conversations.length === 0 && !collapsed ? <p className="px-2 py-3 text-sm leading-6 text-[var(--text-muted)]">Your saved conversations will appear here.</p> : conversations.map((conversation) => {
          const active = selectedConversation?._id === conversation._id
          const renaming = renamingId === conversation._id
          const busy = busyId === conversation._id
          return <div key={conversation._id} className={`group relative mb-0.5 flex min-h-10 items-center ${active ? 'bg-[var(--surface-raised)] text-[var(--text)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text)]'}`}>
            {active && <span className="absolute inset-y-2 left-0 w-px bg-[var(--accent)]"/>}
            {renaming ? <form className="flex min-w-0 flex-1 items-center gap-1 px-2" onSubmit={(event) => { event.preventDefault(); saveRename(conversation._id) }}>
              <input ref={renameRef} value={renameValue} maxLength={80} disabled={busy} onChange={(event) => setRenameValue(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); setRenamingId(null) } }} className="min-w-0 flex-1 border border-[var(--accent)] bg-[var(--bg)] px-2 py-1 text-[13px] outline-none" aria-label="Conversation name"/>
              <button className="icon-button h-7 w-7" type="submit" disabled={busy} aria-label="Save conversation name"><Check size={14}/></button>
              <button className="icon-button h-7 w-7" type="button" onClick={() => setRenamingId(null)} aria-label="Cancel rename"><X size={14}/></button>
            </form> : <button onClick={() => select(conversation)} title={collapsed ? conversation.title : undefined} disabled={busy} className={`min-w-0 flex-1 self-stretch bg-transparent text-left ${collapsed ? 'px-2 text-center' : 'pl-3 pr-1'} disabled:opacity-50`} aria-current={active ? 'page' : undefined}>{collapsed ? <span className="mono text-[11px]">{(conversation.title || 'N')[0].toUpperCase()}</span> : <span className="block truncate text-[13px] font-medium">{conversation.title === 'New Chat' ? 'New conversation' : conversation.title}</span>}</button>}
            {!collapsed && !renaming && <div className="conversation-menu relative mr-1">
              <button className={`icon-button h-8 w-8 ${menuId === conversation._id ? 'bg-[var(--surface-hover)] text-[var(--text)]' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'}`} onClick={() => setMenuId(menuId === conversation._id ? null : conversation._id)} aria-label={`Actions for ${conversation.title}`} aria-haspopup="menu" aria-expanded={menuId === conversation._id}><MoreHorizontal size={16}/></button>
              {menuId === conversation._id && <div className="absolute right-0 top-9 z-20 w-36 border border-[var(--line-strong)] bg-[var(--surface-raised)] p-1 shadow-[0_12px_30px_rgba(0,0,0,.35)]" role="menu">
                <button className="text-button w-full justify-start text-xs" role="menuitem" onClick={() => beginRename(conversation)}><Pencil size={14}/>Rename</button>
                <button className="text-button w-full justify-start text-xs text-[var(--danger)]" role="menuitem" onClick={() => requestDelete(conversation)}><Trash2 size={14}/>Delete</button>
              </div>}
            </div>}
          </div>
        })}
        {actionError && <p className="px-2 py-3 text-xs leading-5 text-[var(--danger)]" role="alert">{actionError}</p>}
      </nav>
      <div className="border-t border-[var(--line)] p-2">
        {!collapsed && <button className="flex w-full items-center gap-3 px-2 py-2 text-left hover:bg-[var(--surface)]" onClick={() => setShowBilling(true)}><span className="mono text-[11px] text-[var(--accent)]">{userData?.credits ?? 0}</span><span className="flex-1 text-xs text-[var(--text-secondary)]">credits remaining</span><Coins size={15} className="text-[var(--text-muted)]"/></button>}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-2 py-2`}>{userData?.avatar && !imageError ? <img className="h-8 w-8 object-cover" src={userData.avatar} alt="" onError={() => setImageError(true)}/> : <span className="grid h-8 w-8 place-items-center bg-[var(--surface-raised)]"><User size={15}/></span>}{!collapsed && <><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{userData?.name || 'Account'}</p><p className="mt-0.5 text-[11px] capitalize text-[var(--text-muted)]">{userData?.plan || 'free'} plan</p></div><button className="icon-button" onClick={() => { logOut(); dispatch(setUserdata(null)) }} aria-label="Sign out"><LogOut size={16}/></button></>}</div>
      </div>
    </aside>
    {pendingDelete && <div className="fixed inset-0 z-60 flex items-center justify-center p-4" role="presentation">
      <button className="absolute inset-0 bg-black/75" onClick={() => { if (!busyId) setPendingDelete(null) }} aria-label="Cancel deletion"/>
      <section ref={deleteDialogRef} className="relative w-full max-w-[420px] border border-[var(--line-strong)] bg-[var(--rail)] shadow-[0_24px_70px_rgba(0,0,0,.55)]" role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-description" aria-busy={Boolean(busyId)}>
        <div className="border-b border-[var(--line)] px-5 py-4">
          <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center bg-[color-mix(in_srgb,var(--danger)_12%,transparent)] text-[var(--danger)]"><Trash2 size={16}/></span><h2 id="delete-title" className="text-base font-semibold">Delete conversation?</h2></div>
        </div>
        <div className="px-5 py-5">
          <p id="delete-description" className="text-sm leading-6 text-[var(--text-secondary)]">“{pendingDelete.title === 'New Chat' ? 'New conversation' : pendingDelete.title}” and all of its messages will be permanently deleted.</p>
          <p className="mt-3 text-xs text-[var(--text-muted)]">This action cannot be undone.</p>
          {actionError && <p className="mt-4 text-sm text-[var(--danger)]" role="alert">{actionError}</p>}
        </div>
        <div className="flex justify-end gap-2 border-t border-[var(--line)] px-5 py-4">
          <button ref={cancelDeleteRef} className="text-button" disabled={Boolean(busyId)} onClick={() => setPendingDelete(null)}>Cancel</button>
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[var(--danger)] px-4 text-sm font-semibold text-[#21110e] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60" disabled={Boolean(busyId)} onClick={confirmDelete}><Trash2 size={15}/>{busyId ? 'Deleting…' : 'Delete conversation'}</button>
        </div>
      </section>
    </div>}
    <BillingDrawer open={showBilling} onClose={() => setShowBilling(false)}/>
  </>
}

export default SideBar
