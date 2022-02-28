import Loading from "components/Loading/Loading";
import MainForm from "components/MainForm/MainForm";
import ModalResult from "components/ModalResult/ModalResult";
import { useGlobalContext } from "contexts/useGlobalContext";

function MainPage() {
    const { isModalOpen } = useGlobalContext()
    
    return (
        <>
            <MainForm />
            <Loading />
            {isModalOpen && <ModalResult />}
        </>
    );
}

export default MainPage