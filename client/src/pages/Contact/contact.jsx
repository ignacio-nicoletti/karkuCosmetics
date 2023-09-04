import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { UpdateAdmin } from "../../functions/FetchAdmin";
import "./contact.css";
import Navbar from "../../components/NavBar/navbar";

//no hace falta estar logeado
// name email phone message

export const Contact = () => {
  const [dataMensaje, setDataMensaje] = useState({
    user_name: "Nombre",
    user_email: "Apellido",
    user_phone: "Telefono",
    user_message: "",
  });

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        // process.env.SERVICE_ID,
        // process.env.TEMPLATE_ID,
        // form.current,
        // process.env.PUBLIC_KEY
        "service_s836qxd",
        "template_wqs3znu",
        form.current,
        "-0s9Tt65BXxLivqvY"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    UpdateAdmin(dataMensaje);
  };

  const handlerChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setDataMensaje({ ...dataMensaje, [property]: value });
  };

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h3>
          Si tenés alguna consulta o si necesitas hacer un pedido por mayor,
          envianos tu mensaje y te responderemos al a brevedad.
        </h3>

        <div>
          <form ref={form} onSubmit={sendEmail}>
            <label>Nombre</label>
            <input
              type="text"
              name="user_name"
              onChange={handlerChange}
              placeholder="Nombre"
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="user_email"
              onChange={handlerChange}
              placeholder="Email"
              required
            />
            <label>Numero</label>
            <input
              type="number"
              name="user_phone"
              onChange={handlerChange}
              placeholder="Numero telefonico"
              required
            />
            <label>Mensaje</label>
            <textarea
              name="user_mesagge"
              onChange={handlerChange}
              placeholder="Mensaje"
              required
            />
            <input type="submit" value="Enviar" />
          </form>
        </div>
      </div>
    </>
  );
};
