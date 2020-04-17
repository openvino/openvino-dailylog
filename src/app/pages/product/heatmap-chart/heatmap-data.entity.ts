import ChartItemEntity from '../chart-item.entity';

export default class HeatmapData extends ChartItemEntity {
    public data: [4];

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