import { Vector, Time } from './index.js';
import { clamp, overflow, rand } from '@gandolphinnn/utils';
import { Coord, Angle, Line, Circle, MainCanvas, Color, Text } from '@gandolphinnn/graphics2';
import { BtnState, Input } from '@gandolphinnn/inputs';

const c = MainCanvas.get;
Time.timeScale = .5;
const animate: FrameRequestCallback = async (timestamp: DOMHighResTimeStamp) => {
	Time.update(timestamp);
	Time.logData();
	MainCanvas.get.clean();
	MainCanvas.get.drawSampleMetric(50);
	Time.showData();
	if (Input.btnState(0) == BtnState.Down) { //* Fake lagging
		await new Promise(r => setTimeout(r, 10000));
	}
	vec1.move();
	vec2.move();
	vec1.render(Color.byName('Red'));
	vec2.render(Color.byName('Blue'));
	requestAnimationFrame(animate);
}
const vec1 = Vector.right(new Coord(150, 100), 1);
const vec2 = Vector.right(new Coord(150, 200), 1);
animate(0);