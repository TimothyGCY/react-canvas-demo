import { useOnDraw } from "../hooks"

const Canvas = ({ height, width }: any) => {

	const onDraw = (ctx: any, point: any, prev: any) => {
		drawLine(prev, point, ctx, '#000', 5)
	}

	const drawLine = (
		start: any,
		end: any,
		ctx: any,
		color: any,
		width: any
	) => {
		start = start ?? end
		ctx.beginPath()
		ctx.lineWidth = width
		ctx.strokeStyle = color
		ctx.moveTo(start.x, start.y)
		ctx.lineTo(end.x, end.y)
		ctx.stroke()

		ctx.fillStyle = color
		ctx.beginPath()
		ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI)
		ctx.fill()
	}

	const { setCanvasRef, onMouseDown } = useOnDraw(onDraw)

	return (
		<canvas
			id={'canvas'}
			height={height}
			width={width}
			style={canvasStyle}
			ref={setCanvasRef}
			onMouseDown={onMouseDown}
		/>
	)
}

export default Canvas

const canvasStyle = {
	border: '1px solid #2a2a2a'
}
