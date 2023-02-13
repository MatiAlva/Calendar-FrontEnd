import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';
// const tempEvent = {
//     _id: new Date().getTime(),
//     title: 'Cumpleanios del Jefe',
//     notes: 'Hay que comprar el pastel',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//         _id: '123',
//         name: 'Matias'
//     }
// }


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [],
        activeEvebt: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvebt = payload
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload)
            state.activeEvebt = null
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    return payload
                }

                return event
            })
        },
        onDeleteEvent: (state) => {
            if (state.activeEvebt) {
                state.events = state.events.filter(event => event.id !== state.activeEvebt.id)
                state.activeEvebt = null
            }
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false
            // state.events = payload
            payload.forEach(event => {
                const exists = state.events.some(dbEvents => dbEvents.id === event.id)
                if (!exists) {
                    state.events.push(event)
                }
            })
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true
            state.events = []
            state.activeEvebt = null
        }
    }

});


//Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions;