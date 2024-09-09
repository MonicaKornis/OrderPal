import TableRow from './TableRow'
import React from 'react';
import styled from 'styled-components';
import {removeUnderscore } from '../utils/utils';


const OrderTable = styled.table`
    font-size: 13px;
    margin-top: 20px;
    /* box-shadow: 0 3px 10px rgb(0 0 0 / 0.2); */
    border-collapse: collapse;
    max-height: 600px;
    overflow: scroll;
    width: 100%;
    border-collapse: collapse;
    border-radius: 13px;
    border: 1px solid #80808047;
`;

const Column = styled.th`
    height: 40px;
    /* background-color: #ebe7e7cc; */
    font-size: 14px;
    weight: 600;
    padding: 0.8% 1.2% 0.8% 1.8%;
    text-align: left;
    border-bottom: 1px solid #cccc;
    color: #434343;
`;

const Table = React.memo(({orderList, searchTerm}) => {
    const firstOrder = orderList && Object.values(orderList)[0];
    const columns = firstOrder && Object.keys(firstOrder);

    const header = firstOrder && columns.map((colName, i) => {
      if(colName === 'sent_at_second' || colName === 'id') return; 
      if(colName === 'event_name') return  <Column scope="col" key={`${colName}`}>Status</Column>
       return (
        <Column scope="col" key={`${colName}`}>{removeUnderscore(colName)}</Column>
       )
    }
);

    if(header) {
        header.push(<Column scope="col" key={`more-info`}></Column>)
    }


    const allOrders = orderList && Object.values(orderList);
    const rows = allOrders?.map((order,i) => {
        return (
            <TableRow key={`${order.id}`} index={i} order={order} columns={columns} searchTerm={searchTerm}/>
        )
    })

    let rows1 = [];
    for (var i = 0; i < 10; i++) {
      let order = allOrders ? allOrders[i] : [];
      if(order) rows1.push(<TableRow index={i} order={order} columns={columns}/>)
    }

    return(
        <OrderTable>
            <thead>
                <tr>
                {header}
                </tr>
            </thead>
            <tbody>
            {rows1}
            </tbody>
        </OrderTable>
    )
},
(prevProps, nextProps) => {
    if(prevProps.searchTerm !== nextProps.searchTerm) return false;
    if (JSON.stringify(prevProps) === JSON.stringify(nextProps) ) {
        return true; 
    } //using stringify since key order never changes 
    return false;
}
);

export default Table; 