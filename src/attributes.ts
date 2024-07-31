import { Coord, Angle, Line, Color, Time } from '@gandolphinnn/graphics2'
import { RigidBody } from './index.js'

export const VECTOR_ARROW_HEAD_LENGTH = 10;
export const VECTOR_ARROW_HEAD_ANGLE = 30;
/**
 * X VectorStrength = 1 Pixel
 */
export const VECTOR_STRENGTH_PIXEL_RATIO = 10;
export const DELTATIME_MULTIPLIER = 100;

export class LayerMask {
	constructor(
		public name: string
	) {
		if (!LayerMask.getByName(name))
			LayerMask._layerMasks.push(this);
	}

	private static _layerMasks: LayerMask[] = [
		new LayerMask("Default"),
		new LayerMask("Mouse"),
		new LayerMask("Canvas"),
	];

	static get layerMasks() { return Object.freeze(this._layerMasks) }

	static getByName(name: string) {
		return this._layerMasks.find(l => l.name == name);
	}
	static get default() { return this.getByName("Default") }
	static get mouse() { return this.getByName("Mouse") }
	static get canvas() { return this.getByName("Canvas") }
}

export class Vector {
	get forward() { return new Vector(this.coord, this.angle, this.strength) }
	get backward() { return new Vector(this.coord, new Angle(this.angle.degrees + 180), this.strength) }
	get leftward() { return new Vector(this.coord, new Angle(this.angle.degrees - 90), this.strength) }
	get rightward() { return new Vector(this.coord, new Angle(this.angle.degrees + 90), this.strength) }

	/**
	 * Get the vector's coordinate in the next frame
	 */
	get vectorCoord() {
		return new Coord(
			this.coord.x + this.angle.cos * (this.strength / VECTOR_STRENGTH_PIXEL_RATIO) * (Time.deltaTime * DELTATIME_MULTIPLIER),
			this.coord.y + this.angle.sin * (this.strength / VECTOR_STRENGTH_PIXEL_RATIO) * (Time.deltaTime * DELTATIME_MULTIPLIER)
		)
	}
	
	constructor(
		public coord: Coord,
		public angle: Angle,
		public strength = 0
	) {
		this.coord = coord;
		this.angle = angle;
		this.strength = strength;
	}

	/**
	 * Move the vector to its next frame position
	 */
	advance() {
		this.coord = this.vectorCoord;
		return this;
	}
	/**
	 * Make the vector bounce off a surface. An horizontal surface will have a 0° angle.
	 * @param bounceAngle The angle of the surface. The vector will bounce off symmetrically.
	 */
	bounce(bounceAngle: Angle) {
		this.angle.degrees = bounceAngle.degrees * 2 - this.angle.degrees;
		return this;
	}
	/**
	 * Render the vector on the canvas as an arrow.
	 * Is intended to be used mainly during debug.
	 */
	render(color = Color.default()) {
		const vectorCoord = this.vectorCoord;
		const arrowBody = new Line(this.coord, vectorCoord);
		arrowBody.style.mergeStrokeStyle(color);
		arrowBody.render();
		let headAngle1 = new Angle(this.angle.degrees +180 + VECTOR_ARROW_HEAD_ANGLE);
		const arrowHead1 = new Line(vectorCoord, new Coord(
			vectorCoord.x + headAngle1.cos * VECTOR_ARROW_HEAD_LENGTH,
			vectorCoord.y + headAngle1.sin * VECTOR_ARROW_HEAD_LENGTH
		));
		arrowHead1.style.mergeStrokeStyle(color);
		arrowHead1.render();
		let headAngle2 = new Angle(this.angle.degrees + 180 - VECTOR_ARROW_HEAD_ANGLE);
		const arrowHead2 = new Line(vectorCoord, new Coord(
			vectorCoord.x + headAngle2.cos * VECTOR_ARROW_HEAD_LENGTH,
			vectorCoord.y + headAngle2.sin * VECTOR_ARROW_HEAD_LENGTH
		));
		arrowHead2.style.mergeStrokeStyle(color);
		arrowHead2.render();
	}

	static up(coord = Coord.origin, strength = 0) { return new Vector(coord, Angle.up(), strength) }
	static down(coord = Coord.origin, strength = 0) { return new Vector(coord, Angle.down(), strength) }
	static left(coord = Coord.origin, strength = 0) { return new Vector(coord, Angle.left(), strength) }
	static right(coord = Coord.origin, strength = 0) { return new Vector(coord, Angle.right(), strength) }
}

//! THIS SHOULD BE EXPORTED BY INPUTS!!!! TODO!!!!
class Mouse {

}

export type CollisionEvent = (val: RigidBody) => void;
export type MouseCollisionEvent = (mouse: Mouse) => void;