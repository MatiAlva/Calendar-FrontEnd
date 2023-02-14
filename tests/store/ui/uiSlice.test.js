import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice"

describe('Pruebas en uiSlice', () => {

    test('Debe de regresar el estado por defecto', () => {

        // console.log(uiSlice.getInitialState())
        expect(uiSlice.getInitialState()).toEqual({ isDateModelOpen: false })
        expect(uiSlice.getInitialState().isDateModelOpen).toBeFalsy()

    })

    test('Debe de cambiar el isDateModalOpen correctamente', () => {

        let state = uiSlice.getInitialState()
        state = uiSlice.reducer(state, onOpenDateModal())
        // console.log(state)
        expect(state.isDateModelOpen).toBeTruthy()

        state = uiSlice.reducer(state, onCloseDateModal())
        // console.log(state)
        expect(state.onCloseDateModal).toBeFalsy()

    })

})