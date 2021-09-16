import { Record } from "@bloock/sdk";

export class TaskEntity {
  public name: String;
  public typeId: Number;
  public tools: { name: string }[];
  public chemicals: { name: number; amount: number }[];
  public startDate: Date;
  public endDate: Date;
  public iniClaro: String;
  public endClaro: String;
  public iniRow: String;
  public endRow: String;
  public iniPlant: String;
  public endPlant: String;
  public notes: String;
  public hash: Record;

  constructor(data?: {
    public_key: String;
    task_id: Number;
    tools_used: { Id: string }[];
    chemicals: { Id: number; amount: number }[];
    ini_timestamp: Date;
    end_timestamp: Date;
    ini_claro: String;
    end_claro: String;
    ini_row: String;
    end_row: String;
    ini_plant: String;
    end_plant: String;
    notes: String;
    hash: string;
  }) {
    if (data) {
      this.name = data.public_key;
      this.typeId = data.task_id;
      this.startDate = new Date(data.ini_timestamp);
      this.endDate = new Date(data.ini_timestamp);
      this.tools = data.tools_used.map((tool) => {
        return { name: tool.Id };
      });
      this.chemicals = data.chemicals.map((chemical) => {
        return { name: chemical.Id, amount: chemical.amount };
      });
      this.notes = data.notes;
      this.iniClaro = data.ini_claro;
      this.endClaro = data.end_claro;
      this.iniRow = "Row " + data.ini_row.toString();
      this.endRow = "Row " + data.end_row.toString();
      this.iniPlant = "Plant " + data.ini_plant.toString();
      this.endPlant = "Plant " + data.end_plant.toString();
      this.hash = Record.fromHash(data.hash);
    }
  }
}
