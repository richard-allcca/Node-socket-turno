import { v4 as uuidV4 } from 'uuid';

export class UuiAdapter {

  public static v4(): string {
    return uuidV4();
  }
}