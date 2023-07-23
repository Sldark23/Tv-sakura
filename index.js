const fs = require('fs');
const { LiveStreamingAPI } = require('youtube-live-streaming-api');

const youtube = new LiveStreamingAPI('aax9-gyha-vjda-bpge-fmcy');

const VIDEO_FOLDER_PATH = './videos';

async function createLiveStream() {
  try {
    // Criação do stream
    const stream = await youtube.createStream({
      part: 'snippet,cdn',
      resource: {
        snippet: {
          title: 'Minha Live com Vídeos Pré-Definidos',
          description: 'Esta é uma live automatizada com vídeos pré-definidos.',
        },
        cdn: {
          format: '720p',
          ingestionType: 'rtmp',
        },
      },
    });

    console.log('Live criada com sucesso!');
    console.log('ID do Stream: ', stream.id);
    console.log('URL da Live: ', stream.cdn.ingestionInfo.ingestionAddress);

    // Agora, vamos buscar a chave do stream para usar posteriormente
    const streamKey = stream.cdn.ingestionInfo.streamName;

    // Pegar a lista de vídeos no diretório
    const videos = fs.readdirSync(VIDEO_FOLDER_PATH);

    // Reproduzir cada vídeo na live
    for (const video of videos) {
      const videoPath = `${VIDEO_FOLDER_PATH}/${video}`;

      // Chama a função para transmitir o vídeo
      await transmitVideoToLive(videoPath, streamKey);
    }

    console.log('Todos os vídeos foram transmitidos!');
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

async function transmitVideoToLive(videoPath, streamKey) {
  // Simulação do envio do vídeo para a live
  // Neste exemplo, não iremos realmente transmitir o vídeo para o YouTube, mas você pode usar outras bibliotecas para isso.
  // Ao invés disso, estamos apenas imprimindo o nome do vídeo para indicar que ele está sendo transmitido.
  console.log('Transmitindo o vídeo:', videoPath);
}

createLiveStream();
