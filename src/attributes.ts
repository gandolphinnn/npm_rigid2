import { Coord, Angle, Line } from '@gandolphinnn/graphics2'

export class Vector2 {
	
}
export class Transform {
	
	get forward() { return new Angle(this.degrees) }
	get backward() { return new Angle(this.degrees) }
	get left() { return new Angle(this.degrees) }
	get right() { return new Angle(this.degrees) }
	bounce(bounceAngle: Angle) {
		this.degrees = bounceAngle.degrees * 2 - this.degrees + 180;
	}
	static get up() {
		
	}
}