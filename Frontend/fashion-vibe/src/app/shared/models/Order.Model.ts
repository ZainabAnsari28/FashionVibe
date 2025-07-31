import { OrderItem } from "./OrderItem.Model";

// export interface Order {
//     id: number;
//     orderDate: string;
//     status: string;
//     items: OrderItem[];
// }

export interface Order {
  id: number;
  orderDate: string;
  status: string;
  items: OrderItem[];
  totalAmount?: number; // optional if not returned from backend
}

