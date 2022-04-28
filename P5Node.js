class P5Node {
    constructor(id, x, y, r, label, description, node_class) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.label = label;
        this.description = description;
        this.r = r;
        this.class = node_class;
        this.color = 180;
        this.text_color = 0;
        this.target_x = null;
        this.target_y = null;
        this.clicked = false;
        this.begin_hover;
        this.hovered_prolonged = false;
        this.hovered = false;
    }


    set_x(x) { this.x = x }
    set_y(y) { this.y = y }
    set_r(r) { this.r = r }
    get_x() { return this.x }
    get_y() { return this.y }
    set_target_x(x) { this.target_x = x }
    set_target_y(y) { this.target_y = y }
    get_target_x() { return this.target_x }
    get_target_y() { return this.target_y }
    get_id() { return this.id }

    double_clicked() {
        const distance = dist(mouseX, mouseY, this.x, this.y);
        if (distance < this.r) {
            return this.id;
        }
        else {
            return null
        }
    }

    strg_plus_left_clicked() {
        const distance = dist(mouseX, mouseY, this.x, this.y);
        if (distance < this.r) {
            this.clicked = false;
            window.open(this.id);
        }
    }

    left_clicked() {
        const distance = dist(mouseX, mouseY, this.x, this.y);
        if (distance < this.r) {
            this.clicked = true
            // this.hovered_prolonged = true;
        }
        return this.clicked;
    }

    released() {
        this.clicked = false
    }

    right_clicked() {
        const distance = dist(mouseX, mouseY, this.x, this.y);
        if (distance < this.r) {
            return this.id;
        }
        else {
            return null
        }
    }

    dragged() {
        if (this.clicked) {
            this.x = mouseX;
            this.target_x = null;
            this.y = mouseY;
            this.target_y = null;
            return true;
        }
        else {
            return false;
        }
    }

    hover() {
        const distance = dist(mouseX, mouseY, this.x, this.y);
        if (distance < this.r) {

            if (!(this.hovered)) {
                this.begin_hover = millis();
            }
            this.hovered = true;

            // console.log()
            console.log(millis() - this.begin_hover)
            if ((millis() - this.begin_hover) > 500) {
                this.hovered_prolonged = true;
            }
        }
        else {
            this.hovered = false;
            this.hovered_prolonged = false;
        }
    }


    show(color, text_color) {
        let damp = 0.05
        if (this.target_x) {
            this.x += damp * (this.target_x - this.x);
            if (Math.abs(this.x - this.target_x) <= 0.1) {
                this.target_x = null;
            }
        }
        if (this.target_y) {
            this.y += damp * (this.target_y - this.y);
            if (Math.abs(this.y - this.target_y) <= 0.1) {
                this.target_y = null;
            }
        }

        push();
        translate(this.x, this.y);

        if (this.hovered_prolonged) {
            noStroke()
            fill("red")
            circle(0, 0, 2.2 * this.r);
        }

        if (color) this.color = color
        fill(this.color)
        noStroke()
        circle(0, 0, 2 * this.r);

        if (text_color) this.text_color = text_color
        const text_width = textWidth(String(this.label));
        fill('rgba(255,255,255,0.8)');
        noStroke()
        rect(-(text_width + 8) / 2, -8, text_width + 8, 16);
        fill(this.text_color)
        textAlign(CENTER, CENTER);
        text(this.label, 0, 0);



        pop();
    }
}