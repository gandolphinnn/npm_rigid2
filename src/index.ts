import { Coord } from '@gandolphinnn/graphics2'

export class RayCast {
	
}

export class RigidBody {
	onMouseOver = () => {};
	onMouseLeave = () => {};
	onClick = () => {};
	onCollisionEnter = () => {}; //todo callback must pass a rigidBody as an argument
	onCollisionLeave = () => {}; //todo callback must pass a rigidBody as an argument
	constructor(center: Coord) {

	}
}

export class RigidRect extends RigidBody {
	points: Coord[];

	constructor(center: Coord, ...points: Coord[]) {
		super(center);
		this.points = points;
	}
	collision(rBody: RigidBody) {
		if (mathF.parentClass(rBody) == 'RigidRect') {
			let hitPoints = new Array(), line1, line2;
			for (let i = 0; i < this.corners.length; i++) {
				line1 = new Line(this.corners[i], this.corners[(i+1) % this.corners.length]);
				for (let i = 0; i < rBody.corners.length; i++) {
					line2 = new Line(rBody.corners[i], rBody.corners[(i+1) % rBody.corners.length]);
					if(line1.hitL(line2)) {
						hitPoints.push(line1.hitL(line2));
					}
				}
			}
			if (hitPoints.length == 0)
				return false;
			return hitPoints;
		}
		else if(mathF.parentClass(rBody) == 'RigidCirc') {
			console.log('Work In Progress');
			return false;
		}
	}
	bounce(mirrorDegr) {
		this.degr = mathF.formA(mirrorDegr*2-this.degr+180);
	}
	showHitbox() {
		let color = ctx.strokeStyle;
		ctx.strokeStyle = this.color;
		for (let i = 0; i < this.corners.length; i++) {
			drawF.line(this.corners[i], this.corners[(i+1)%this.corners.length]);
		}
		drawF.circle(this.coord, 3);
		ctx.strokeStyle = color;
	}
}
export class RigidCirc {
	constructor(coord, degr, radius, color= 'black') {
		this.coord = coord;
		this.degr = degr;
		this.radius = radius;
		this.color = color
	}
	collision(rBody) {
		if (mathF.parentClass(rBody) == 'RigidRect') {
			console.log('Work In Progress');
			return false;
		}
		else if(mathF.parentClass(rBody) == 'RigidCirc') {
			let hitPoints = new Array();
			let d = Math.sqrt((this.coord.x - rCirc.coord.x) ** 2 + (this.coord.y - rCirc.coord.y) ** 2);
			if (d > this.radius + rCirc.radius) {
				return false;			
			}
			else {
				let x1 = this.coord.x, y1 = this.coord.y, r1 = this.radius;
				let x2 = rCirc.coord.x, y2 = rCirc.coord.y, r2 = rCirc.radius;
				let l = (r1**2 - r2**2 + d**2) / (2*d);
				let h = Math.sqrt(r1**2 - l**2);
				hitPoints.push(new Coord(l/d*(x2-x1) + h/d*(y2-y1) + x1, l/d*(y2-y1) - h/d*(x2-x1) + y1));
				hitPoints.push(new Coord(l/d*(x2-x1) - h/d*(y2-y1) + x1, l/d*(y2-y1) + h/d*(x2-x1) + y1));
			}
			return hitPoints;
		}
	}
	bounce(mirrorDegr) {
		this.degr = mathF.formA(mirrorDegr*2-this.degr+180);
	}
	showHitbox() {
		let color = ctx.strokeStyle;
		ctx.strokeStyle = this.color;
		drawF.circle(this.coord, this.radius, 'stroke');
		drawF.circle(this.coord, 3);
		ctx.strokeStyle = color;
	}
}
export const rigidF = {
	bounce: (rBody, mirrorDegr) => {
		rBody.degr = mathF.formA(mirrorDegr*2-rBody.degr+180);
	},
	/**
	 * Convert from unix timestamp to time.
	 * @param {RigirRect | RigidCirc} rBody1 The first rigidBody.
	 * @param {RigirRect | RigidCirc} rBody2 The second rigidBody.
	 * @return {boolean | array} 
	 * * false if they don't collide
	 * * an array with the coordinates of the intersections
	 * * an empty array if they are one inside the other without intersection 
	 */
	collision(rBody1, rBody2) {
		let hitPoints = new Array();
		//* rect and rect
		if (mathF.parentClass(rBody1) == 'RigidRect' && mathF.parentClass(rBody2) == 'RigidRect') {
			let line1, line2;
			for (let i = 0; i < rBody1.corners.length; i++) { //? get intersections
				line1 = new Line(rBody1.corners[i], rBody1.corners[(i+1) % rBody1.corners.length]);
				for (let i = 0; i < rBody2.corners.length; i++) {
					line2 = new Line(rBody2.corners[i], rBody2.corners[(i+1) % rBody2.corners.length]);
					if(line1.hitL(line2)) {
						hitPoints.push(line1.hitL(line2));
					}
				}
			}
			if (hitPoints.length == 0) { //todo add '&& point not inside' in condition
				return false;
			}
		}
		//* circ and circ
		else if (mathF.parentClass(rBody1) == 'RigidCirc' && mathF.parentClass(rBody2) == 'RigidCirc') {
			let d = Math.sqrt((rBody1.coord.x - rBody2.coord.x) ** 2 + (rBody1.coord.y - rBody2.coord.y) ** 2);
			if (d > rBody1.radius + rBody2.radius) { //? no intersections and outside
				return false;			
			}
			else if (d + rBody1.radius >= rBody2.radius && d + rBody2.radius >= rBody1.radius) { //? intersection
				let x1 = rBody1.coord.x, y1 = rBody1.coord.y, r1 = rBody1.radius;
				let x2 = rBody2.coord.x, y2 = rBody2.coord.y, r2 = rBody2.radius;
				let l = (r1**2 - r2**2 + d**2) / (2*d);
				let h = Math.sqrt(r1**2 - l**2);
				hitPoints.push(new Coord(l/d*(x2-x1) + h/d*(y2-y1) + x1, l/d*(y2-y1) - h/d*(x2-x1) + y1));
				hitPoints.push(new Coord(l/d*(x2-x1) - h/d*(y2-y1) + x1, l/d*(y2-y1) + h/d*(x2-x1) + y1));
			}
		}
		//* circ and rect
		else {
			//? define which one is rect and which one is circ
			let	rRect = mathF.parentClass(rBody1) == 'RigidRect'? rBody1 : rBody2;
			let	rCirc = mathF.parentClass(rBody1) == 'RigidCirc'? rBody1 : rBody2;
			if (coordF.dist(rRect.coord, rCirc.coord) > rRect.diagonal/2+rCirc.radius) { //? too far to possibly intersect, avoid useless computation
				return false;
			}
			//* (https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line)
			//* first detect closest point to circle on each line
			//* if distance <= radius, detect the 2 intersection using trigonometry
			//* to check if circle inside rectangle use tangent to determine the point on the line to use for the distance and compare D to distance circCenter-rectCenter
			let corn = rRect.corners;
			let D; //? has to prove it is outside
			for (let i = 0; i < corn.length; i++) {
				D = (corn[(i+1)%corn.length].x - corn[i].x) * (rCirc.coord.y - corn[i].y) - (rCirc.coord.x - corn[i].x) * (corn[(i+1)%rRect.corners.length].y - rRect.corners[i].y);
				if (D < 0) {
					hitPoints = false; //? center outside the circle
				}
			}
			return hitPoints;
		}
		return hitPoints;
	},
	closestPointRectCirc: (rRect, rCirc) => {
		let corn = rRect.corners, a, b, c, p1, p2, p = rCirc.coord, hitP;
		for (let i = 0; i < corn.length; i++) {
			p1 = corn[i];
			p2 = corn[(i+1)%corn.length];
			a = p1.y - p2.y;
			b = p2.x - p1.x;
			c = p1.x * p2.y - p2.x * p1.y;
			hitP = new Coord((b*(b*p.x-a*p.y)-a*c)/(a**2+b**2), (a*(a*p.y-b*p.x)-b*c)/(a**2+b**2));
			if (hitP.dist(p1) + hitP.dist(p2) > p1.dist(p2) + 0.001) {
				if (hitP.dist(p1) > hitP.dist(p2))
					hitP = p2;
				else
					hitP = p1;
			}
			hitPoints.push(hitP);
		}
		return hitPoints;
	},
	/* snap: (rBody, fixedBody) => {
		if (rigidF.collision(rBody, fixedBody)) {

		}
	},
	rayCast(coord, degr, rBodies) {

	} */
}

function pointInPoly(point: Coord, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point.x, y = point.y;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};