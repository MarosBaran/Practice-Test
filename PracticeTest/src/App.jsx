import OrdersLists from "./components/OrdersList";
import ChallengesContextProvider from "./store/orders-context";
import "./App.css";

function App() {
  return (
    <ChallengesContextProvider>
      <OrdersLists />
    </ChallengesContextProvider>
  );
}

export default App;
