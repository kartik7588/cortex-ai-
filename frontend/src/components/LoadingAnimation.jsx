import{motion}from'motion/react'
function LoadingAnimation(){return <div className="flex items-center gap-3 py-2" role="status"><span className="relative h-3 w-3"><motion.span className="absolute inset-0 bg-[var(--accent)]" animate={{opacity:[.25,1,.25]}} transition={{duration:1.4,repeat:Infinity}}/></span><span className="text-sm text-[var(--text-secondary)]">Working on your request…</span></div>}
export default LoadingAnimation
