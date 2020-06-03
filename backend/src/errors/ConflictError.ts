export class ConflictError extends Error {
  constructor(private readonly type: string, private readonly data: {}) {
    super();
  }

  toString(): string {
    return `${this.type} conflict with data ${JSON.stringify(this.data)}`;
  }
}
