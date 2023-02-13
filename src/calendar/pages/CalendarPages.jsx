import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer, getMessagesES } from "../../helpers"
import { useEffect, useState } from "react"
import { useUiSotre, useCalendarStore, useAuthStore } from "../../hooks"


export const CalendarPages = () => {
    const { user } = useAuthStore()
    const { events, setAvtiveEvent, startLoginEvents } = useCalendarStore()
    const { openDateModal } = useUiSotre()
    const [lasView, setLasView] = useState(localStorage.getItem('lastView') || 'week');


    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log({ event, start, end, isSelected })
        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)

        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const onDubbleClick = (event) => {
        // console.log({ doubleClick: event })
        openDateModal()
    }

    const onSelect = (event) => {
        // console.log({ click: event })
        setAvtiveEvent(event)
    }

    const onViewChanged = (event) => {
        // console.log({ viewChanged: event })
        localStorage.setItem('lastView', event)
        setLasView(event)
    }


    useEffect(() => {
        startLoginEvents()
    }, [])


    return (
        <>
            <Navbar />

            <Calendar
                culture="es"
                localizer={localizer}
                events={events}
                defaultView={lasView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDubbleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />

        </>
    )
}
