export interface CardType {
  id: string;
  cardType?: string;
  cardNumber?: string;
  cardName: string;
  expiry?: string;
  cvc?: string;
  accountNumber?: string;
  routingNumber?: string;
  last4?: string;
}

export interface PaymentType {
  summary: {
    originalPrice: number;
    savings: number;
    storePickup: number;
    tax: number;
    total: number;
  };
  savedCards: CardType[];
}
