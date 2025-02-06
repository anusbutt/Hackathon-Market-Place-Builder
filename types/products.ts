export interface Product {
    cartQuantity:number;
    maxStock: number;
    rating: number;
    colors: any;
    // inventory: number; // Ensure inventory is a number
    title: string;
    oldPrice: number;  // If you're going to use it for calculations
    originalPrice: number; // Same as oldPrice, ensure it's a number
    sale: any;
    _id: string;
    name: string;
    price: number; // price is a number, so this is fine
    type: "product";
    description?: string;
    image?: {
        asset: {
            _ref: string;
            _type: "image";
        }
    };
    slug: {
        _type: "slug";
        current: string;
    };
    inventory: number;
}
