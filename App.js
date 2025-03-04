import { UserProvider,PostsProvider } from './assets/Components/user/Post-Context';
import MainApp from './MainApp';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import store from './assets/Redux/store';
import { Provider } from 'react-redux';
const queryClient = new QueryClient();


function App() {


return (
    <Provider store={store}>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
      <PostsProvider>
        <MainApp/>
      </PostsProvider>
      </QueryClientProvider>
    </UserProvider>
    </Provider>
  );
}




export default App;
