import { firebaseService } from "@libs/constructor-third-party";
import {
  Database,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";

type OperationOption = { path?: string };
export class Model<T> {
  private db: Database;
  private namespace: string;

  constructor(collectionName: string) {
    this.db = getDatabase(firebaseService.app);
    this.namespace = collectionName;
  }

  public async appendTo(entity: Omit<T, "id">, option?: OperationOption) {
    const path = option?.path ?? "";
    const targetEntityRef = ref(this.db, `${this.namespace}/${path}`);
    const childLocation = push(targetEntityRef);
    set(childLocation, { ...entity, id: childLocation.key });

    return { id: childLocation.key, ...entity };
  }

  public async find(option?: OperationOption): Promise<T[]> {
    const path = option?.path ?? "";
    const targetRef = ref(this.db, `${this.namespace}/${path}`);
    const snapshot = await get(targetRef);
    const value = snapshot.val() as Record<string, T>;
    return this.convetToArray(value);
  }

  public async findOne({ path }: Required<OperationOption>): Promise<T> {
    const targetRef = ref(this.db, `${this.namespace}/${path}`);
    const snapshot = await get(targetRef);
    return { ...snapshot.val(), id: path };
  }

  public onChange(
    callback: (value: T[] | null) => void,
    option?: OperationOption
  ) {
    const path = option?.path ?? "";
    const listRef = ref(this.db, `${this.namespace}/${path}`);
    const unsubscribe = onValue(listRef, (snapshot) => {
      const value = snapshot.val() as Record<string, T> | null;

      if (!value) {
        callback(value);
      } else {
        callback(this.convetToArray(value));
      }
    });

    return unsubscribe;
  }

  private convetToArray(collection: Record<string, T>) {
    const keys: string[] = Object.keys(collection);
    return keys.map((key) => ({ id: key, ...collection[key] }));
  }
}
