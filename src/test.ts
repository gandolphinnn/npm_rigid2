import { Vector2 } from './index.js';
import { Coord, Angle, Line, Circle, MainCanvas, Color } from '@gandolphinnn/graphics2';
import { Input } from '@gandolphinnn/inputs';
import { clamp, overflow } from '@gandolphinnn/utils';

const c = MainCanvas.get;
const animate: FrameRequestCallback = (timestamp: number) => {
	MainCanvas.get.clean();
	MainCanvas.get.drawSampleMetric(50);
	requestAnimationFrame(animate);
	new Vector2(c.center, angle, 10).render();
	angle.degrees += .1;
}
const angle = new Angle(0);
animate(0);