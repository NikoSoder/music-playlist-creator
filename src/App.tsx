import "./App.css";
import Header from "./components/Header";
import FilterSection from "./components/FilterSection";
import Modal from "./components/Modal";
import { useState } from "react";

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false); // set this to true when playlist is created

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <main className="p-4">
      <Header />
      <FilterSection
        setIsOpenModal={setIsOpenModal}
        isOpenModal={isOpenModal}
      />
      {isOpenModal && <Modal handleCloseModal={closeModal} />}
    </main>
  );
}

export default App;
