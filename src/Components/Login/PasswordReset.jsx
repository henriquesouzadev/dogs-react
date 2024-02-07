import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import { PASSWORD_RESET } from '../../Api/settings'
import Error from '../Helper/Error'

const PasswordReset = () => {
  let [searchParams] = useSearchParams()
  const { error, loading, request } = useFetch()
  const navigate = useNavigate()
  const password = useForm()

  const [login, setLogin] = useState('')
  const [key, setKey] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login: login,
        key: key,
        password: password.value
      })
      const { response } = await request(url, options)
  
      if (response.ok) navigate('/login')
    }
  }

  useEffect(() => {
    const key = searchParams.get('key')
    const login = searchParams.get('login')

    if (key) setKey(key)
    if (login) setLogin(login)
  }, [searchParams])

  return (
    <section className="animeLeft">
      <h1 className="title">Resete a Senha</h1>

      <form onSubmit={handleSubmit}>
        <Input label="Nova Senha" type="password" name="password" {...password} />

        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
        
        <Error error={error} />
      </form>
    </section>
  )
}

export default PasswordReset