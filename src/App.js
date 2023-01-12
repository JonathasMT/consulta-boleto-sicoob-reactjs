import axios from 'axios';
import { useState } from 'react';
import './App.css';

const api = axios.create({
    baseURL: 'http://localhost:3001'
});


const modalidade = 1; 
const nossoNumero = null;
const linhaDigitavel = '00190500954014481606906809350314337370000000100';
const codigoBarras = '';

const clientid = 'dsfsd1f85sdf185dsf10s25df4';
const token = 'aasdsadsad1asdsadsad1asd1sa2d5sad4sad1sa2d5';

function App() {
    // integer // obrigatório // número que identifica o contrato do beneficiário no Sisbr.
    const [numeroContrato, setNumeroContrato] = useState(null);

    // integer // obrigatório // identifica a modalidade do boleto.
    const [modalidade, setModalidade] = useState(1);
    
    // integer // número identificador do boleto no Sisbr. Caso seja infomado, não é necessário infomar a linha digitável ou código de barras.
    const [nossoNumero, setNossoNumero] = useState(null);

    // string // número da linha digitável do boleto com 47 posições. Caso seja informado, não é necessário informar o nosso número ou código de barras.
    const [linhaDigitavel, setLinhaDigitavel] = useState('');

    // string // número de código de barras do boleto com 44 posições.Caso seja informado, não é necessário informar o nosso número ou linha digitável.
    const [codigoBarras, setCodigoBarras] = useState('');

    // string // obrigatório
    const [clientid, setClientid] = useState('');

    // string // obrigatório
    const [token, setToken] = useState('');

    const submeter = async() => {
        try {
            const resposta = await api.get('/boletos', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'x-sicoob-clientid': clientid
    
                },
                params: {
                    numeroContrato: numeroContrato,
                    modalidade: modalidade,
                    nossoNumero: nossoNumero,
                    linhaDigitavel: linhaDigitavel,
                    codigoBarras: codigoBarras
                }
            });
            console.log(resposta);
          } catch (erro) {
            console.error(erro);
          }
    };

  return (
    <div className='App'>
      <header className='App-header'>
        <h3>
          Joanatas Rodrigues Martins
        </h3>
        <p>
            Consultar boleto SICOOB
        </p>
        <form className='formulario' onSubmit={submeter}>

            <label className='label' id='contrato'>Número do contrato:</label>
            <input
                type='number'
                className='input'
                value={numeroContrato}
                onChange={(evento) => [setNumeroContrato(evento.target.value)]}
                placeholder='Número que identifica o contrato do beneficiário no Sisbr'
                required/>

            <label className='label'>Modalidade:</label>
            <select
                id='modalidade'
                className='select'
                value={modalidade}
                onChange={(e) => setModalidade(parseInt(e.target.value))}
                required>
                <option value='1'>1 - Simples com registro</option>
                
            </select>

            <label className='label'>Nosso número:</label>
            <input
                type='number'
                className='input'
                value={nossoNumero}
                onChange={(evento) => [setNossoNumero(evento.target.value)]}
                placeholder='Número identificador do boleto no Sisbr'/>

            <label className='label'>Linha digitável:
            <p className='descricao'>
            Caso seja informado, não é necessário informar o nosso número ou código de barras.
            </p>
            </label>
            <input
                type='text'
                className='input'
                value={linhaDigitavel}
                onChange={(evento) => [setLinhaDigitavel(evento.target.value)]}
                placeholder='Número da linha digitável do boleto com 47 posições'
                minLength='47'
                maxLength='47'/>

            <label className='label'>Código de barras:</label>
            <input
                type='text'
                className='input'
                value={codigoBarras}
                onChange={(evento) => [setCodigoBarras(evento.target.value)]}
                placeholder='Número de código de barras do boleto com 44 posições'/>

            <label className='label'>Cliente ID:</label>
            <input
                type='text'
                className='input'
                value={clientid}
                onChange={(evento) => [setClientid(evento.target.value)]}
                required/>

            <label className='label'>Token:</label>
            <input
                type='text'
                className='input'
                value={token}
                onChange={(evento) => [setToken(evento.target.value)]}
                required/>

            <input type='submit' className='botao' value='Consultar'/>

        </form>

      </header>
    </div>
  );
}

export default App;
