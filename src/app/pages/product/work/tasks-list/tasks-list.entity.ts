
export class TasksList {
    public name: String;
    public tools:string[];
    public chemicals: {name: string, amount: number}[];
    public startDate: Date;
    public endDate: Date;
    public locationIni: Point;
    public locationEnd: Point;
    public notes: string;

constructor ( data?: {
    task_id: number;
    tools_used:  {name: string, amount: number}[];
    chemicals:  {name: string, amount: number}[];
    ini_timestamp: string;
    end_timestamp: string;
    ini_claro: string;
    end_claro: string;
}) {
    if (data) {
        this.name = data.task_id.toString();
        this.startDate = new Date(data.ini_timestamp);
        this.endDate = new Date(data.ini_timestamp);
        this.tools =[];
        this.chemicals=[]
    }
}
}

export class Point {
    public claro: string;
    public row: string;
    public plant: string;

    constructor(data: {
       claro: string, row: string, plant: string
    }) {
        if (data) {
            this.claro= data.claro;
            this.row = data.row;
            this.plant = data.plant;
        }
    }
}