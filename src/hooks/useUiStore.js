import { useSelector, useDispatch } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiSotre = () => {

    const dispatch = useDispatch();
    const { isDateModelOpen } = useSelector(state => state.ui)

    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }


    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }

    return {
        //*Propiedades
        isDateModelOpen,

        //*Metodos
        openDateModal,
        closeDateModal
    }

}