# Contribuindo para o (NOME DO PROJETO)

Obrigado por considerar contribuir para o (NOME DO PROJETO)! Se você deseja ajudar a melhorar este projeto, siga as diretrizes abaixo para garantir uma experiência suave de contribuição.

## Como Contribuir

1. Antes de começar, certifique-se de ter uma conta no GitHub.
2. Caso tenha encontrado um bug, tenha uma ideia para uma nova funcionalidade ou queira fazer uma correção, verifique se não há uma issue aberta para o problema ou proposta em questão. Se não houver, crie uma nova issue descrevendo detalhadamente o problema ou a funcionalidade que deseja adicionar.
3. Fork o repositório do projeto para sua própria conta do GitHub.
4. Clone o seu fork do projeto para o seu ambiente local.

```bash
git clone https://github.com/Engenharia-de-software-Gp05/Fronted-Complexo-Esportivo-UFCG.git
```
5. Instale as dependências do projeto.

``` bash
cd Fronted-Complexo-Esportivo-UFCG
npm install
```

6. Crie uma branch local para fazer suas alterações.

``` bash
git checkout -b feat/nome_da_feature
```
7. Faça as suas alterações no código, seguindo as diretrizes de estilo do projeto. Certifique-se de testar as suas mudanças localmente.

8. Adicione e comite suas mudanças.

``` bash
git add .
git commit -m "Descrição concisa das suas alterações"
```
Busque usar as [convenções de commits](https://www.conventionalcommits.org/en/v1.0.0/).

9. Antes de enviar suas alterações, certifique-se de fazer um rebase da sua branch em relação à branch principal do projeto para garantir que esteja atualizada com as últimas mudanças.

``` bash
git fetch origin
git rebase origin/main
```

10. Envie suas alterações para o seu repositório remoto no GitHub.

``` bash
git push origin nome-da-sua-branch
```
11. Abra um Pull Request (PR) para a branch principal do projeto. Certifique-se de descrever detalhadamente as suas alterações no PR, referenciando a issue relevante, se houver.
12. Aguarde a revisão do seu PR pelos mantenedores do projeto. Esteja preparado para fazer ajustes ou fornecer mais informações, se necessário.
13. Após a aprovação do seu PR, os mantenedores do projeto irão mesclar suas alterações na branch principal. Parabéns, você contribuiu para o projeto!

## Diretrizes de Estilo

- Siga as convenções de nomenclatura e estilo de codificação do projeto, use o Prettier para isso.
- Utilize comentários no código quando necessário para explicar o propósito de trechos complexos ou não óbvios de código.
- Mantenha o código limpo e legível.

## Recursos Adicionais

- [Documentação do React](https://react.dev/learn)
- [Documentação do Material-UI](https://mui.com/material-ui/getting-started/)
- [Guidelines do Material-UI](https://m2.material.io/design/guidelines-overview)

Se tiver alguma dúvida ou precisar de ajuda durante o processo de contribuição, não hesite em criar uma issue ou entrar em contato com os mantenedores do projeto. Estamos aqui para ajudar!
