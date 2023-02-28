import { useState, createContext } from 'react';

export const DataContext = createContext();

export default Context = ({ children }) => {
  const [nomeProduto, setNomeProduto] = useState('');
  const [valorProduto, setValorProduto] = useState('');
  const [imagemProduto, setImagemProduto] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);



return (
    <DataContext.Provider value={{ nomeProduto, setNomeProduto, valorProduto, setValorProduto, imagemProduto, setImagemProduto, produtos, setProdutos, total, setTotal}}>
      {children}
    </DataContext.Provider>
  );
};