import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvebt } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)

    const setAvtiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        //TODO: Update event

        try {
            if (calendarEvent.id) {
                //Actualizando
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({ calendarEvent, user }))
                return
            }
            //creando
            const { data } = await calendarApi.post('/events', calendarEvent)
            // console.log({ data })
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.eventGuardado.id, user }))

        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }
    }

    const startdeletingEvent = async () => {
        //TODO: llegar al backend
        try {
            await calendarApi.delete(`/events/${activeEvebt.id}`)
            dispatch(onDeleteEvent())

        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data.msg, 'error')
        }
    }


    const startLoginEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events')
            // console.log({ data })
            const events = convertEventsToDateEvents(data.eventos)
            dispatch(onLoadEvents(events))
            // console.log(events)
        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)
        }
    }



    return {
        //*Propiedades
        events,
        activeEvebt,
        hasEventSelect: !!activeEvebt,

        //* Metodos
        setAvtiveEvent,
        startSavingEvent,
        startdeletingEvent,
        startLoginEvents
    }
}
