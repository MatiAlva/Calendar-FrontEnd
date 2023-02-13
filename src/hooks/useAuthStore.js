import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store'
import { onLogoutCalendar } from "../store/calendar/calendarSlice"



export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()


    const startLogin = async ({ email, password }) => {
        console.log({ email, password })
        dispatch(onChecking())
        try {
            const { data } = await calendarApi.post('/auth', { email, password })
            console.log({ data })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            console.log({ error })
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }

    const startRegister = async ({ email, password, name }) => {
        console.log({ email, password })
        dispatch(onChecking())
        try {
            const { data } = await calendarApi.post('/auth/new', { email, password, name })
            console.log({ data })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || 'Error en el registro'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }


    const checkAuthToken = async () => {
        const token = localStorage.getItem('token')
        if (!token) return dispatch(onLogout())

        try {
            const { data } = await calendarApi.get('auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (error) {
            localStorage.clear()
            dispatch(onLogout())
        }
    }


    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogoutCalendar())
        dispatch(onLogout())
    }

    return {
        //* Propiedades
        status,
        user,
        errorMessage,

        //*Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}
