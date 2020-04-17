export default class ChartItemEntity {
    public date: Date;
    public units: string;
    public label: string = '';

    constructor({
        date,
        units,
        label
    }) {
        this.date = date;
        this.units = units;
        this.label = label;
    }
}