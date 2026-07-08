# Trilha de Cálculo

App web (PWA) de estudo de matemática — do fim do Ensino Fundamental ao Cálculo I
(Limite, Derivada e Integral). Diagnóstico adaptativo, trilha com dificuldade que se
ajusta ao aluno, revisões espaçadas (D+0 / D+7 / D+30) e gamificação (streak, XP, níveis).

Exercícios no estilo/notação de **Stewart** e **Guidorizzi** (alguns marcados com a fonte).

## Rodar localmente

É um site estático de um arquivo só. Basta abrir `index.html` no navegador —
ou servir a pasta (recomendado, habilita o service worker):

```bash
python -m http.server 5599
# abre http://localhost:5599/index.html
```

## Publicar (Vercel — recomendado)

### Opção A — Vercel CLI (mais rápido, sem GitHub)
```bash
npm i -g vercel      # ou use: npx vercel
cd calculo-trilha
vercel               # login pelo navegador na 1ª vez; siga o assistente (aceite os padrões)
vercel --prod        # publica a versão de produção e mostra a URL final
```

### Opção B — GitHub + Vercel (deploy automático a cada push)
1. Crie um repositório vazio no GitHub (ex.: `trilha-calculo`).
2. Conecte e envie:
   ```bash
   cd calculo-trilha
   git remote add origin https://github.com/SEU_USUARIO/trilha-calculo.git
   git push -u origin main
   ```
3. Em https://vercel.com → **Add New… → Project → Import** o repositório → **Deploy**.
   (Não há build; o Vercel serve os arquivos estáticos direto.)

## Instalar no celular
Abra a URL do Vercel no celular e use **"Adicionar à tela inicial"**
(Android: menu do Chrome; iPhone: botão Compartilhar do Safari). O app abre em tela
cheia e funciona offline depois da primeira abertura.

## Observações
- Os PDFs dos livros **não** vão para o repositório (ver `.gitignore`): são pesados e têm direito autoral.
- Ao atualizar o app, suba a versão do cache em `sw.js` (`trilha-calculo-vN`) para forçar a atualização nos aparelhos.
