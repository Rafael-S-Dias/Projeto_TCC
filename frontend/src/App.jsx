import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from "framer-motion";

// 🧠 Atualiza título da aba conforme a rota
import RouteTitle from './utils/RouteTitle.jsx';

// 🏠 Telas principais
import Home from './pages/Home/Home.jsx';

// 🔐 Autenticação
import Login from './pages/Auth/Login/Login.jsx';
import LoginNew from './pages/Auth/LoginNew/LoginNew.jsx';
import Register from './pages/Auth/Register/Register.jsx';
import RegisterSent from './pages/Auth/RegisterSent/RegisterSent.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword.jsx';
import ForgotPasswordSent from './pages/Auth/ForgotPasswordSent/ForgotPasswordSent.jsx';

// 🧾 Páginas de conteúdo
import NossaHistoria from './pages/NossaHistoria/NossaHistoria.jsx';
import ConfigPage from './pages/OpcoesConfiguracoes/ConfigPage.jsx';
import DetalhesEspecialidade from './pages/DetalhesEspecialidade/DetalhesEspecialidade.jsx';

// 🧍‍♀️ Telas de usuário e fluxo geral
import TelaConsulta from './pages/TelaConsulta/TelaConsulta.jsx';
import TelaEspecialidade from './pages/TelaEspecialidade/TelaEspecialidade.jsx';
import TelaUsuario from './pages/TelaUsuario/TelaUsuario.jsx';
import TelaFuncionario from './pages/TelaFuncionario/TelaFuncionario.jsx';
import TelaAlterar from './pages/TelaAlterar/TelaAlterar.jsx';
import TelaBuscar from './pages/TelaBuscar/TelaBuscar.jsx';
import Prontuario from './pages/Prontuario';

// ⚕️ Telas médicas e relacionadas
import TelaMedico from './pages/TelaMedico/TelaMedico.jsx';
import RetornoPaciente from './pages/RetornoPaciente/RetornoPaciente.jsx';
import ProntuarioMedico from './pages/ProntuarioMedico/ProntuarioMedico.jsx';

// 📅 Agendas e registros
import Exames from './pages/Exames/Exames.jsx';
import Medicamentos from './pages/Medicamentos/Medicamentos.jsx';
import Agenda from './pages/Agenda/Agenda.jsx';
import Agendamentos from './pages/Agendamentos/Agendamentos.jsx';
import MapaSaude from "./pages/MapaSaude/MapaSaude.jsx";

// 🆕 Novo import: tela de prontuário do funcionário
import ProntuarioFuncionario from "./pages/prontuariofuncionario/ProntuarioFuncionario.jsx";

// 📄 Componente auxiliar (placeholder de páginas)
function PageStub({ title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontSize: "24px",
        color: "#1f4ea1",
      }}
    >
      {title}
    </motion.div>
  );
}

export default function App() {
  return (
    <>
      {/* Atualiza automaticamente o título da aba */}
      <RouteTitle />

      <Routes>
        {/* 🏠 Página inicial */}
        <Route path="/" element={<Home />} />

        {/* 🔐 Autenticação */}
        <Route path="/login" element={<LoginNew />} />
        <Route path="/login-antigo" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/mensagem-de-cadastro" element={<RegisterSent />} />
        <Route path="/esqueci-a-senha" element={<ForgotPassword />} />
        <Route path="/mensagem-esqueci-a-senha" element={<ForgotPasswordSent />} />

        {/* 📄 Informações institucionais */}
        <Route path="/nossa-historia" element={<NossaHistoria />} />
        <Route path="/configuracoes" element={<ConfigPage />} />

        {/* ⚙️ Telas de usuário */}
        <Route path="/usuario" element={<TelaUsuario />} />
        <Route path="/funcionario" element={<TelaFuncionario />} />
        <Route path="/alterar-usuario" element={<TelaAlterar />} />
        <Route path="/prontuario" element={<Prontuario />} /> {/* Paciente */}

        {/* ✅ NOVA ROTA - prontuário do funcionário */}
        <Route
          path="/funcionario/prontuarios"
          element={<ProntuarioFuncionario />}
        />

        {/* 💬 Especialidades e consultas */}
        <Route path="/consulta" element={<TelaConsulta />} />
        <Route path="/especialidade" element={<TelaEspecialidade />} />
        <Route path="/detalhes-especialidade/:id" element={<DetalhesEspecialidade />} />
        <Route path="/DetalheEspecialidade/:nome" element={<DetalhesEspecialidade />} />

        {/* 🗺️ Mapa de saúde e agenda */}
        <Route path="/mapa-saude" element={<MapaSaude />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
        <Route path="/buscar" element={<TelaBuscar />} />

        {/* ⚕️ Rotas médicas */}
        <Route path="/medico" element={<TelaMedico />} />
        <Route path="/retorno" element={<RetornoPaciente />} />
        <Route path="/prontuariomedico" element={<ProntuarioMedico />} />

        {/* 🧾 Registros gerais */}
        <Route path="/exames" element={<Exames />} />
        <Route path="/medicamentos" element={<Medicamentos />} />

        {/* 🚨 Fallback (rota inválida → Home) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
