import { Coord, Angle, Line } from '@gandolphinnn/graphics2'
import { RigidBody } from './index.js'

const VECTOR2_ARROW_HEAD_LENGTH = 10;
const VECTOR2_ARROW_HEAD_ANGLE = 30;

export class Vector2 {
	coord: Coord;
	angle: Angle;
	strength: number;
	get forward() { return new Vector2(this.coord, this.angle, this.strength) }
	get backward() { return new Vector2(this.coord, new Angle(this.angle.degrees + 180), this.strength) }
	get leftward() { return new Vector2(this.coord, new Angle(this.angle.degrees - 90), this.strength) }
	get rightward() { return new Vector2(this.coord, new Angle(this.angle.degrees + 90), this.strength) }
	get vectorCoord() {
		return new Coord(
			this.coord.x + this.angle.cos * this.strength,
			this.coord.y + this.angle.sin * this.strength
		)
	}
	constructor(coord: Coord, angle: Angle, strength = 0) {
		this.coord = coord;
		this.angle = angle;
		this.strength = strength;
	}
	bounce(bounceAngle: Angle) {
		this.angle.degrees = bounceAngle.degrees * 2 - this.angle.degrees + 180;
	}
	render() {
		const vectorCoord = this.vectorCoord;
		new Line(this.coord, vectorCoord).render();
		let arrowHead1 = new Angle(this.angle.degrees +180 + VECTOR2_ARROW_HEAD_ANGLE);
		new Line(vectorCoord, new Coord(
			vectorCoord.x + arrowHead1.cos * VECTOR2_ARROW_HEAD_LENGTH,
			vectorCoord.y + arrowHead1.sin * VECTOR2_ARROW_HEAD_LENGTH
		)).render();
		let arrowHead2 = new Angle(this.angle.degrees + 180 - VECTOR2_ARROW_HEAD_ANGLE);
		new Line(vectorCoord, new Coord(
			vectorCoord.x + arrowHead2.cos * VECTOR2_ARROW_HEAD_LENGTH,
			vectorCoord.y + arrowHead2.sin * VECTOR2_ARROW_HEAD_LENGTH
		)).render();
	}
	static up(coord = new Coord(0, 0), strength = 0) { return new Vector2(coord, new Angle(270), strength) }
	static down(coord = new Coord(0, 0), strength = 0) { return new Vector2(coord, new Angle(90), strength) }
	static left(coord = new Coord(0, 0), strength = 0) { return new Vector2(coord, new Angle(180), strength) }
	static right(coord = new Coord(0, 0), strength = 0) { return new Vector2(coord, new Angle(0), strength) }
}

export type CollisionEvent = (val: RigidBody) => void;
export class RigidEvent {
	onMouseOver = () => {};
	onMouseLeave = () => {};
	onClick = () => {};
	onCollisionEnter: CollisionEvent = () => {};
	onCollisionLeave: CollisionEvent = () => {};
	constructor() {

	}
}