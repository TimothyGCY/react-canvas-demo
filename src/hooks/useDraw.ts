import { useEffect, useRef } from 'react'

export const useDraw = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const isDrawingRef = useRef<boolean>(false)

	const mouseMoveRef = useRef(null)
	const mouseDownRef = useRef(null)
	const mouseUpRef = useRef(null)
	const mouseLeaveRef = useRef(null)

	useEffect(() => {
		console.log('loaded')
	}, [])

}

