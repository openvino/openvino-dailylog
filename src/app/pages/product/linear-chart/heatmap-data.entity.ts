import ChartItemEntity from '../chart-item.entity';

export default class LinearChartData extends ChartItemEntity {
    public data: number;

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