import { Message } from '@enchainte/sdk';

export default class ChartItemEntity {
    public date: Date;
    public units: string;
    public label: string = '';
    public hash: Message[]

    constructor({
        date,
        units,
        label,
        hash
    }) {
        this.date = date;
        this.units = units;
        this.label = label;

        if (hash) {
            this.hash = hash.reduce((prev, current) => {
                if (current) {
                    prev.push(Message.fromHash(current))
                }
                return prev;
            }, []);
        }
    }

    public getHashes() {
        if (this.hash) {
            return this.hash.map(item => {
                if (item) {
                    return item.getHash();
                }
                return null;
            })
        }
        return null;
    }
}