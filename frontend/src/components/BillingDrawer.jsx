import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import { createOrder } from '../features/createOrder'
import { verifyPayment } from '../features/verifyPayment'

const plans = [
  { id: 'starter', name: 'Starter', price: 199, credits: 500 },
  { id: 'pro', name: 'Pro', price: 499, credits: 1000 },
]

function BillingDrawer({ open, onClose }) {
  const { userData } = useSelector((state) => state.user)
  const [status, setStatus] = useState('idle')
  const [statusText, setStatusText] = useState('')
  const drawerRef = useRef(null)
  const closeRef = useRef(null)
  const previousFocus = useRef(null)

  useEffect(() => {
    if (!open) return
    previousFocus.current = document.activeElement
    requestAnimationFrame(() => closeRef.current?.focus())
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const nodes = [...drawerRef.current.querySelectorAll('button:not(:disabled), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', handleKey)
    return () => { window.removeEventListener('keydown', handleKey); previousFocus.current?.focus?.() }
  }, [open, onClose])

  const upgrade = async (plan) => {
    setStatus('loading'); setStatusText('Preparing secure checkout…')
    try {
      const data = await createOrder(plan)
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'CortexAI', description: `${data.plan.name} Plan`, order_id: data.order.id,
        handler: async (response) => {
          try { await verifyPayment(response); setStatus('success'); setStatusText('Payment verified. Your plan is now active.') }
          catch { setStatus('error'); setStatusText('Payment was received but verification failed. Please contact support.') }
        },
        modal: { ondismiss: () => { setStatus('idle'); setStatusText('Checkout closed. No charge was made.') } },
        theme: { color: '#8fb59d' },
      }
      new window.Razorpay(options).open()
    } catch { setStatus('error'); setStatusText('Checkout could not be opened. Try again in a moment.') }
  }

  const credits = userData?.credits ?? 0
  const total = userData?.totalCredits || 100
  const percentage = Math.min(100, Math.max(0, (credits / total) * 100))

  return <AnimatePresence>{open && <>
    <motion.button initial={{ opacity: 0 }} animate={{ opacity: .72 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black" onClick={onClose} aria-label="Close plan and usage" />
    <motion.aside ref={drawerRef} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: .22, ease: [.22, 1, .36, 1] }} className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[440px] flex-col border-l border-[var(--line)] bg-[var(--rail)]" role="dialog" aria-modal="true" aria-labelledby="billing-title">
      <header className="flex h-16 items-center border-b border-[var(--line)] px-5"><div className="flex-1"><h2 id="billing-title" className="text-base font-semibold">Plan and usage</h2><p className="mt-0.5 text-xs text-[var(--text-muted)]">Credits renew with each plan purchase.</p></div><button ref={closeRef} className="icon-button" onClick={onClose} aria-label="Close plan and usage"><X size={18}/></button></header>
      <div className="flex-1 overflow-y-auto p-5"><section><div className="flex items-end justify-between"><div><p className="text-xs text-[var(--text-muted)]">Current plan</p><p className="mt-1 text-2xl font-medium capitalize tracking-[-0.03em]">{userData?.plan || 'free'}</p></div><p className="mono text-xs text-[var(--text-secondary)]">{credits} / {total}</p></div><div className="mt-5 h-1 bg-[var(--surface-raised)]" aria-label={`${credits} of ${total} credits remaining`}><div className="h-full bg-[var(--accent)] transition-[width]" style={{ width: `${percentage}%` }}/></div><p className="mt-2 text-xs text-[var(--text-muted)]">{Math.round(percentage)}% of credits remaining</p></section>
        <section className="mt-10"><h3 className="text-sm font-semibold">Available plans</h3><div className="mt-3 border-y border-[var(--line)]">{plans.map((plan, index) => { const current = userData?.plan === plan.id; return <div key={plan.id} className={`grid grid-cols-[1fr_auto] gap-4 py-5 ${index === 0 ? 'border-b border-[var(--line)]' : ''}`}><div><div className="flex items-center gap-2"><h4 className="font-semibold">{plan.name}</h4>{current && <span className="flex items-center gap-1 text-xs text-[var(--accent)]"><CheckCircle2 size={13}/>Current</span>}</div><p className="mt-1 text-sm text-[var(--text-secondary)]">{plan.credits} credits · 30 days</p><p className="mono mt-3 text-xl">₹{plan.price}</p></div><button className={current ? 'text-button self-end' : 'primary-action self-end'} disabled={current || status === 'loading'} onClick={() => upgrade(plan.id)}>{current ? 'Active' : status === 'loading' ? 'Opening…' : 'Choose plan'}</button></div> })}</div></section>
        {statusText && <p className={`mt-5 text-sm leading-6 ${status === 'error' ? 'text-[var(--danger)]' : status === 'success' ? 'text-[var(--success)]' : 'text-[var(--text-secondary)]'}`} role="status">{statusText}</p>}
      </div><footer className="border-t border-[var(--line)] px-5 py-4 text-xs leading-5 text-[var(--text-muted)]">Payments are processed by Razorpay. Prices are shown in INR.</footer>
    </motion.aside>
  </>}</AnimatePresence>
}

export default BillingDrawer
