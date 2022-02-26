import Loading from "components/Loading/Loading";
import MainForm from "components/MainForm/MainForm";
import ModalResult from "components/ModalResult/ModalResult";

function MainPage() {

    return (
        <>
            <MainForm />
            <Loading />
            <ModalResult />
        </>
    );
}

export default MainPage