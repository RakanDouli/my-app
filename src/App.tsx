import { Layout } from "./components/Layout";
import Page from "./Pages/Page";
import "./styles/app.scss";
function App() {
  return (
    <Layout>
      <div className="App">
        <Page />
      </div>
    </Layout>
  );
}

export default App;
