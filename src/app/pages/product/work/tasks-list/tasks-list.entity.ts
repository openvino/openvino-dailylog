
export class TaskEntity {
    public name: String;
    public tools: {name: string}[];
    public chemicals: {name: number, amount: number}[];
    public startDate: Date;
    public endDate: Date;
    public iniClaro: String;
    public endClaro: String;
    public inicRow: String;
    public endRow: String;
    public iniPlant: String;
    public endPlant: String;
    public notes: String;

constructor ( data?: {
    public_key: String;
    tools_used: {Id: string}[];
    chemicals:  {Id: number, amount: number}[];
    ini_timestamp:Date;
    end_timestamp:Date;
    ini_claro: String;
    end_claro: String;
    notes: String;
}) {
    if (data) {
        this.name = data.public_key;
        this.startDate = new Date(data.ini_timestamp);
        this.endDate = new Date(data.ini_timestamp);
        this.tools= data.tools_used.map(tool => {
            return {name: tool.Id}  
        })
        this.chemicals= data.chemicals.map(chemical => {
            return {name: chemical.Id, amount: chemical.amount}
        });
        this.notes= data.notes;
        this.iniClaro= data.ini_claro;  
    }
}
}

