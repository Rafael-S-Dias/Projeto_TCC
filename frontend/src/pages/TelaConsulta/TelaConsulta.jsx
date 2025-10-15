import React, { useState } from 'react';
import './TelaConsulta.modelo.css';

export default function TelaConsulta() {
  const [formData, setFormData] = useState({
    nome: '',
    nascimento: '',
    sexo: '',
    responsavel: '',
    especialidade: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: enviar para o backend
    console.log(formData);
  };

  return (
    <div className="container">
      {/* Logo + frase como no Login */}
      <img className="logo" src="/brand/logo_nuza.png" alt="NUZA" />
      <p className="subtitulo"><strong>Um sonho possível de realizar</strong></p>

      <button type="button" className="close-button" aria-label="Fechar">×</button>

      <h2 className="title">Agendamento de Consulta</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={formData.nome}
          onChange={handleChange}
          className="input-text"
          required
        />

        <div className="linha-dupla">
          <input
            type="date"
            name="nascimento"
            placeholder="Data de nascimento"
            value={formData.nascimento}
            onChange={handleChange}
            className="input-data"
            required
          />

        <select
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          className={`input-select ${formData.sexo ? '' : 'is-placeholder'}`}
          required
        >
          <option value="" disabled hidden>Sexo</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outro">Outro</option>
        </select>
        </div>

        <input
          type="text"
          name="responsavel"
          placeholder="Responsável"
          value={formData.responsavel}
          onChange={handleChange}
          className="input-text"
          required
        />

        <input
          type="text"
          name="especialidade"
          placeholder="Especialidade"
          value={formData.especialidade}
          onChange={handleChange}
          className="input-text"
          required
        />

        <button type="submit" className="btn-agendar">Agendar</button>
      </form>
    </div>
  );
}
