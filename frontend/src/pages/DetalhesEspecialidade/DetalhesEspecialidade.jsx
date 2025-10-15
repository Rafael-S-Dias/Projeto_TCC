import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetalhesEspecialidade.modelo.css";

const textos = {
  "Neuropediatra": { // CORRIGIDO
    titulo: "Neuropediatra",
    descricao: "O neuropediatra é o médico especializado em cuidar do sistema nervoso das crianças. Ele avalia e trata condições como autismo, epilepsia, atrasos no desenvolvimento e dificuldades de aprendizagem. Acompanhamento com o neuropediatra ajuda a melhorar a qualidade de vida da criança, promovendo desenvolvimento saudável e orientando a família."
  },
  "Psiquiatra-infantil": { // CORRIGIDO
    titulo: "Psiquiatra Infantil",
    descricao: "O psiquiatra infantil cuida da saúde mental das crianças e adolescentes. Ele diagnostica e trata transtornos como ansiedade, depressão, TDAH e autismo. Seu acompanhamento é fundamental para equilibrar emoções, melhorar comportamentos e apoiar o desenvolvimento escolar e social."
  },
  "Psicologo": { // CORRIGIDO
    titulo: "Psicólogo",
    descricao: "O psicólogo trabalha com o bem-estar emocional e social. Ele auxilia a criança a lidar com sentimentos, dificuldades de relacionamento e problemas comportamentais. As terapias ajudam na autoestima, comunicação e adaptação em diferentes ambientes."
  },
  "Fonoaudiologo": { // CORRIGIDO
    titulo: "Fonoaudiólogo",
    descricao: "O fonoaudiólogo cuida da comunicação, fala e linguagem. Ajuda crianças com dificuldade de falar, compreender ou interagir. Também atua em questões de deglutição e audição. Seu trabalho melhora a interação social e o desempenho escolar."
  },
  "Terapeuta-ocupacional": { // CORRIGIDO
    titulo: "Terapeuta Ocupacional",
    descricao: "O terapeuta ocupacional auxilia no desenvolvimento da autonomia da criança. Ele trabalha habilidades motoras, cognitivas e sociais, promovendo maior independência nas atividades do dia a dia, como brincar, estudar e se vestir."
  },
  "Fisioterapeuta": { // CORRIGIDO
    titulo: "Fisioterapeuta",
    descricao: "O fisioterapeuta ajuda a melhorar a coordenação motora, equilíbrio e postura. O acompanhamento é essencial para crianças com atrasos motores, síndromes ou dificuldades físicas, promovendo mais autonomia e qualidade de vida."
  },
  "Psicopedagogo": { // CORRIGIDO
    titulo: "Psicopedagogo",
    descricao: "O psicopedagogo apoia no processo de aprendizagem. Ele identifica dificuldades escolares e oferece estratégias personalizadas para ajudar a criança a aprender melhor, estimulando concentração, memória e autoestima."
  },
  "Musicoterapeuta": { // CORRIGIDO
    titulo: "Musicoterapeuta",
    descricao: "O musicoterapeuta utiliza a música como ferramenta terapêutica. Cantar, ouvir e tocar instrumentos ajudam na comunicação, expressão de sentimentos, desenvolvimento cognitivo e social, promovendo bem-estar emocional."
  }
};

export default function DetalheEspecialidade() {
  const { nome } = useParams();
  const navigate = useNavigate();
  const especialidade = textos[nome];

  if (!especialidade) {
    return <p>Especialidade não encontrada</p>;
  }

  return (
    <div className="detalhe-container">
      <h2 className="detalhe-titulo">{especialidade.titulo}</h2>
      <p className="detalhe-descricao">{especialidade.descricao}</p>
      <button className="detalhe-botao" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
}