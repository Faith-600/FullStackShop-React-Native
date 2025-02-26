import { UserProvider,PostsProvider } from './assets/Components/user/Post-Context';
import MainApp from './MainApp';

function App() {


  return (
    <UserProvider>
      <PostsProvider>
        <MainApp/>
      </PostsProvider>
    </UserProvider>
  );
}




export default App;
