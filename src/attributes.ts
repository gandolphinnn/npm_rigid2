import { Coord, Angle, Line, Color } from '@gandolphinnn/graphics2'
import { RigidBody } from './index.js'
import { Time } from './time.js'

const VECTOR_ARROW_HEAD_LENGTH = 10;
const VECTOR_ARROW_HEAD_ANGLE = 30;
/**
 * X VectorStrength = 1 Pixel
 */
const VECTOR_STRENGTH_PIXEL_RATIO = 10;
const DELTATIME_MULTIPLIER = 100;

export class LayerMask {
	id: number;
	name: string;
	private constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
		LayerMask._layerMasks.push(this);
	}

	private static _layerMasks: LayerMask[] = [];
	static get layerMasks() { return this._layerMasks }
	static newLayerMasks(id: number, name: string) {
		return new LayerMask(id, name);
	}
	static getByName(name: string) {
		return this._layerMasks.find(l => l.name == name);
	}
	static getById(id: number) {
		return this._layerMasks.find(l => l.id == id);
	}
}

export class Vector {
	coord: Coord;
	angle: Angle;
	strength: number;
	get forward() { return new Vector(this.coord, this.angle, this.strength) }
	get backward() { return new Vector(this.coord, new Angle(this.angle.degrees + 180), this.strength) }
	get leftward() { return new Vector(this.coord, new Angle(this.angle.degrees - 90), this.strength) }
	get rightward() { return new Vector(this.coord, new Angle(this.angle.degrees + 90), this.strength) }
	get vectorCoord() {
		return new Coord(
			this.coord.x + this.angle.cos * (this.strength / VECTOR_STRENGTH_PIXEL_RATIO) * (Time.deltaTime * DELTATIME_MULTIPLIER),
			this.coord.y + this.angle.sin * (this.strength / VECTOR_STRENGTH_PIXEL_RATIO) * (Time.deltaTime * DELTATIME_MULTIPLIER)
		)
	}
	constructor(coord: Coord, angle: Angle, strength = 0) {
		this.coord = coord;
		this.angle = angle;
		this.strength = strength;
	}
	move() {
		this.coord = this.vectorCoord;
	}
	bounce(bounceAngle: Angle) {
		this.angle.degrees = bounceAngle.degrees * 2 - (this.angle.degrees + 180); //todo attention needed
	}
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
	static up(coord = new Coord(0, 0), strength = 0) { return new Vector(coord, new Angle(270), strength) }
	static down(coord = new Coord(0, 0), strength = 0) { return new Vector(coord, new Angle(90), strength) }
	static left(coord = new Coord(0, 0), strength = 0) { return new Vector(coord, new Angle(180), strength) }
	static right(coord = new Coord(0, 0), strength = 0) { return new Vector(coord, new Angle(0), strength) }
}

export type CollisionEvent = (val: RigidBody) => void;
export class RigidEvent {
	onMouseOver = () => {};
	onMouseLeave = () => {};
	onClick = () => {};
	onCollisionEnter: CollisionEvent = () => {};
	onCollisionLeave: CollisionEvent = () => {};
	get activeEvents() {
		return [1] //todo implement
	}
	constructor() {

	}
}