import { memo } from 'react';
import styled from 'styled-components';
import { removeUnderscore, createInitials } from '../utils/utils';
import { ColorVariables, BackgroundColorVariables } from '../constants';

const Cell = styled.td`
    font-weight: 500;
    // padding: 1% 1% 1.4% 1.5%;
    padding: 1.2% 1.3% 1.2% 1.8%;
    min-width: 100px;
`;

const CellContents = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;


const Badge = styled.div`
    background-color: ${({ value}) => BackgroundColorVariables[value]};
    height: 13px;
    display: flex;
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 8px 6px 8px;
    color: #194a07;
    font-size: 11.5px;
    color: ${({ value}) => ColorVariables[value]};
`;

const ViewButton = styled.button`
    background-color: #ffb3f7;
    height: 13px;
    display: flex;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 11px 13px 11px 13px;
    color: #194a07;
    font-size: 11.5px;
    color: #780d6d;
    border: 1px solid pink;
`;

const NameBadge = styled.div`
    background-color: ${({ value}) => BackgroundColorVariables['CREATED']};
    height: 15px;
    display: flex;
    width: 15px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px;
    color: #194a07;
    font-size: 11px;
    color: ${({ value}) => ColorVariables['CREATED']};
    margin-right: 14px;
`;

const CustomerName = styled.div``

const NameBadgeSection = styled.div`
    display: flex;
    align-items: center
`

const TableCell = memo(
    ({value, columnTitle}) => {
    let contents;
    if(columnTitle === 'event_name') {
        contents = <NameBadgeSection><Badge value={value}>{removeUnderscore(value)}</Badge></NameBadgeSection>
    } else if (columnTitle === 'view_more') {
        contents = <NameBadgeSection><ViewButton value={value}>View</ViewButton></NameBadgeSection>
    } else {
        contents = <CellContents>{value}</CellContents>;
    } 
    if(columnTitle === 'customer' ){
        const initials = createInitials(value);
        const customerNameSection = <NameBadgeSection><NameBadge>{initials}</NameBadge><CustomerName>{value}</CustomerName></NameBadgeSection>;
        contents = customerNameSection;
    } 

    return (
        <Cell key={`${value}-${columnTitle}`}>{contents}</Cell>
    )
 }
);


export default TableCell;