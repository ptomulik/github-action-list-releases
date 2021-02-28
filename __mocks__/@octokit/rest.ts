interface Parameters {
  per_page?: number | null;
}

export class Octokit {
  entries: unknown[];
  stop: boolean;

  constructor(entries: unknown[]) {
    this.entries = entries;
    this.stop = false;
  }

  async paginate(
    _: unknown,
    parameters: Parameters,
    callback: (response: unknown, done: () => void) => unknown[]
  ): Promise<unknown[]> {
    const size = parameters.per_page || 30;
    let data = [] as unknown[];
    for (let beg = 0; beg < this.entries.length && !this.stop; beg += size) {
      const chunk = this.entries.slice(beg, beg + size);
      data = data.concat(
        callback({ data: chunk }, () => {
          this.done();
        })
      );
    }
    return data;
  }

  done(): void {
    this.stop = true;
  }
}
