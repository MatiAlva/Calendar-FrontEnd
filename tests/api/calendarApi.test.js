import calendarApi from "../../src/api/calendarApi"


describe('Pruebas en el calendarApi', () => {

    test('Debe de tener la donfiguracion por defecto', () => {

        // console.log(calendarApi)
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)

    })


    test('Debe de tener el x-token en el header de todas las peticiones', async () => {

        const token = 'ABC-123-XYZ'
        localStorage.setItem('token', token)
        const resp = await calendarApi.get('/auth')
        // console.log(resp.config.headers['x-token'])
        expect(resp.config.headers['x-token']).toBe(token)

    })
})