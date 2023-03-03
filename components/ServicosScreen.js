import { List, TextInput, Button, Card } from 'react-native-paper';
import {
  ScrollView,
  FlatList,
  Alert
} from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import {styles} from './Utils';
import { useEffect, useState } from 'react';
import firebase from '../Firebase';

export default function ServicosScreen () {
  let [key, setKey] = useState('');
  let [nome, setNome] = useState('');
  let [descricao, setDescricao] = useState('');
  let [valor, setValor] = useState('');
  let [categoria, setCategoria] = useState(null);
  let [servicos, setServicos] = useState([]);
  let [categorias, setCategorias] = useState('');
  let [botaoAlterarExcluir, setBotaoAlterarExcluir] = useState(true);
  let [botaoInserir, setBotaoInserir] = useState(false);
  let categoriaPlaceholder = { label: 'Selecione uma categoria', value: null};

  useEffect (() => {
    setCategorias([]);
    setServicos([]);
    selecionarTodos();
  }, []);
  
  const selecionarTodos = () => {
    let itens = [];
    firebase.database().ref('categorias').orderByChild("nome").on('value', (snapshot) => {
      snapshot.forEach((linha) => {
        itens.push({
          label: linha.val().nome,
          value: linha.val().nome,
        });
      }); 
      setCategorias(itens);
    }); 
    itens = [];
    firebase.database().ref('servicos').orderByChild("nome").on('value', (snapshot) => {
      snapshot.forEach((linha) => {
        itens.push({
          key: linha.key,
          nome: linha.val().nome,
          descricao: linha.val().descricao,
          valor: linha.val().valor,
          categoria: linha.val().categoria
        });
      }); 
      setServicos(itens);
    }); 
  }

  const selecionar = (key, nome, descricao, valor, categoria) =>{
    setKey(key);
    setNome(nome);
    setDescricao(descricao);
    setValor(valor);
    setCategoria(categoria);
    setBotaoAlterarExcluir(false);
    setBotaoInserir(true);
  }

  const cancelar = () => {
    setKey("");
    setNome("");
    setDescricao("");
    setValor("");
    setCategoria("")
    setCategorias([]);
    setServicos([]);
    selecionarTodos();
    setBotaoAlterarExcluir(true);
    setBotaoInserir(false);
  }

  const inserirServico = () => {
    try {
      firebase.database().ref('servicos').push({nome: nome, descricao: descricao, valor: valor, categoria: categoria});
      alert("Registro inserido com sucesso!");
      cancelar();
    } catch (e){
      alert("Erro ao inserir!");
    }
  }

  const alterarServico = () => {
    try {
      firebase.database().ref('servicos').child(key).update({nome: nome, descricao: descricao, valor: valor, categoria: categoria});
      alert("Registro alterado com sucesso!");
      cancelar();
    } catch (e){
      alert("Erro ao alterar!");
    }
  }

  const excluirServico = () => {
    Alert.alert(
      "Mensagem",
      "Deseja realmente excluir esse registro?",
      [
        {
          text: "Sim",
          onPress: () => {
              try {
                firebase.database().ref('servicos').child(key).remove();
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
          title="Gerenciar Serviços"
          subtitle="Dados de serviços"
        />
        <Card.Content>
          <TextInput
            onChangeText={setNome}
            value={nome}
            mode="outlined"
            label="Nome"
            placeholder="Digite o nome do serviço"
          />
          <TextInput
            onChangeText={setDescricao}
            value={descricao}
            mode="outlined"
            label="Descrição"
            placeholder="Digite a descrição do serviço"
          />
          <TextInput
            onChangeText={setValor}
            value={valor}
            keyboardType='numeric'
            mode="outlined"
            label="Valor"
            placeholder="Digite o valor do serviço"
          />
          <RNPickerSelect items={categorias} onValueChange={(categoria => setCategoria(categoria))} 
            placeholder={categoriaPlaceholder} value={categoria}/>
        </Card.Content>
        <Card.Actions>
          <Button icon="plus" mode="contained" style={styles.buttonCrud} disabled={botaoInserir}
            onPress={() => inserirServico()}>
          </Button>
          <Button icon="pencil" mode="contained"  style={styles.buttonCrud} disabled={botaoAlterarExcluir} 
            onPress={() => alterarServico()}>
          </Button>
          <Button icon="delete" mode="contained"  style={styles.buttonCrud} disabled={botaoAlterarExcluir}
            onPress={() => excluirServico()}>
          </Button>
          <Button icon="cancel" mode="contained"  style={styles.buttonCrud} 
            onPress={() => cancelar()}>
          </Button>
        </Card.Actions>
      </Card>
      <List.Section>
    <List.Subheader>Servicos registrados</List.Subheader>
      <FlatList
        data={servicos}
        renderItem={({ item }) => {
          return (
              <List.Item
                title={item.nome}
                left={props => <List.Icon icon="arrow-right" />}
                onPress={() =>
                  selecionar(item.key, item.nome, item.descricao, item.valor, item.categoria)
                }
              />
          );
        }}
      />
      </List.Section>
    </ScrollView>
  );
}