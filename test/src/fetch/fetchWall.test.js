import { login } from "../../../src/fetch/fetchLogIn"

describe('Pruebas en fetchLogin.js',()=>{

    test('Debe responder con exito el logIn, al darle un usuario correcto', async()=>{

        const user = {
            email:'mau@gmail.com',
            password:'1133222q'
        }

        const res = await login(user)

        const { localId, idToken } = res

        const obj = {
            email: user.email,
            localId,
            idToken,
            expiresIn: '3600'
        }

        expect(res).toStrictEqual(obj)
    })
})