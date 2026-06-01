require("dotenv").config();
import nodemailer from "nodemailer";

const mensageiro = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const notifyOverdueLoan = (
  destinatario: string,
  tituloLivro: string,
  nomeCliente: string,
) => {
  const conteudo = {
    from: process.env.MAIL_USER,
    to: destinatario,
    subject: "Livro com devolução pendente.",
    text: `Olá, ${nomeCliente}! O livro "${tituloLivro}" passou da data de devolução. Por favor, regularize sua situação na biblioteca.`,
  };

  return mensageiro
    .sendMail(conteudo)
    .then((response: any) => {
      console.log("Email enviado com sucesso.");
      return response;
    })
    .catch((err: any) => {
      console.error("Erro ao enviar mensagem:", err);
      throw err;
    });
};
