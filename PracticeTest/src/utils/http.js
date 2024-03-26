import axios from "axios";

export async function fetchOrders () {

    let response;

    try{
        response = await axios.get(
            "https://api.sunrero.space/order_menu_orders/my_orders?state[]=completed&state[]=canceled_by_customer&state[]=rejected&state[]=expired&state[]=failed&resort=%2Fresorts%2F0dbfee1d-af9d-4489-ad9a-0c402907a028&itemsPerPage=6&page=1",
            {
              headers: {
                'Authorization':
                  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDk3OTg4OTUsImV4cCI6MTc0MTM1NTg0Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoicmFkb3NsYXZAZWxpdHkuZGV2In0.YISa1YJkjHBbI7jXOOhIK6oVZT12jOaKuPdbG5MBsS3G7Ovi4bhcPNMhcEXjl13EjPk56EJgIjwuEpL-WvUYNdXO8eEZa4vPCKRhDnzYMnL1Jp5UL3F0nVgek0GtQEPfYDVc8vGY_xlKb681eRzJzsTq06z5x44s1POlGAvbJQcGS9FrGAMCaaMHhU4bX0I88W7zx7s2lJQnNQvcaCOL4cTi9hv5oeLlIYcZZGyXxCa6RYEuIPw1X1Mc2PvG84CBQUJSVGJEexeyrbrMK8e3XNo4hbPPL4s2nFp6j8hrwURH12gusLLVKX8J5SbWjsgdBV2wg2kZklvuTDsOZP7yow",
              },
            }
          )
    } catch (error) {
        throw new Error( error.message ? error.message :"Error fetching orders");
    }
    return await response;
}


