export class Time {
	static deltaTime: number = 0;
	static timeScale: number = 1;
	static lastFrameTime: number = 0;
	static frameTime: number = 0;
	static frameCount: number = 0;
	static fps: number = 0;
	static fpsInterval: number = 0;
	static fpsTime: number = 0;
	static fpsCount: number = 0;
	static fpsUpdateInterval: number = 1000;
	static fpsUpdateCount: number = 0;
	static fpsUpdate: boolean = false;

	static update() {
		this.frameTime = performance.now();
		this.deltaTime = (this.frameTime - this.lastFrameTime) / 1000;
		this.deltaTime *= this.timeScale;
		this.lastFrameTime = this.frameTime;
		this.frameCount++;
		this.fpsCount++;
		this.fpsInterval = this.frameTime - this.fpsTime;
		if (this.fpsInterval > this.fpsUpdateInterval) {
			this.fps = this.fpsCount / (this.fpsInterval / 1000);
			this.fpsTime = this.frameTime;
			this.fpsCount = 0;
			this.fpsUpdateCount++;
			this.fpsUpdate = true;
		}
	}
}