import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // 🚀 animações
import "./NossaHistoria.css";

export default function NossaHistoria() {
  const nomes = [
    "Rafael Dias",
    "Eliel Reinan",
    "Gabriel Silva",
    "Icaro Almeida",
    "Pedro Coelho",
    "Thiago Carvalho",
    "Roberto Eustaquio",
  ];

  return (
    <div className="nossa-historia-container">
      <section className="nossa-historia-hero">
        <h1>Nossa História</h1>
        <p>Um sonho possível de realizar!</p>
      </section>

      <section className="nossa-historia-content">
        <div className="historia-texto">
          <h2>O começo</h2>
          <p>
            Antes de se chamar <strong>Nuza</strong>, o nosso sistema levava o
            nome de <strong>APDT</strong>. Ele foi idealizado para responder a
            uma demanda do <strong>SAGA SENAI</strong>, no município de Jaguará
            do Sul, que buscava mapear o número de pessoas com Transtorno do
            Espectro Autista (TEA) na cidade.
          </p>
        </div>

        <div className="historia-texto">
          <h2>Uma inspiração especial</h2>
          <p>
            Durante essa jornada, uma pessoa especial se tornou nossa principal
            inspiração: <strong>Vazuna Lima</strong>, mãe dedicada de uma
            criança com TEA, cuja força, voz e sensibilidade nos tocaram
            profundamente. Infelizmente, Vazuna veio a falecer no decorrer do
            projeto. Em forma de homenagem e gratidão por tudo o que ela
            representou, decidimos renomear o sistema para{" "}
            <strong>Nuza</strong> — uma lembrança viva de sua luta, sua história
            e seu amor.
          </p>
        </div>

        <div className="historia-texto">
          <h2>O propósito do Nuza</h2>
          <p>
            O Nuza nasceu do desejo de ir além da simples coleta de dados. Nossa
            equipe não se conformou em apenas levantar estatísticas. Queríamos
            oferecer uma solução concreta, que facilitasse o dia a dia das
            famílias que convivem com os desafios do TEA.
          </p>
          <p>
            Mais do que uma ferramenta digital, o Nuza representa uma voz ativa
            em nome de mães e pais como Vanuza — pessoas que enfrentam, muitas
            vezes em silêncio, uma rotina difícil, cheia de barreiras, dúvidas e
            falta de apoio. Mais do que um sistema, o Nuza representa um espaço
            de acolhimento, respeito e ação.
          </p>
          <p>
            Nossa missão é aproximar as famílias dos serviços essenciais,
            eliminar burocracias e permitir que o cuidado com as crianças venha
            em primeiro lugar. Com o Nuza, agendar uma consulta, encontrar
            informações ou ser ouvido por quem entende sua realidade deixa de
            ser um desafio e passa a ser um direito acessível.
          </p>
          <p>
            O Nuza é mais que tecnologia. É memória, é empatia, é
            transformação. E acima de tudo, é uma homenagem viva à coragem de
            tantas famílias — como a de Vanuza — que nunca deixaram de lutar por
            um futuro mais digno e inclusivo para seus filhos.
          </p>
        </div>

        <div className="historia-texto">
          <h2>Nossa Gratidão</h2>
          <p>
            O projeto Nuza só foi possível graças ao empenho e dedicação de
            pessoas que acreditaram no seu propósito desde o início. No
            princípio, a equipe era composta por{" "}
            <strong>Rafael Santiago</strong>, <strong>Samir Marinho</strong>,{" "}
            <strong>Tiago Soares</strong>, <strong>Levi</strong> e{" "}
            <strong>Gabriel Silva</strong>.
          </p>

          <p>
            Atualmente, seguimos firmes com{" "}
            {nomes.map((nome, index) => (
              <motion.span
                key={nome}
                className="nome-destaque"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
              >
                {nome}
                {index < nomes.length - 1 ? ", " : " "}
              </motion.span>
            ))}
            à frente desta missão.
          </p>

          <p>
            Gostaríamos de expressar nossa profunda gratidão a Rafael Santiago e
            Eliel Reinan, por abraçarem esse projeto com o coração e por não
            desistirem de um sonho que pode, no futuro, transformar a vida de
            milhares de famílias que convivem com o Transtorno do Espectro
            Autista.
          </p>
          <p>Obrigado por acreditarem que fazer a diferença é possível.</p>
        </div>

        {/* === Bloco final com a LOGO === */}
        <div className="historia-texto center-text">
          <img
            className="logo-nuza"
            src="/brand/logo_nuza.png"
            alt="NUZA"
          />
          <p>
            <strong>Um sonho possível de realizar</strong>
          </p>
        </div>
      </section>

      <div className="nossa-historia-actions">
        <Link to="/" className="btn-voltar">
          ← Voltar para Home
        </Link>
      </div>
    </div>
  );
}
