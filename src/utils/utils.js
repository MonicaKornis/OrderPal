export const filterOrdersByPrice = (orderList, searchTerm) => {
    const orderKeys = Object.keys(orderList);
    const filtered = {};
    let removeDecimal = searchTerm.split('.').join('')
    orderKeys.forEach(key => {
        let currentOrderPrice = orderList[key].price;
        if(priceMatchesSearch(currentOrderPrice, removeDecimal)) filtered[key] = orderList[key];
    });
    return { orders:  filtered }
}

const priceMatchesSearch = (price=0, searchTerm='') => {
    let priceCharacters = price?.toString().split('').slice(0,searchTerm.length+1);
    return priceCharacters.join('').includes(searchTerm);
}

export const formatNumberToPrice = (number) => {
    let str = number.toString().split('');
    let cents = str.slice(-2).join('');
    let dollars = str.slice(0, str.length - 2).join('');
    return "$" + dollars + "." + cents;
} // written under the assumption that the last two digits for the price represent cents

export const addNewOrders = (existingOrders, newOrders, deliveredList={}, cookedList={}, inTransitList={}, canceledList={}) => {
    let orders = existingOrders?.orders || {};
    let delivered = existingOrders.delivered || deliveredList;
    let cooked = existingOrders.cooked || cookedList;
    let inTransit = existingOrders.inTransit || inTransitList;
    let canceled = existingOrders.cancelled || canceledList;


    newOrders.forEach((order) => {
        orders[order.id] = order;
        if(order.event_name === 'DELIVERED') {
            delivered[order.id] = order;
        }
        if(order.event_name === 'COOKED') {
            cooked[order.id] = order;
        }
        if(order.event_name === "IN_TRANSIT") inTransit[order.id] = order;
        if(order.event_name === "CANCELLED") canceled[order.id] = order;
        if(cooked[order.id] && order.event_name !== "COOKED") delete cooked[order.id];
        if(inTransit[order.id] && order.event_name !== "IN_TRANSIT") delete inTransit[order.id];
        if(delivered[order.id] && order.event_name !== "DELIVERED") delete delivered[order.id];
    })
    
    return { orders:  structuredClone(orders), delivered: delivered,  cooked: cooked, inTransit: inTransit, cancelled: canceled}
}

function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
}

export const removeUnderscore = (string) => string.toLowerCase().split("_").map(word => capitalizeFirstLetter(word)).join(' ')


export const createInitials = (string) => string.toUpperCase().split(' ').map(name => name.split('')[0]).slice(0,2).join('')
