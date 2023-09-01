export default function discount(price, mrp){
    let discount= ((mrp-price)/mrp)*100;
    return Math.round(discount);
}