import OrdersLists from "./components/OrdersList";
import ChallengesContextProvider from "./store/orders-context";

function App() {
  return (
    <ChallengesContextProvider>
      <OrdersLists />
    </ChallengesContextProvider>
  );
}

export default App;
