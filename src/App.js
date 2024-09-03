import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { socket } from './socket';
import { addNewOrders } from './utils/utils'
import Table from './components/Table';
import SearchBar from './components/SearchBar';
import {useSearchQuery} from './hooks/hooks';
import { ColorVariables } from './constants';

const AppContainer = styled.div`
  padding: 50px;
  font-family: "Nunito", sans-serif;
  // background-image: linear-gradient(to bottom, #fde5fe, #f5e0fd, #ecdbfc, #e1d6fb, #d6d2fa);
  min-height: 100vh;
`

const HeaderSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 32px;
  flex-direction: column;
`

const HeaderText = styled.div`
  font-weight: 500;
`

const CountNumber = styled.span`
  font-weight: 603;
  font-size: 32px;
  color: ${({ value}) => ColorVariables[value]};
  margin-top: 3px;
  animation: count 10s ease-in-out infinite alternate;
`
const CountNumberText = styled.span`
  font-weight: 600;
  color: #838181;
  font-size: 14px;
  margin-top: 3px;
`

const OrderDashboard = styled.div`
  margin-top: 20px;
  height: 126px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 15%);
  display: flex;
  justify-content: space-between;
  padding: 0px 25% 0px 38px;
  align-items: center;
  background-color: #f9f2f2a1;
  border-radius: 4px;
  min-width: 532px;
  `

const OrderCountSection = styled.div`
  display: flex; 
  flex-direction: column;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 61px;
`;

const ContentSection = styled.div`
  width: 95%;
`;


function App() {
  const [filteredList, setFilteredList] = useState(null)
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [orderList, setOrderList] = useState({orders: {}, delievered: {}, inTransit: {},  cooked: {}, cancelled: {}});
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  useSearchQuery(searchQuery, setFilteredList, orderList, filteredList)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onOrderEvent(value) {
      setOrderList(previous => addNewOrders(previous, value));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('order_event', onOrderEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('order_event', onOrderEvent);
    };
  }, []);
  
  let ordersToDisplay = searchQuery ? filteredList?.orders : orderList?.orders;
  //ORDER DASHBOARD FILTERES TOTAL ORDER BUT NOT COOKED, INTRANSIT, ect - BUG

  return (
    <AppContainer>
      <ContentSection>
        <HeaderSection>
          <TopBar>
          <h2>Restaurant Orders</h2>
          <SearchBar placeholderText='Search Orders By Price' value={searchQuery} handleChange={handleSearchInputChange}/>
        </TopBar>
          <OrderDashboard>
            <OrderCountSection>
              {/* <HeaderText>Order Count</HeaderText> */}
              <CountNumber value={'TOTAL'}>{Object.values(ordersToDisplay || {}).length || 0}</CountNumber><CountNumberText> Total Orders</CountNumberText> 
            </OrderCountSection>
            <OrderCountSection>
              {/* <HeaderText>Cooked Count</HeaderText> */}
              <CountNumber  value={'COOKED_DASH'}>{Object.values(orderList?.cooked || {}).length || 0}</CountNumber><CountNumberText>Cooked</CountNumberText>  
            </OrderCountSection>
            <OrderCountSection>
              {/* <HeaderText>In Transit Count</HeaderText> */}
              <CountNumber  value={'IN_TRANSIT_DASH'}>{Object.values(orderList.inTransit || {}).length || 0}</CountNumber><CountNumberText>In Transit</CountNumberText>  
            </OrderCountSection>
            <OrderCountSection>
              {/* <HeaderText>Delivered Count</HeaderText> */}
              <CountNumber  value={'DELIVERED_DASH'}>{Object.values(orderList.delivered || {}).length || 0}</CountNumber><CountNumberText>Delivered</CountNumberText>  
            </OrderCountSection>
            <OrderCountSection>
              {/* <HeaderText>Canceled Count</HeaderText> */}
              <CountNumber  value={'CANCELLED'}>{Object.values(orderList.cancelled || {}).length || 0}</CountNumber><CountNumberText>  Cancelled</CountNumberText>  
            </OrderCountSection>
          </OrderDashboard>
        </HeaderSection>
        <Table orderList={ordersToDisplay}/>
        </ContentSection>
    </AppContainer>
  );
}

export default App;
