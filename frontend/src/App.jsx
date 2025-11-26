import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import {AppRouter} from "./components/routes/AppRouter"
function App() {
  return (
    
      <div className="app-container">
        <Menu></Menu>
        <main className="main-content">
          <AppRouter />
        </main>

        <Footer></Footer>
      </div>
    
  );
}
export default App;
