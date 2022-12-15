class Queue {
    constructor() {
        this.list = [];
        this.finished = [];
    }

    enqueue = (el) => {
        this.list.push(el);
    }

    dequeue = () => this.list.length !== 0 ? this.list.shift() : "No executable element";

    queueIndex = (index) => this.list.length !== 0 ? this.list[index] : "No executable element";

    isEmpty = () => this.list.length === 0;

    addToFinished = (el) => {
        console.log("finished " , el);
        this.finished.push(el);
    }

}

module.exports = Queue;