export interface OrderItem {
id: number;
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
    };
    quantity: number;
}
