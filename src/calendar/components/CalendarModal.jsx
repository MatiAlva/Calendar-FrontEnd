import { addHours } from 'date-fns/esm';
import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import { differenceInSeconds } from 'date-fns';
import 'sweetalert2/dist/sweetalert2.min.css'
import Swal from 'sweetalert2';
import { useCalendarStore, useUiSotre } from '../../hooks';

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { activeEvent, startSavingEvent } = useCalendarStore()
    const { isDateModelOpen, closeDateModal } = useUiSotre()
    const [formSubmited, setFormSubmited] = useState(false)

    const [formValues, setFormValue] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const titleClass = useMemo(() => {
        if (!formSubmited) return ''

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid'

    }, [formValues.title, formSubmited])


    useEffect(() => {
        if (activeEvent !== null) {
            setFormValue({ ...activeEvent })
        }

    }, [activeEvent])


    const onInputChanged = ({ target }) => {
        setFormValue({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changid) => {
        setFormValue({
            ...formValues,
            [changid]: event
        })
    }

    const onCloseModal = () => {
        closeDateModal()
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setFormSubmited(true)

        const difference = differenceInSeconds(formValues.end, formValues.start)

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
        }


        if (formValues.title.length <= 0) return

        await startSavingEvent(formValues)
        closeDateModal()
        setFormSubmited(false)
    }



    return (
        <Modal
            isOpen={isDateModelOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={(event) => onDateChanged(event, 'start')}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event) => onDateChanged(event, 'end')}
                        className='form-control'
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="3"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChanged}

                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
