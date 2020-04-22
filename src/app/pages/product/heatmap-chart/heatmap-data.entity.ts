import ChartItemEntity from '../chart-item.entity';

export default class HeatmapData extends ChartItemEntity {
    private _data: any[];

    get data(): any[] {
        return this._data;
    }

    set data(value: any[]) {
        if (value) {
            this._data = value.map(item => {
                if (item) {
                    return Math.round(item)
                }
                return null;
            });
        }
    }


    constructor({
        date,
        data,
        units,
        label
    }) {
        super({date, units, label})
        this.data = data;
    }
}