import { MainCanvas, Coord, Text } from "@gandolphinnn/graphics2";

export class Time {
	/**
	 * The time difference between the current frame and the previous frame.
	 */
	static deltaTime: number = 0;

	/**
	 * The time scale factor.
	 */
	static timeScale: number = 1;

	/**
	 * The timestamp of the previous frame.
	 */
	static lastFrameTime: number = 0;

	/**
	 * The timestamp of the current frame.
	 */
	static frameTime: number = 0;

	/**
	 * The total number of frames rendered.
	 */
	static frameCount: number = 0;

	/**
	 * The frames per second (FPS) value.
	 */
	static fps: number = 0;

	/**
	 * The time interval between FPS updates.
	 */
	static fpsInterval: number = 0;

	/**
	 * The timestamp of the last FPS update.
	 */
	static fpsTime: number = 0;

	/**
	 * The number of frames rendered since the last FPS update.
	 */
	static fpsCount: number = 0;

	/**
	 * The interval in milliseconds at which FPS updates should occur.
	 */
	static fpsUpdateInterval: number = 1000;

	/**
	 * The number of FPS updates that have occurred.
	 */
	static fpsUpdateCount: number = 0;

	/**
	 * Updates the time-related properties.
	 */
	static update(timestamp: DOMHighResTimeStamp) {
		this.frameTime = timestamp;
		this.deltaTime = (this.frameTime - this.lastFrameTime) / 1000;
		this.deltaTime *= this.timeScale;
		this.lastFrameTime = this.frameTime;
		this.frameCount++;
		this.fpsCount++;
		this.fpsInterval = this.frameTime - this.fpsTime;
		//? Update the FPS value if the time interval is greater than the update interval
		if (this.fpsInterval > this.fpsUpdateInterval) {
			this.fps = Math.round(this.fpsCount / (this.fpsInterval / 1000));
			
			this.fpsTime = this.frameTime;
			this.fpsCount = 0;
			this.fpsUpdateCount++;
		}
	}
	static logData() {
		console.log(`Time {\n\tdeltaTime: ${this.deltaTime},\n\ttimeScale: ${this.timeScale},\n\tlastFrameTime: ${this.lastFrameTime},\n\tframeTime: ${this.frameTime},\n\tframeCount: ${this.frameCount},\n\tfps: ${this.fps},\n\tfpsInterval: ${this.fpsInterval},\n\tfpsTime: ${this.fpsTime},\n\tfpsCount: ${this.fpsCount},\n\tfpsUpdateInterval: ${this.fpsUpdateInterval},\n\tfpsUpdateCount: ${this.fpsUpdateCount}\n}`)
	}
	static showData() {
		const t = new Text(new Coord(50, 30), `FPS: ${this.fps}`)
		t.style.mergeTextAlign('left');
		t.render();
	}
}