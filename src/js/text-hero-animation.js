export * from './main';


class textScramble {
    constructor(el) {
        this.el = el
        this.chars = '!<>-_\\/[]{}—=+*^?#________'
        this.update = this.update.bind(this)
    }
    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span class="dud">${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update)
            this.frame++
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}

const textFirst = [
    'developers',
    'employees',
    'everyone',
];
const textSecond = [
    'attackers',
    'bad actors',
    'just anyone',
];

const elA = document.querySelector('.desc-hero__text-first');
const elB = document.querySelector('.desc-hero__text-second');

const fxA = new textScramble(elA);
const fxB = new textScramble(elB);

let counter = 0;

const next = () => {
    fxA.setText(textFirst[counter]).then(() => {
        setTimeout(next, 3000);
    });
    fxB.setText(textSecond[counter]).then(() => {
        setTimeout(next, 3000);
    });
    counter = (counter + 1) % textFirst.length;
    counter = (counter + 1) % textSecond.length;
};

next();

