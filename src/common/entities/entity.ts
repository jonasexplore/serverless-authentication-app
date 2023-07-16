export abstract class Entity<T = any> {
  constructor(public readonly props: T) {}

  toJSON(): Required<{ id: string } & T> {
    return {
      ...this.props,
    } as Required<{ id: string } & T>;
  }
}
