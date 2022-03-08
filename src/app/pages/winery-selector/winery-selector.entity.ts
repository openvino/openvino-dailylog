export class WineriesEntity {
  public id: number;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt: string;
  public name: string;
  public website: string;
  public image: string;
  public color: string;

  constructor(data?: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    name: string;
    website: string;
    image: string;
    primary_color: string;
  }) {
    if (data) {
      this.id = data.ID;
      this.createdAt = data.CreatedAt;
      this.updatedAt = data.UpdatedAt;
      this.deletedAt = data.DeletedAt;
      this.name = data.name;
      this.website = data.name;
      this.website = data.website;
      this.image = data.image;
      this.color = data.primary_color;
    }
  }
}
