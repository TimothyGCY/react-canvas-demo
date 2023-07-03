import React, { useEffect, useState } from 'react'

import './App.css'
import Canvas from './components/canvas'

const App: React.FC = () => {

	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

	useEffect(() => {
		const cvs: HTMLCanvasElement | HTMLElement | null = document.getElementById('canvas')
		if (cvs && cvs instanceof HTMLCanvasElement)
			setCanvas(cvs)
	}, [])


	const onRectClicked = () => {
		if (!canvas) return
		if (canvas.getContext) {
			const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
			if (!ctx) return
			ctx.strokeRect(50, 50, 50, 50)
		}
	}

	const onCircleClicked = () => {
		if (!canvas) return
		if (canvas.getContext) {
			const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
			if (!ctx) return

			ctx.beginPath()
			ctx.arc(75, 75, 50, 0, Math.PI * 2, false)
			ctx.stroke()
		}
	}

	const onTriangleClicked = () => {
		if (!canvas) return
		if (canvas.getContext) {
			const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
			if (!ctx) return

			ctx.beginPath()
			ctx.moveTo(75, 50)
			ctx.lineTo(100, 75)
			ctx.lineTo(100, 25)
			ctx.lineTo(75, 50)
			ctx.stroke()
		}
	}

	const onAddText = () => {
		if (!canvas) return

		if (canvas.getContext) {
			const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
			if (!ctx) return

			ctx.font = '48px Comic sans'
			ctx.fillText('Hello World', 200, 300)
		}
	}

	const onReset = () => {
		if (!canvas) return
		if (canvas.getContext) {
			const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
			if (!ctx) return
			ctx.clearRect(0, 0, canvas.width, canvas.height)
		}
	}

	return (
		<div className='App'>
			<div className='actions-list'>
				<button onClick={onRectClicked}>Rectangular</button>
				<button onClick={onCircleClicked}>Circular</button>
				<button onClick={onTriangleClicked}>Triangular</button>
				<button onClick={onAddText}>Add Text</button>
				<button onClick={onReset}>Reset</button>
			</div>
			<Canvas height={480} width={640} />
		</div>
	)
}

export default App
