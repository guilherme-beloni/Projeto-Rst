import { Image, Dimensions, ScrollView } from 'react-native';
import { Card, Button, Title, TextInput, Paragraph } from 'react-native-paper';
import { useContext, useState } from 'react';
import { DataContext } from '../Context';

const ProdutoScreen = ({ navigation }) => {
  let [qtdProduto, setQtdProduto] = useState(1);
  let {
    nomeProduto,
    setNomeProduto,
    valorProduto,
    setValorProduto,
    imagemProduto,
    setImagemProduto,
    produtos,
    setProdutos,
    total,
    setTotal,
  } = useContext(DataContext);
  
  const acrescentar = () => {
      setQtdProduto(qtdProduto + 1),
      setTotal(Number(total) + Number(valorProduto));
  };


  let decrementar = () => {
    if (qtdProduto >= 2) {
      setQtdProduto (qtdProduto - 1)
      setTotal(Number(total) - Number(valorProduto));
    } 
  };
   
  const confirmarPedido = () => {   
      let produto = produtos;
      produto.push({
        nome: nomeProduto,
        valor: valorProduto,
        quantidade: qtdProduto,
      });
      setProdutos(produto);
      setTotal(Number(total) + Number(valorProduto));
      setNomeProduto(null);
      setValorProduto(0);
      setImagemProduto(null);
      setQtdProduto(1);
      navigation.navigate('Carrinho');
    
  };
   
  const text = () => {
    
  }
    
  return (
    <ScrollView>
      <Card>
        <Card.Title title={nomeProduto} />
        <Card.Content>
          <Paragraph>{'R$' + valorProduto + ',00'}</Paragraph>
          <Image
            source={imagemProduto}
            style={{
              marginTop: 20,
              width: Dimensions.get('window').width,
              height: 350,
              alignSelf: 'center',
            }}
          />
  
          <Paragraph>Ingredientes: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Paragraph>
          <Button style={{marginTop: 30}}  onPress={acrescentar}>+</Button>
          <Paragraph style={{alignSelf: 'center', marginBotton: 30, fontSize: 20}}>{qtdProduto}</Paragraph>
          <Button onPress={decrementar}>-</Button>

          <Button icon='cart' style={{marginTop: 30}} mode='contained' color='#841584' onPress={() => confirmarPedido()}>
            Adicionar ao carrinho
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
    
  );
};




export default ProdutoScreen;
