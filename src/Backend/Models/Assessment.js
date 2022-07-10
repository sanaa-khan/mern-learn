export class option {
    constructor() {
        this.opt = ""
        this.text = ""
    }
}

export class question {
    constructor() {
        this.statement = null
        this.correct_opt = null
    }
}

export class Assessment {
    constructor() {
        this.id = null;
        this.time_duration_mins = null
        this.minimum_passing = null
        this.questions = []
    }
}
