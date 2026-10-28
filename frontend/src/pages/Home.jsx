import { signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { auth, googleProvider } from '../../utils/firebase'
import api from '../../utils/axios'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { setUserdata } from '../redux/userSlice'
import SideBar from '../components/SideBar'
import ChatArea from '../components/ChatArea'
import Artifact from '../components/Artifact'

function Home() {
  const { userData } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [loginState, setLoginState] = useState('idle')
  const [loginError, setLoginError] = useState('')

  const googleLogin = async () => {
    setLoginState('loading'); setLoginError('')
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const { data } = await api.post('/api/auth/login', { token: await result.user.getIdToken() })
      dispatch(setUserdata(data)); setLoginState('success')
    } catch {
      setLoginState('error'); setLoginError('Sign-in could not be completed. Check your connection and try again.')
    }
  }

  return <div className="flex h-[100dvh] overflow-hidden bg-[var(--bg)] text-[var(--text)]">
    <SideBar/><ChatArea/><Artifact/>
    {userData===null && <div className="fixed inset-0 z-50 grid bg-[var(--bg)] lg:grid-cols-[minmax(320px,0.8fr)_1.2fr]" role="dialog" aria-modal="true" aria-labelledby="signin-title">
      <section className="flex min-h-0 flex-col justify-between border-r border-[var(--line)] p-7 sm:p-10 lg:p-14">
        <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center border border-[var(--line-strong)] font-semibold text-[var(--accent)]">C</span><span className="text-sm font-semibold">CortexAI</span></div>
        <div className="max-w-[30rem] py-16"><h1 id="signin-title" className="text-4xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-5xl">A workspace for thinking and making.</h1><p className="mt-5 text-[15px] leading-7 text-[var(--text-secondary)]">Research, reason, work with documents, and inspect generated artifacts in one continuous conversation.</p></div>
        <p className="text-xs text-[var(--text-muted)]">Your conversations and generated work remain tied to your account.</p>
      </section>
      <section className="flex items-center justify-center p-6 sm:p-10"><div className="w-full max-w-sm"><h2 className="text-xl font-semibold tracking-[-0.02em]">Open your workspace</h2><p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">Sign in with Google to continue to CortexAI.</p><button className="mt-7 flex min-h-12 w-full items-center justify-center gap-3 rounded-[var(--radius-control)] bg-[#f3f2ed] px-4 text-sm font-semibold text-[#171714] transition hover:bg-white disabled:cursor-wait disabled:opacity-70" onClick={googleLogin} disabled={loginState==='loading'}><FcGoogle size={18} aria-hidden="true"/>{loginState==='loading'?'Connecting…':'Continue with Google'}</button>{loginError&&<p className="mt-4 text-sm leading-6 text-[var(--danger)]" role="alert">{loginError}</p>}<div className="mt-8 border-t border-[var(--line)] pt-5 text-xs leading-5 text-[var(--text-muted)]">Google authentication is used only to identify your CortexAI workspace.</div></div></section>
    </div>}
  </div>
}
export default Home
