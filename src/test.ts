import { Vector } from './index.js';
import { Coord, Angle, Line, Circle, MainCanvas, Color, Text, Time } from '@gandolphinnn/graphics2';
import { BtnState, Input } from '@gandolphinnn/inputs';

const animate: FrameRequestCallback = async (timestamp: DOMHighResTimeStamp) => {
	Time.update(timestamp);
	//MainCanvas.clean();
	//MainCanvas.drawSampleMetric(50);
	//Time.showData();

	vec1.advance();

	if (vec1.vectorCoord.x > MainCanvas.cnv.width || vec1.vectorCoord.x < 0) {
		vec1.bounce(new Angle(90));
	}
	if (vec1.vectorCoord.y > MainCanvas.cnv.height || vec1.vectorCoord.y < 0) {
		vec1.bounce(new Angle(10 ));
	}
	vec1.render(Color.byName('Red'));
	requestAnimationFrame(animate);
}
const vec1 = new Vector(new Coord(150, 100), new Angle(45), 50);
animate(0);