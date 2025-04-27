export class LocalStorageService<TAttributes extends { id: number }> {
  #key: string;

  constructor(key: string) {
    this.#key = key;
  }

  async #read(): Promise<TAttributes[]> {
    const records = localStorage.getItem(this.#key);
    if (!records) return [];
    try {
      return JSON.parse(records);
    } catch {
      return [];
    }
  }

  async #save(records: TAttributes[]) {
    localStorage.setItem(this.#key, JSON.stringify(records));
  }

  async getAll(where?: {
    [K in keyof TAttributes]?: TAttributes[K] | Array<TAttributes[K]>;
  }) {
    const records = await this.#read();
    if (!where) return records;
    const entries = Object.entries(where) as [
      keyof typeof where,
      (typeof where)[keyof typeof where],
    ][];
    return entries.reduce((prev, [key, value]) => {
      return prev.filter((record) => {
        if (Array.isArray(value)) {
          return value.includes(record[key]);
        }
        return record[key] === value;
      });
    }, records);
  }

  async getOne(where: {
    [K in keyof TAttributes]?: TAttributes[K] | Array<TAttributes[K]>;
  }): Promise<TAttributes> {
    const results = await this.getAll(where);
    const record = results[0];

    if (!record) {
      throw new Error(
        `Record "${this.#key}" matching filter ${JSON.stringify(where)} not found.`,
      );
    }

    return record;
  }

  async create(input: Omit<TAttributes, "id">): Promise<TAttributes> {
    const records = await this.#read();
    const id = records.length > 0 ? records[records.length - 1].id + 1 : 1;

    const newRecord = { ...input, id } as TAttributes;

    await this.#save([...records, newRecord]);
    return newRecord;
  }
}

export type RoutineDayAttributes = {
  id: number;
  name: string;
};
export const routineDayService = new LocalStorageService<RoutineDayAttributes>(
  "routine-day",
);

export type RoutineExerciseAttributes = {
  id: number;
  name: string;
  dayId: number;
};
export const routineExerciseService =
  new LocalStorageService<RoutineExerciseAttributes>("routine-exercise");
