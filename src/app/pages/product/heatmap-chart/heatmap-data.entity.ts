export default class HeatmapData {
    public date: Date;

    public data: [4];
    public units: string;

    constructor({
        year,
        month,
        day,
        data,
        units
    }) {
        this.date = new Date(year, month, day);
        this.data = data;
        this.units = units;
    }
}