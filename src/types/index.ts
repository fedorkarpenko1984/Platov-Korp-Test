export type TNavLink = {
  routeName: string,
  label: string
}

export type TCartNote = {
  cardId: number,
  amountInCart: number
}

export type TMessage = {
  text: string,
  type?: 'warning' | 'success'
}

export interface IProductCard {
  id: number;
  title: string;
  image?: string;
  category: number;
  description: string;
  price: number;
  old_price: number;
  count: number;
  size: string[];
}

