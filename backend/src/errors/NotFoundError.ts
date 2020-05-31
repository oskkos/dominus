export class NotFoundError extends Error {
  constructor(private readonly type: string, private readonly data: {}) {
    super();
  }

  toString(): string {
    return `${this.type} not found with data ${JSON.stringify(this.data)}`;
  }
}
