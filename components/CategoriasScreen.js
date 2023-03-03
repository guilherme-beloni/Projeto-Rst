import { List, TextInput, Button, Card } from 'react-native-paper';
import {
  ScrollView,
  FlatList,
  Alert
} from 'react-native';
import {styles} from './Utils';
import { useEffect, useState } from 'react';
import firebase from '../Firebase';

export default function CategoriasScreen () {

  let [key, setKey] = useState('');
  let [nome, setNome] = useState('');
  let [descricao, setDescricao] = useState('');
  let [categorias, setCategorias] = useState([]);
  let [botaoAlterarExcluir, setBotaoAlterarExcluir] = useState(true);
  let [botaoInserir, setBotaoInserir] = useState(false);

  useEffect (() => {
    setCategorias([]);
    selecionarTodos();
  }, []);
 
  const selecionarTodos = () => {
    let itens = [];
    firebase.database().ref('categorias').orderByChild("nome").on('value', (snapshot) => {
      snapshot.forEach((linha) => {
        itens.push({
          key: linha.key,
          nome: linha.val().nomes,
          descricao: linha.val().descricao
        });
      }); 
      setCategorias(itens);
    }); 
  }

  const selecionar = (key, nome, descricao) =>{
    setKey(key);
    setNome(nome);
    setDescricao(descricao);
    setBotaoAlterarExcluir(false);
    setBotaoInserir(true);
  }

  const cancelar = () => {
    setKey("");
    setNome("");
    setDescricao("");
    setCategorias([]);
    selecionarTodos();
    setBotaoAlterarExcluir(true);
    setBotaoInserir(false);
  }

  const inserirCategoria = () => {
    try {
      firebase.database().ref('categorias').push({nome: nome, descricao: descricao});
      alert("Registro inserido com sucesso!");
      cancelar();
    } catch (e){
      alert("Erro ao inserir!");
    }
  }

  const alterarCategoria = () => {
    try {
      firebase.database().ref('categorias').child(key).update({nome: nome, descricao: descricao});
      alert("Registro alterado com sucesso!");
      cancelar();
    } catch (e){
      alert("Erro ao alterar!");
    }
  }

  const excluirCategoria = () => {
    Alert.alert(
      "Mensagem",
      "Deseja realmente excluir esse registro?",
      [
        {
          text: "Sim",
          onPress: () => {
              try {
                firebase.database().ref('categorias').child(key).remove();
                alert("Registro excluído com sucesso!");
                cancelar();
              } catch (e){
                alert("Erro ao excluir!");
              }
          },
        },
        {
          text: "Não",
          onPress: () => cancelar(),
        },
      ]
    );
  }

  return (
    <ScrollView>
      <Card style={{margin: 10}}>
        <Card.Title
          title="Gerenciar Categorias"
          subtitle="Dados das categorias de serviço"
        />
        <Card.Content>
          <TextInput
            onChangeText={setNome}
            value={nome}
            mode="outlined"
            label="Nome"
            placeholder="Digite o nome da categoria"
          />
          <TextInput
            onChangeText={setDescricao}
            value={descricao}
            mode="outlined"
            label="Descrição"
            placeholder="Digite a descrição da categoria"
          />
        </Card.Content>
        <Card.Actions>
          <Button icon="plus" mode="contained" style={styles.buttonCrud} disabled={botaoInserir}
            onPress={() => inserirCategoria()}>
          </Button>
          <Button icon="pencil" mode="contained"  style={styles.buttonCrud} disabled={botaoAlterarExcluir} 
            onPress={() => alterarCategoria()}>
          </Button>
          <Button icon="delete" mode="contained"  style={styles.buttonCrud} disabled={botaoAlterarExcluir}
            onPress={() => excluirCategoria()}>
          </Button>
          <Button icon="cancel" mode="contained"  style={styles.buttonCrud} 
            onPress={() => cancelar()}>
          </Button>
        </Card.Actions>
      </Card>
      <List.Section>
    <List.Subheader>Categorias registradas</List.Subheader>
      <FlatList
        data={categorias}
        renderItem={({ item }) => {
          return (
              <List.Item
                title={item.nome}
                left={props => <List.Icon icon="arrow-right" />}
                onPress={() =>
                  selecionar(item.key, item.nome, item.descricao)
                }
              />
          );
        }}
      />
      </List.Section>
    </ScrollView>
  );
}