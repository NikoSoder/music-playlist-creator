import "./App.css";
import Header from "./components/Header";
import FilterSection from "./components/FilterSection";
import Modal from "./components/Modal";

function App() {
  return (
    <main className="p-4">
      <Header />
      <FilterSection />
      <Modal />
    </main>
  );
}

export default App;
