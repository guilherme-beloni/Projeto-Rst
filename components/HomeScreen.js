import { ScrollView, Image, Dimensions, BackHandler } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { useContext } from 'react';
import { DataContext } from '../Context';

export default HomeScreen = ({ navigation }) => {
  const { setNomeProduto, setValorProduto, setImagemProduto } =
    useContext(DataContext);

  const selecionarProduto = (nomeProduto, valorProduto, imagemProduto) => {
    setNomeProduto(nomeProduto);
    setValorProduto(valorProduto);
    setImagemProduto(require(imagemProduto));
    navigation.navigate('Produto');
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title title="Pizza Portuguesa" subtitle="Ingredintes frescos" />
        <Card.Content>
          <Image
            source={require('./imgs/pizza.jpg')}
            style={{
              width: Dimensions.get('window').width,
              height: 200,
              alignSelf: 'center',
            }}
          />
          <Paragraph>R$ 70,00</Paragraph>
          <Button
            color="#841584"
            style={{ marginTop: 10 }}
            mode="contained"
            onPress={() =>
              selecionarProduto('Pizza Portuguesa', 70.0, './imgs/pizza.jpg')
            }>
            Detalhes
          </Button>
        </Card.Content>
      </Card>
      <Card>
        <Card.Title
          title="Porção de Batata Frita"
          subtitle="Crocante e sequinha"
        />
        <Card.Content>
          <Image
            source={require('./imgs/batata.jpg')}
            style={{
              width: Dimensions.get('window').width,
              height: 200,
              alignSelf: 'center',
            }}
          />
          <Paragraph>R$ 30,00</Paragraph>
          <Button
            style={{ marginTop: 10 }}
            color="#841584"
            mode="contained"
            onPress={() =>
              selecionarProduto(
                'Porção de Batata Frita',
                30.0,
                './imgs/batata.jpg'
              )
            }>
            Detalhes
          </Button>
          <Card>
            <Card.Title title="X-Burger" subtitle="Hambúrguer de Picanha" />
            <Card.Content>
              <Image
                source={require('./imgs/burger.jpg')}
                style={{
                  width: Dimensions.get('window').width,
                  height: 200,
                  alignSelf: 'center',
                }}
              />
              <Paragraph>R$ 35,00</Paragraph>
              <Button
                color="#841584"
                style={{ marginTop: 10 }}
                mode="contained"
                onPress={() =>
                  selecionarProduto('X-Burger', 35.0, './imgs/burger.jpg')
                }>
                Detalhes
              </Button>
            </Card.Content>
          </Card>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};
