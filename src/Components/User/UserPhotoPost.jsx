import { useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import styles from "./UserPhotoPost.module.css";
import { PHOTO_POST } from "../../Api/settings";
import { useNavigate } from "react-router-dom";

const UserPhotoPost = () => {
  const { data, error, loading, request } = useFetch();
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const navigate = useNavigate()

  const [img, setImg] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("idade", idade.value);
    formData.append("peso", peso.value);

    const token = localStorage.getItem("token");
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  };

  const handleChangeImg = (e) => {
    setImg({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
  };

  useEffect(() => {
    if (data) navigate('/conta')
  }, [data, navigate])

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="text" name="peso" {...peso} />
        <Input label="Idade" type="text" name="idade" {...idade} />
        <input
          type="file"
          className={styles.file}
          name="img"
          id="img"
          onChange={handleChangeImg}
        />

        {loading ? <Button disabled>Enviando...</Button> : <Button>Enviar</Button>}

        <Error error={error} />
      </form>

      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img.preview})` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
