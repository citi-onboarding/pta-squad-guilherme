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
  dataPrevista: string,
) => {
  const conteudo = {
    from: process.env.MAIL_USER,
    to: destinatario,
    subject: "Lembrete: Livro com devolução pendente",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="padding: 20px;">
          <h2 style="color: #333;">Lembrete de Devolução</h2>
          <p>Olá <strong>${nomeCliente}</strong>,</p>
          <p>Notamos que o livro <strong>"${tituloLivro}"</strong> está com a devolução pendente.</p>
          <p>A data prevista de devolução era <strong>${dataPrevista}</strong>.</p>
          <p>Por favor, devolva o livro o mais breve possível.</p>
          <p>Atenciosamente,<br/>Equipe da Biblioteca Escolar</p>
        </div>
        <div style="background-color: #e5e7eb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
          Este é um email automático. Por favor, não responda.
        </div>
      </div>
    `,
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
