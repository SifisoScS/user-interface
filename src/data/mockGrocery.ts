export type GroceryCategory = 'Produce' | 'Dairy' | 'Pantry' | 'Meat' | 'Frozen' | 'Beverages' | 'Household'

export interface GroceryItem {
  id: string
  name: string
  category: GroceryCategory
  checked: boolean
  qty: string
}

export const defaultGroceryItems: GroceryItem[] = [
  { id: 'g1',  name: 'Avocados',        category: 'Produce',   checked: false, qty: '4' },
  { id: 'g2',  name: 'Baby Spinach',    category: 'Produce',   checked: false, qty: '1 bag' },
  { id: 'g3',  name: 'Tomatoes',        category: 'Produce',   checked: true,  qty: '6' },
  { id: 'g4',  name: 'Full-cream milk', category: 'Dairy',     checked: false, qty: '2L' },
  { id: 'g5',  name: 'Greek yoghurt',   category: 'Dairy',     checked: false, qty: '500g' },
  { id: 'g6',  name: 'Cheddar cheese',  category: 'Dairy',     checked: true,  qty: '400g' },
  { id: 'g7',  name: 'Olive oil',       category: 'Pantry',    checked: false, qty: '1 bottle' },
  { id: 'g8',  name: 'Brown rice',      category: 'Pantry',    checked: false, qty: '2kg' },
  { id: 'g9',  name: 'Chicken breast',  category: 'Meat',      checked: false, qty: '1kg' },
  { id: 'g10', name: 'Frozen peas',     category: 'Frozen',    checked: false, qty: '500g' },
  { id: 'g11', name: 'Sparkling water', category: 'Beverages', checked: false, qty: '6-pack' },
  { id: 'g12', name: 'Dish soap',       category: 'Household', checked: false, qty: '1' },
]
