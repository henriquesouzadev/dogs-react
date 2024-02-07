import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import { USER_POST } from '../../Api/settings'
import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import useFetch from '../../Hooks/useFetch'
import Error from '../Helper/Error'

const Create = () => {
  const userContext = useContext(UserContext)
  const fetch = useFetch()
  const username = useForm()
  const email = useForm('email')
  const password = useForm()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value
    })
    const { response } = await fetch.request(url, options)

    if (response.ok) {
      userContext.userLogin(username.value, password.value)
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>

      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="E-mail" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />

        {fetch.loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}

        <Error error={fetch.error} />
      </form>
    </section>
  )
}

export default Create