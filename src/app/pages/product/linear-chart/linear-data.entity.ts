import ChartItemEntity from '../chart-item.entity';

export default class LinearChartData extends ChartItemEntity {
    private _data: number;

    get data(): number {
        return this._data;
    }

    set data(value: number) {
        if (value !== null) {
            this._data = Math.round(value);
        }
    }

    constructor({
        date,
        data,
        units,
        label,
        hash
    }) {
        super({date, units, label, hash})
        this.data = data;
    }
}