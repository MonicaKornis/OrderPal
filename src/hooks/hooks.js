import { useEffect } from 'react';
import { filterOrdersByPrice } from "../utils/utils";

export const useSearchQuery = (searchQuery, setFilteredList, data, prevFilteredList) => {
    const orders = data.orders;
    let filteredListByPrice = searchQuery ? filterOrdersByPrice(orders, searchQuery, prevFilteredList) : {orders: {}};
    let listChange = JSON.stringify(filteredListByPrice?.orders) ===  JSON.stringify(prevFilteredList?.orders);
    useEffect(() => {
        if(!searchQuery) {
            return
        } 
        setFilteredList(filteredListByPrice);
      }, [listChange, searchQuery])
}
