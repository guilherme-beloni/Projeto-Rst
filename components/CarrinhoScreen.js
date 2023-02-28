import { FlatList , BackHandler} from 'react-native';
import { Card, Paragraph, Button, List } from 'react-native-paper';
import { useContext } from 'react';
import { DataContext } from '../Context';


const CarrinhoScreen = ({ navigation }) => {
  let { produtos, setProdutos, total, setTotal } = useContext(DataContext);

  const excluiProduto = (index) => {
    let produto = produtos;
    setTotal(total - produto[index].valor * produto[index].quantidade);
    produto = produto.filter((item) => item !== produto[index] );
    setProdutos(produto);
  };

  const msgFinal = () => {
    let produto = produtos;
    if (produto != 0){
    alert('O seu pedido foi entregue ao restaurante, obrigado!');
    navigation.navigate('Menu')
    } else {
        alert('Nenhum produto adicionado!');
    }
  };
       

  return (
    <Card>
      <Card.Title title="Meu Carrinho:" />
      <Card.Content>
        {total != 0 ? (
          <Paragraph>
            Valor total: {'R$' + total  + ',00'}

          </Paragraph>
        ) : (
          <></>
        )}
        {produtos.length ? (
          <FlatList
            data={produtos}
            renderItem={({ item, index }) => {
              return (
                <List.Accordion
                  title={item.nome}
                  left={(props) => <List.Icon icon="star" />}>
                  <List.Item title={'Quantidade: ' + item.quantidade} />
                  <List.Item title={'Valor: ' + item.valor} />
                  <List.Item
                    right={(props) => (
                      
                      <Button
                        color='#FF0000'
                        icon="delete"
                        mode="contained"
                        onPress={() => excluiProduto(index)}>
                        Excluir
                      </Button>                      
                    )}
                  />
                </List.Accordion>
                
              );
            }}
          /> 
        ) : (
          <Paragraph>Nenhum produto adicionado!</Paragraph>
        )}
        <Button style={{marginTop: 50}} color='#00FF7F' mode='contained' onPress={msgFinal}>Fazer Pedido</Button>
      </Card.Content>
    </Card>
  );
};
  
export default CarrinhoScreen;
