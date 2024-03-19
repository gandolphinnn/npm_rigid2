import { Vector } from './index.js';
import { Coord, Angle, Line, Circle, MainCanvas, Color } from '@gandolphinnn/graphics2';
import { Input } from '@gandolphinnn/inputs';
import { clamp, overflow } from '@gandolphinnn/utils';

const c = MainCanvas.get;
const animate: FrameRequestCallback = (timestamp: number) => {
	MainCanvas.get.clean();
	MainCanvas.get.drawSampleMetric(50);
	requestAnimationFrame(animate);
	vec1.move();
	vec2.move();
	vec1.render(Color.byName('Red'));
	vec2.render(Color.byName('Blue'));
}
const vec1 = Vector.right(new Coord(100, 100), 1);
const vec2 = Vector.right(new Coord(100, 200), 1);
animate(0);