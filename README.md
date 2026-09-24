# ClipShortsMaker

Aplicação web estática que usa inteligência artificial para identificar os momentos mais interessantes de um vídeo e gerar um clip de 30 a 60 segundos pronto para compartilhar.

## Funcionalidades

- Upload de vídeos pelo widget do Cloudinary.
- Geração e leitura da transcrição do vídeo.
- Análise da transcrição com o Google Gemini.
- Identificação automática do trecho mais engajador, engraçado ou surpreendente.
- Reprodução do clip diretamente no navegador.
- Download e compartilhamento do resultado.
- Interface responsiva com Tailwind CSS, glassmorphism e animações GSAP.

## Tecnologias

- HTML5
- CSS e Tailwind CSS via CDN
- JavaScript vanilla
- Google Gemini API (`gemini-2.0-flash`)
- Cloudinary Upload Widget e transformações de vídeo
- GSAP

## Pré-requisitos

- Navegador moderno com suporte a `fetch`, `IntersectionObserver` e Web Share API (opcional).
- Uma chave de API do [Google AI Studio](https://aistudio.google.com/app/apikeys).
- Acesso à configuração do Cloudinary usada pelo projeto, caso seja necessário trocar o `cloudName` ou o `uploadPreset`.

## Como executar

Como o projeto é um arquivo HTML único, não há etapa de instalação de dependências.

1. Clone ou baixe este repositório.
2. Inicie um servidor HTTP na pasta do projeto. Por exemplo, com Python:

   ```bash
   python -m http.server 5500
   ```

3. Abra [http://localhost:5500](http://localhost:5500) no navegador.
4. Informe sua chave do Gemini.
5. Clique em **Começar Agora** ou em **Selecionar arquivo**.
6. Escolha um vídeo e aguarde a geração do clip.

Também é possível usar a extensão Live Server do VS Code para abrir o `index.html` por HTTP.

> Abrir o arquivo diretamente com `file://` pode impedir requisições feitas pelas APIs externas. Use um servidor local.

## Fluxo da aplicação

1. O usuário informa a chave do Gemini no navegador.
2. O Cloudinary recebe o vídeo e retorna seu `public_id`.
3. O ClipShortsMaker aguarda a transcrição disponibilizada pelo Cloudinary.
4. A transcrição é enviada ao Gemini, que retorna os timestamps no formato `so_inicio,eo_fim`.
5. O projeto monta uma URL de transformação do Cloudinary para reproduzir apenas o trecho selecionado.
6. O resultado é exibido com opções de download e compartilhamento.

## Configuração

As configurações do Cloudinary estão no objeto `config` dentro de `index.html`:

```javascript
const config = {
    cloudName: 'dfys23s2t',
    uploadPreset: 'upload_nlw'
};
```

Altere esses valores apenas se estiver usando outra conta ou outro preset de upload.

## Segurança e limitações

- A chave do Gemini é digitada e usada diretamente no navegador; ela não é armazenada pelo projeto.
- Por ser uma aplicação frontend sem backend, a chave fica exposta durante a execução e deve ser restrita, monitorada e revogada quando necessário.
- O funcionamento depende dos serviços externos Cloudinary, Google Gemini, Tailwind CDN e GSAP CDN.
- O tempo de processamento varia conforme a duração do vídeo, a disponibilidade da transcrição e os limites da API.
- O botão de compartilhamento usa a Web Share API quando disponível; caso contrário, copia a URL do clip para a área de transferência.

Para um ambiente de produção, recomenda-se mover a chamada do Gemini para um backend e proteger as credenciais com variáveis de ambiente.

## Estrutura

```text
.
├── index.html  # Interface, estilos e lógica da aplicação
└── README.md   # Documentação do projeto
```

## Licença

Este projeto foi desenvolvido como parte do NLW 22 da Rocketseat. Consulte os termos do projeto antes de distribuí-lo ou utilizá-lo comercialmente.
