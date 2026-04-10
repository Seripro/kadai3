export class Record {
  constructor(
    public created_at: string,
    public id: string,
    public time: number | null,
    public title: string
  ) {}
}
