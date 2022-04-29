class Expense {
    constructor(id, title, cost, date ) {
        this.id = id;
        this.title = title;
        this.cost = cost;
        this.date = date;
    }

    toJson() {
        return {
            title: this.title,
            cost: this.cost,
            date: this.date,
        };
    }
}

export default Expense;