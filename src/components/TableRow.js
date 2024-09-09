import React from 'react';
import TableCell from './TableCell';
import styled from 'styled-components';
import { formatNumberToPrice }from '../utils/utils';

const orderStatusChange = (prevProps, nextProps) => {
    if(prevProps.searchTerm !== nextProps.searchTerm) return false;
    return prevProps.order.event_name === nextProps.order.event_name || prevProps.order.id === nextProps.order.event_name
}

const TableRowDisplay = styled.tr`
    // background-color: ${({ value}) => parseInt(value) % 2 === 0 ? 'white' : '#ebe7e7cc'};
    height: 50px;
    border-bottom: 1px solid #d5d1d1cc;
    padding-left: 1px;
`;


const TableRow = 
// React.memo(
    ({order, columns, index, searchTerm}) => {
    let rows = columns?.map((columnTitle) => {
        let value = order[columnTitle];
        if(columnTitle === 'price') value = formatNumberToPrice(value);
        if(columnTitle === 'sent_at_second' || columnTitle === 'id') return;
            return (
                <TableCell key={`${value}-${order.id}}`} value={value} columnTitle={columnTitle}/>
            )
    })

    if(columns) {
        rows.push(<TableCell key={`view-${order.id}}`} columnTitle={`view_more`}/>)
    }

    return (
        <TableRowDisplay key={order?.id} value={index}>
            {rows}
        </TableRowDisplay>
    )
}
// , orderStatusChange);


export default TableRow;