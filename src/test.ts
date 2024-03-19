import { Vector } from './index.js';
import { Coord, Angle, Line, Circle, MainCanvas, Color } from '@gandolphinnn/graphics2';
import { Input } from '@gandolphinnn/inputs';
import { clamp, overflow } from '@gandolphinnn/utils';

const c = MainCanvas.get;
const animate: FrameRequestCallback = (timestamp: number) => {
	MainCanvas.get.clean();
	MainCanvas.get.drawSampleMetric(50);
	requestAnimationFrame(animate);
	vec.move();
	vec.render();
	angle.degrees += 1;
}
const angle = new Angle(0);
const vec = new Vector(c.center, angle, 1)
animate(0);