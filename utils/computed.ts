export function getProductName(product: any) {
    return product?.name;
}

export async function getProductImage(product: any) {
    return product?.images[0]
}

export function getProductDescription(product: any) {
    return product?.description ?? '';
}

export function getProductPrice(price: any) {
    return Number(price.unit_amount / 100).toFixed(2);
}

export function getProductSize(price: any) {
    return price?.nickname
}

export function getProductQuantity(price: any) {
    return price?.quantity;
}