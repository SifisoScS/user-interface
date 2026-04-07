import { useRef, useCallback } from 'react'

interface Props {
  direction: 'horizontal' | 'vertical'
  onDrag: (delta: number) => void
}

export function ResizableSplitter({ direction, onDrag }: Props) {
  const dragging = useRef(false)
  const last = useRef(0)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragging.current = true
    last.current = direction === 'horizontal' ? e.clientX : e.clientY

    const onMove = (mv: MouseEvent) => {
      if (!dragging.current) return
      const cur = direction === 'horizontal' ? mv.clientX : mv.clientY
      onDrag(cur - last.current)
      last.current = cur
    }
    const onUp = () => {
      dragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [direction, onDrag])

  const isH = direction === 'horizontal'

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        width: isH ? '4px' : '100%',
        height: isH ? '100%' : '4px',
        cursor: isH ? 'col-resize' : 'row-resize',
        flexShrink: 0,
        backgroundColor: '#1E293B',
        transition: 'background-color 0.15s',
        zIndex: 10,
      }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3B82F620')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1E293B')}
    />
  )
}
