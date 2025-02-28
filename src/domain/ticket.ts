

export class Ticket {

  id: string;
  number: number;
  createdAt: Date;
  done: boolean;
  handleAt?: Date;
  handleAtDesk?: string;

  constructor(
    id: string,
    number: number,
    createdAt: Date,
    done: boolean,
    handleAt?: Date,
    handleAtDesk?: string,
  ) {
    this.id = id;
    this.number = number;
    this.createdAt = createdAt;
    this.handleAtDesk = handleAtDesk;
    this.handleAt = handleAt;
    this.done = done;
  }

}