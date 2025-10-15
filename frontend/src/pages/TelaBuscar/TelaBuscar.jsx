import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import s from "./TelaBuscar.module.css";
import lixeiraIcon from "../../icons/lixeira-icon.png";
import alterarIcon from "../../icons/alterar-icon.png"; // 1. IMPORTE O NOVO ÍCONE

// Dados e componentes auxiliares (sem alterações)
const MOCK_USUARIOS = [
  { id: "u1", nome: "Mariana Lima", cpf: "123.456.789-10", dataNascimento: "1995-03-15", avatarUrl: "https://i.pravatar.cc/150?img=25" },
  { id: "u2", nome: "Carlos Pereira", cpf: "234.567.890-11", dataNascimento: "1988-11-20", avatarUrl: "https://i.pravatar.cc/150?img=60" },
  { id: "u3", nome: "Ana Costa", cpf: "345.678.901-12", dataNascimento: "2001-07-02", avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { id: "u4", nome: "João da Silva", cpf: "456.789.012-13", dataNascimento: "1975-01-30", avatarUrl: "https://i.pravatar.cc/150?img=59" },
  { id: "u5", nome: "Beatriz Santos", cpf: "567.890.123-14", dataNascimento: "1999-09-10", avatarUrl: "https://i.pravatar.cc/150?img=40" },
];

function ConfirmModal({ isOpen, onCancel, onConfirm, patientName }) {
  if (!isOpen) return null;
  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir o paciente {patientName}?</p>
        <div className={s.modalActions}>
          <button className={s.modalCancelBtn} onClick={onCancel}>Cancelar</button>
          <button className={s.modalConfirmBtn} onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  );
}

function SuccessMessage({ message, onClose }) {
  if (!message) return null;
  return (
    <div className={s.successMessage}>
      {message}
      <button className={s.closeSuccessBtn} onClick={onClose}>&times;</button>
    </div>
  );
}

function ItemUsuario({ usr, onDeleteClick }) {
  const calcularIdade = (dataNasc) => {
    const hoje = new Date();
    const nasc = new Date(dataNasc);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) { idade--; }
    return idade;
  };
  return (
    <article className={s.item}>
      <div className={s.itemLeft}>
        <div className={s.iconWrap}><img src={usr.avatarUrl} alt={usr.nome} className={s.avatar} /></div>
      </div>
      <div className={s.itemMid}>
        <h4 className={s.titulo}>{usr.nome}</h4>
        <p className={s.meta}>CPF: {usr.cpf} • {calcularIdade(usr.dataNascimento)} anos</p>
      </div>
      <div className={s.itemRight}>
        <Link to="/prontuario" className={s.actionBtn}>
          Ver Prontuário
        </Link>
        
        {/* 2. ADICIONE O BOTÃO DE ALTERAR AQUI */}
        <Link 
          to={"/alterar-usuario"} 
          className={s.iconBtn} 
          title="Alterar Usuário"
        >
          <img src={alterarIcon} alt="Alterar" className={s.iconImg} />
        </Link>

        <button 
          className={s.iconBtn}  // Refatorado para usar a classe genérica
          onClick={() => onDeleteClick(usr.id, usr.nome)}
          title="Excluir Paciente"
        >
          <img src={lixeiraIcon} alt="Excluir" className={s.iconImg} />
        </button>
      </div>
    </article>
  );
}


// O restante do componente TelaBuscar permanece o mesmo
export default function TelaBuscar() {
  const [busca, setBusca] = useState("");
  const [usuarios, setUsuarios] = useState(MOCK_USUARIOS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [patientNameToDelete, setPatientNameToDelete] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const usuariosFiltrados = useMemo(() => {
    let base = [...usuarios];
    if (busca.trim()) {
      const b = busca.toLowerCase();
      base = base.filter((u) => {
        const nomeMatch = u.nome.toLowerCase().split(' ').some(palavra => palavra.startsWith(b));
        const buscaCpfLimpo = b.replace(/[.-]/g, "");
        const cpfMatch = u.cpf.replace(/[.-]/g, "").startsWith(buscaCpfLimpo);
        return nomeMatch || cpfMatch;
      });
    }
    base.sort((a, b) => a.nome.localeCompare(b.nome));
    return base;
  }, [busca, usuarios]);

  const handleDeleteClick = (id, nome) => {
    setPatientToDelete(id);
    setPatientNameToDelete(nome);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setUsuarios(prevUsuarios => prevUsuarios.filter(u => u.id !== patientToDelete));
    setIsModalOpen(false);
    setPatientToDelete(null);
    setPatientNameToDelete("");
    setSuccessMessage(`Paciente '${patientNameToDelete}' excluído com sucesso!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setPatientToDelete(null);
    setPatientNameToDelete("");
  };

  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <div className={s.headerInner}>
          <img className={s.logo} src="/brand/logo_nuza.png" alt="NUZA" />
          <h1 className={s.title}>Buscar Usuário</h1>
        </div>
      </header>
      <div className={s.container}>
        <div className={s.filters}>
          <input className={s.search} placeholder="Buscar por nome ou CPF..." value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
        <section>
          <h3 className={s.sectionTitle}>Resultados da Busca</h3>
          {usuariosFiltrados.length === 0 ? (
            <div className={s.empty}>Nenhum usuário encontrado.</div>
          ) : (
            <div className={s.list}>
              {usuariosFiltrados.map((usr) => 
                <ItemUsuario 
                  key={usr.id} 
                  usr={usr} 
                  onDeleteClick={handleDeleteClick}
                />
              )}
            </div>
          )}
        </section>
      </div>
      <ConfirmModal 
        isOpen={isModalOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        patientName={patientNameToDelete}
      />
      <SuccessMessage
        message={successMessage}
        onClose={() => setSuccessMessage("")}
      />
    </div>
  );
}