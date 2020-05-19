export class UserModel {
  id: number;
  first_name: string;
  last_name: string;
}

export class OrderModel {
  id: number;
  customer: string;
  user: UserModel;
  amount: number;
  price: number;
  deleted: boolean;
  date_created: string;
  date_last_updated: string;
}
