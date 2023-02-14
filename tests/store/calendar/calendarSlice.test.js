
import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventsState, calendarWithEventsState, events, initalState } from "../../fixtures/calendarState"

describe('Pruebas en el calendarSlice', () => {

    test('Debe de regresar el estado por defecto', () => {
        const state = calendarSlice.getInitialState()
        expect(state).toEqual(initalState)
    })

    test('onSetActiveEvent debe de activar el evento', () => {
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]))
        // console.log(state)
        expect(state.activeEvebt).toEqual(events[0])
    })

    test('onAddNewEvent de be de agregar el evento', () => {

        const newEvent = {
            id: '3',
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: 'Cumpleanios de Matias!!',
            notes: 'Alguna nota de Matias!!',
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent))
        // console.log(state)
        expect(state.events).toEqual([...events, newEvent])
    })

    test('onUpdateEvent debe de actualizar el evento', () => {

        const updateEvent = {
            id: '1',
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: 'Cumpleanios de Matias actualizado!!',
            notes: 'Alguna nota de Matias actualizada!!',
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updateEvent))
        // console.log(state)
        expect(state.events).toContain(updateEvent)
    })

    test('onDeleteEvent debe de borrar el evento activo', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventsState, onDeleteEvent())
        expect(state.activeEvebt).toBe(null)
        expect(state.events).not.toContain(events[0])
    })

    test('onLoadEvents debe de establecer los eventos', () => {
        const state = calendarSlice.reducer(initalState, onLoadEvents(events))
        expect(state.isLoadingEvents).toBeFalsy()
        expect(state.events).toEqual(events)

    })

    test('onLogoutEvent debe de limpiar el estado', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventsState, onLogoutCalendar())
        expect(state).toEqual(initalState)
    })

})