import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { commands as cmdMap, type CommandResult } from './commands'

interface HistoryEntry {
  type: 'input' | 'output' | 'error' | 'system'
  text: string
}

export default function TerminalOverlay() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'system', text: `AarushOS v1.0 — Type 'help' for available commands.` },
  ])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { theme, setTheme, themes } = useTheme()
  const cmdHistory = useRef<string[]>([])

  const addOutput = useCallback((result: CommandResult) => {
    setHistory(h => [...h, { type: result.type || 'output', text: result.text || '' }])
    if (result.clear) {
      setHistory([])
    }
    if (result.navigate) {
      navigate(result.navigate)
      setOpen(false)
    }
    if (result.theme && themes.find(t => t.id === result.theme)) {
      setTheme(result.theme)
    }
  }, [navigate, setTheme, themes])

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    setHistory(h => [...h, { type: 'input' as const, text: `$ ${trimmed}` }])
    cmdHistory.current.push(trimmed)
    setHistoryIdx(-1)

    const parts = trimmed.split(/\s+/)
    const name = parts[0].toLowerCase()
    const args = parts.slice(1)

    const handler = cmdMap[name]

    if (handler) {
      const result = handler({ args, theme, themes, setTheme, navigate })
      addOutput(result)
    } else {
      setHistory(h => [...h, { type: 'error', text: `Unknown command: ${name}. Type 'help' for available commands.` }])
    }
  }, [theme, themes, setTheme, navigate, addOutput])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  function onInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      executeCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.current.length > 0) {
        const newIdx = historyIdx === -1 ? cmdHistory.current.length - 1 : Math.max(0, historyIdx - 1)
        setHistoryIdx(newIdx)
        setInput(cmdHistory.current[newIdx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx >= 0) {
        const newIdx = historyIdx + 1
        if (newIdx >= cmdHistory.current.length) {
          setHistoryIdx(-1)
          setInput('')
        } else {
          setHistoryIdx(newIdx)
          setInput(cmdHistory.current[newIdx])
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const partial = input.trim().toLowerCase()
      if (partial) {
        const matches = Object.keys(cmdMap).filter(c => c.startsWith(partial))
        if (matches.length === 1) {
          setInput(matches[0] + ' ')
        } else if (matches.length > 1) {
          setHistory(h => [...h, { type: 'system', text: matches.join('  ') }])
        }
      }
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 left-8 z-50 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all backdrop-blur-xl"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-muted)',
          }}
          aria-label="Open terminal"
          title="Open terminal (Ctrl+`)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          Terminal
        </button>
      )}
      {open && (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={() => setOpen(false)}>
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'rgba(0,0,0,0.92)', border: '1px solid rgba(var(--color-primary), 0.2)' }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="Terminal"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid rgba(var(--color-primary), 0.1)' }}>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgb(var(--color-primary))' }} />
            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>aarush@portfolio:~$</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-xs px-2 py-1 rounded transition-colors"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Close terminal"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div ref={scrollRef} className="p-4 overflow-y-auto font-mono text-sm leading-relaxed" style={{ maxHeight: '60vh', color: 'var(--text-primary)' }}>
          {history.map((entry, i) => {
            let color = 'var(--text-primary)'
            if (entry.type === 'output') color = 'var(--text-muted)'
            else if (entry.type === 'error') color = '#EF4444'
            else if (entry.type === 'system') color = 'rgb(var(--color-primary))'
            else if (entry.type === 'input') color = 'var(--text-primary)'

            return (
              <div key={i} className="whitespace-pre-wrap break-words mb-1" style={{ color }}>
                {entry.type === 'input' ? (
                  <span>
                    <span style={{ color: 'rgb(var(--color-primary))' }}>$</span> {entry.text.slice(2)}
                  </span>
                ) : entry.text}
              </div>
            )
          })}
          <div className="flex items-center gap-1.5 mt-1">
            <span style={{ color: 'rgb(var(--color-primary))' }}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onInputKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-sm"
              style={{ color: 'var(--text-primary)', caretColor: 'rgb(var(--color-primary))' }}
              aria-label="Terminal input"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  )}
    </>
  )
}
