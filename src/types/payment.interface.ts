export interface IPaymentListItem {
    id: string;
    amount: number;
    paymentStatus: string;
    transactionId: string;
    createdAt: string;
    user?: { name: string; email: string };
    event?: { title: string; slug: string };
}
