import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../Context/UserContext";
import styles from './Form.module.css'
import stylesBtn from '../Forms/Button/index.module.css'
import Error from "../Helper/Error";

const Form = () => {
  const userContext = React.useContext(UserContext)

  const username = useForm();
  const password = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.validate && password.validate()) {
      userContext.userLogin(username.value, password.value)
    }
  };

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>

      <form className={styles.form} action="" onSubmit={handleSubmit}>
        <Input label="Usuário" name="username" type="text" {...username} />
        <Input label="Senha" name="password" type="password" {...password} />

        {userContext.loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        
        <Error error={userContext.error && 'Dados incorretos.' } />
      </form>

      <Link className={styles.perdeu} to="/login/perdeu">Perdeu a senha?</Link>

      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
      
        <Link className={stylesBtn.button} to="/login/criar">Cadastro</Link>
      </div>
    </section>
  );
};

export default Form;
