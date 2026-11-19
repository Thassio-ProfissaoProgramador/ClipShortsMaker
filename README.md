# ClipShortsMaker

Aplicação web estática para encontrar trechos curtos a partir de uma transcrição, comparar momentos por objetivo editorial e exportar um clip. Não exige servidor de aplicação: o vídeo é lido e processado no navegador. A análise editorial usa a chave OpenRouter de cada pessoa.

## Funcionalidades

- Prévia de vídeos do YouTube pelo player oficial.
- Transcrição local do áudio com Whisper Tiny no navegador.
- Análise de transcrições temporizadas com modelos gratuitos do OpenRouter.
- Até três sugestões com justificativa, gancho, título e conceito de capa.
- Objetivos editoriais: potencial qualitativo de retenção, clique, compartilhamento/conversa e humor/surpresa.
- Ajuste manual do início e fim, com validação de duração entre 30 e 60 segundos.
- Edição e exportação local, no formato original ou em vertical 9:16 com reenquadramento central.
- Download de legendas SRT quando a transcrição tem timestamps.
- Chave OpenRouter lembrada no dispositivo somente se a pessoa marcar essa opção.

As avaliações de retenção e clique são sugestões qualitativas. A ferramenta não prevê nem garante AVD, CTR ou viralização; essas métricas reais dependem do público, da publicação, do título/capa e dos dados da plataforma.

## Como usar

1. No Windows, execute **Abrir ClipShortsMaker.bat** na pasta do projeto. O navegador abrirá em `http://localhost:5500`. Em outros sistemas, inicie um servidor de arquivos estáticos, por exemplo:

   ```bash
   python -m http.server 5500
   ```

2. Se o navegador não abrir automaticamente, acesse [http://localhost:5500](http://localhost:5500).
3. Crie uma chave de API em [OpenRouter](https://openrouter.ai/settings/keys) e cole-a no estúdio. O aplicativo usa `openrouter/free`; os modelos gratuitos têm limites e disponibilidade variável.
4. Escolha o objetivo editorial.
5. Cole uma transcrição com timestamps ou selecione o vídeo original e escolha **Transcrever neste dispositivo**. A primeira utilização baixa o modelo de fala; depois, o navegador pode reutilizar os arquivos em cache.
6. Peça sugestões à IA, escolha um momento e ajuste o trecho se necessário.
7. Gere o clip no formato original ou vertical 9:16 e baixe o vídeo e, se quiser, as legendas SRT.

## YouTube e direitos do vídeo

O campo de URL incorpora o player oficial e serve como referência. O projeto não obtém o arquivo de vídeo a partir do link. Para gerar um clip, selecione o arquivo original que você tem direito de editar. A análise de um link também precisa de uma transcrição colada pela pessoa ou de um vídeo local para transcrever.

## IA, privacidade e custos

- Cada pessoa usa sua própria chave OpenRouter. Não inclua uma chave pessoal ou compartilhada no repositório.
- Por padrão, a chave fica apenas na memória da página. Se a pessoa marcar **Lembrar neste dispositivo**, o navegador salva a chave no `localStorage`; o botão **Apagar chave salva** a remove.
- O vídeo e o áudio permanecem no dispositivo durante a transcrição e edição. Ao pedir sugestões, o texto da transcrição é enviado do navegador ao OpenRouter, que o encaminha ao modelo gratuito disponível. Não envie conteúdo confidencial sem avaliar as políticas do serviço e do modelo.
- O modelo de fala é baixado de uma CDN na primeira utilização e pode ficar armazenado no cache do navegador. Essa etapa requer conexão à internet.
- Modelos gratuitos podem ter limites de chamadas, latência variável e indisponibilidade. O projeto não cobre uso pago nem garante disponibilidade permanente.

## Processamento local e limitações

- O aplicativo não impõe um limite fixo de tamanho. O processamento ainda depende dos codecs suportados, memória disponível, duração e capacidade do aparelho e do navegador; vídeos grandes podem consumir muita memória ou não ser processáveis no dispositivo.
- A exportação usa as APIs de reprodução, canvas e gravação do navegador. O navegador escolhe o formato compatível: MP4 quando disponível, caso contrário WebM. O nome e o botão de download indicam o formato gerado.
- O modo vertical usa reenquadramento automático central. Confira se pessoas e informações importantes continuam visíveis.
- A geração de SRT funciona com transcrições temporizadas, incluindo as geradas pelo aplicativo.
- A URL do YouTube exige uma transcrição colada pela pessoa para análise e não permite editar o vídeo remoto diretamente.
- É necessário abrir o projeto por um servidor local ou hospedagem HTTPS para que o worker do modelo funcione. O servidor local só entrega os arquivos estáticos do app; ele não processa nem recebe o vídeo. Abrir o HTML diretamente pelo sistema de arquivos pode impedir o carregamento do modelo.

## Tecnologias

- HTML, CSS e JavaScript vanilla
- Tailwind CSS via CDN
- Transformers.js e modelo Whisper Tiny para reconhecimento de fala local
- APIs de áudio, canvas, MediaRecorder e arquivos do navegador
- OpenRouter Chat Completions API com o roteador `openrouter/free`
- Player oficial do YouTube (modo de prévia)

## Licença

Este projeto foi desenvolvido como parte do NLW 22 da Rocketseat. Consulte os termos do projeto antes de distribuí-lo ou utilizá-lo comercialmente.
