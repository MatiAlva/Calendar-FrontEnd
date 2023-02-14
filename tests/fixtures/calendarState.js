
export const events = [
    {
        id: '1',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),
        title: 'Cumpleanios de Matias',
        notes: 'Alguna nota de Matias',
    },
    {
        id: '2',
        start: new Date('2022-11-08 13:00:00'),
        end: new Date('2022-11-08 15:00:00'),
        title: 'Cumpleanios de Juanito',
        notes: 'Alguna nota de Juanito',
    }
]


export const initalState = {
    isLoadingEvents: true,
    events: [],
    activeEvebt: null
}


export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvebt: null
}


export const calendarWithActiveEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvebt: { ...events[0] }
}

