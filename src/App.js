import axios from 'axios';
import { useState } from 'react';
import './App.css';

const api = axios.create({
    baseURL: 'https://api.sicoob.com.br/cobranca-bancaria/v2'
});

const App = () => {
    // integer // obrigatório // número que identifica o contrato do beneficiário no Sisbr.
    const [numeroContrato, setNumeroContrato] = useState('');

    // integer // obrigatório // identifica a modalidade do boleto.
    const [modalidade, setModalidade] = useState(1);
    
    // integer // número identificador do boleto no Sisbr. Caso seja infomado, não é necessário infomar a linha digitável ou código de barras.
    const [nossoNumero, setNossoNumero] = useState('');

    // string // número da linha digitável do boleto com 47 posições. Caso seja informado, não é necessário informar o nosso número ou código de barras.
    const [linhaDigitavel, setLinhaDigitavel] = useState('');

    // string // número de código de barras do boleto com 44 posições.Caso seja informado, não é necessário informar o nosso número ou linha digitável.
    const [codigoBarras, setCodigoBarras] = useState('');

    // string // obrigatório
    const [clientid, setClientid] = useState('');

    // string // obrigatório
    const [token, setToken] = useState('');

    // repostas
    const [msg, setMsg] = useState('Oi');

    const submeter = async(e) => {
        e.preventDefault();
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
            try {
                setMsg(JSON.stringify(resposta.response.data));
            } catch (error) {
                setMsg('Veja o retorno no console do navegador.');
            }
          } catch (erro) {
            console.error(erro);
            try {
                setMsg(JSON.stringify(erro.response.data));
            } catch (error) {
                setMsg('Ocorreu um erro. Veja no console do navegador.');
            }
            
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
        <form className='formulario' onSubmit={submeter} target='_self' autoComplete='on'>

            <label className='label' id='contrato'>Número do contrato:</label>
            <input
                type='number'
                className='input'
                value={numeroContrato}
                onChange={(evento) => [setNumeroContrato(evento.target.value)]}
                placeholder='Número que identifica o contrato do beneficiário no Sisbr'
                required/>

            <label className='label' id='modalidade'>Modalidade:</label>
            <select
                id='modalidade'
                className='select'
                value={modalidade}
                onChange={(e) => setModalidade(parseInt(e.target.value))}
                required>
                <option value='1'>1 - Simples com registro</option>
                
            </select>

            <label className='label' id='numero'>Nosso número:</label>
            <input
                type='number'
                className='input'
                value={nossoNumero}
                onChange={(evento) => [setNossoNumero(evento.target.value)]}
                placeholder='Número identificador do boleto no Sisbr'/>

            <label className='label' id='linha'>Linha digitável:
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

            <label className='label' id='codigo'>Código de barras:</label>
            <input
                type='text'
                className='input'
                value={codigoBarras}
                onChange={(evento) => [setCodigoBarras(evento.target.value)]}
                placeholder='Número de código de barras do boleto com 44 posições'/>

            <label className='label' id='cliente'>Cliente ID:</label>
            <input
                type='text'
                className='input'
                value={clientid}
                onChange={(evento) => [setClientid(evento.target.value)]}
                required/>

            <label className='label' id='token'>Token:</label>
            <input
                type='text'
                className='input'
                value={token}
                onChange={(evento) => [setToken(evento.target.value)]}
                required/>

            <input type='submit' className='botao' value='Consultar'/>

        </form>
        <br/>
        <p className='descricao'>{msg}</p>

      </header>
    </div>
  );
}

export default App;
