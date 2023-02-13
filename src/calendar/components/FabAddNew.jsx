import { addHours } from "date-fns"
import { useCalendarStore, useUiSotre } from "../../hooks"

export const FabAddNew = () => {


    const { openDateModal } = useUiSotre()
    const { setAvtiveEvent } = useCalendarStore()

    const handleClickNew = () => {
        setAvtiveEvent({
            title: 'Hola',
            notes: 'Mundo',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Matias'
            }
        })
        openDateModal()
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
