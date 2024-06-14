export class NewUserSubscriptionEvent {
  constructor(
    public readonly userId: number,
    public readonly userName: string,
    public readonly coachId: number,
    public readonly coachName: string,
    public readonly packageId: number,
  ) {}
}
