//helper types

//vector type, for holding an x-y pair.
function Vector(x, y) {
    this.x = x;
    this.y = y;
}

//adds two vectors
Vector.prototype.add = function(other) {
    this.x += other.x;
    this.y += other.y;
};

//multiplies two vectors by a set amount
Vector.prototype.multiply = function(factor) {
    this.x *= factor;
    this.y *= factor;
};