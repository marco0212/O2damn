import { firebaseService } from "@libs/constructor-third-party";
import { Database, get, getDatabase, push, ref, set } from "firebase/database";

export class Model<T> {
  private db: Database;
  private namespace: string;

  constructor(collectionName: string) {
    this.db = getDatabase(firebaseService.app);
    this.namespace = collectionName;
  }

  public async create(entity: Omit<T, "id">) {
    const listRef = ref(this.db, this.namespace);
    const newEntityRef = push(listRef);
    set(newEntityRef, entity);
  }

  public async find(): Promise<T[]> {
    const listRef = ref(this.db, this.namespace);
    const result = await get(listRef);
    return result.val();
  }
}
