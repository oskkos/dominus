export class ForbiddenError extends Error {
  constructor(private readonly type: string, private readonly data: {}) {
    super();
  }

  toString(): string {
    return `${this.type} forbidden with data ${JSON.stringify(this.data)}`;
  }
}
