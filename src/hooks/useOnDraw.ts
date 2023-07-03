import { useEffect, useRef } from "react";

const useOnDraw = (onDraw: any) => {

	const canvasRef = useRef<HTMLCanvasElement | undefined | null>(null);
	const isDrawingRef = useRef<boolean>(false);
	const prevPointRef = useRef<{ x: number; y: number } | undefined | null>(null);

	// mouse event listener
	const mouseMoveListenerRef = useRef<((e: MouseEvent) => void) | null>(null);
	const mouseUpListenerRef = useRef<(() => void) | null>(null);


	useEffect(() => {

		const initMouseUpListener = () => {
			const listener = () => {
				isDrawingRef.current = false
				prevPointRef.current = null
			}

			mouseMoveListenerRef.current = listener
			window.addEventListener('mouseup', listener)
		}

		const initMouseMoveListener = () => {
			const listener = (e: MouseEvent) => {
				if (isDrawingRef.current) {
					const point = computePointInCanvas(e.clientX, e.clientY)
					const ctx = canvasRef.current?.getContext('2d')
					if (onDraw)
						onDraw(ctx, point, prevPointRef.current)
					prevPointRef.current = point
				}
			}
			mouseMoveListenerRef.current = listener
			window.addEventListener('mousemove', listener)
		}

		const computePointInCanvas = (clientX: number, clientY: number) => {
			if (!canvasRef.current) return
			const boundingRect = canvasRef.current.getBoundingClientRect();
			return {
				x: clientX - boundingRect.left,
				y: clientY - boundingRect.top
			}
		}

		const removeListener = () => {
			if (mouseMoveListenerRef.current)
				window.removeEventListener('mousemove', mouseMoveListenerRef.current)

			if (mouseUpListenerRef.current)
				window.removeEventListener('mouseup', mouseUpListenerRef.current)
		}

		initMouseMoveListener()
		initMouseUpListener()


		return () => {
			removeListener()
		}
	}, [onDraw]);

	function setCanvasRef(ref: HTMLCanvasElement | null) {
		canvasRef.current = ref;
	}

	function onMouseDown() {
		isDrawingRef.current = true
	}

	return {
		setCanvasRef,
		onMouseDown
	}

}

export default useOnDraw
