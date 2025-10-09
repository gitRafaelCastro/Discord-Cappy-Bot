import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas";
import { AttachmentBuilder, MessageFlags, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { request } from "undici";
import logger from "../../logger.js";

GlobalFonts.registerFromPath("./assets/fonts/ggsans/ggsans-Bold.ttf", "ggsans-Bold");
GlobalFonts.registerFromPath("./assets/fonts/ggsans/ggsans-Medium.ttf", "ggsans-Medium");
GlobalFonts.registerFromPath("./assets/fonts/ggsans/ggsans-Normal.ttf", "ggsans-Normal");



const requestOptions = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  }
};

export const commandBase = {
  slashData: new SlashCommandBuilder()
    .setName('seguinte')
    .setDescription('Cria uma mensagem falsa estilo discord.')
    .addStringOption(
      (option) => option
        .setName("usuario")
        .setDescription("Nome do usuário que enviara a mensagem")
        .setMaxLength(25)
        .setRequired(true))
    .addStringOption(
      (option) => option
        .setName("mensagem")
        .setDescription("Mensagem que o usuário enviará")
        .setMaxLength(137)
        .setRequired(true))
      .addStringOption(
      (option) => option
        .setName("imagem")
        .setDescription("Link da imagem para o avatar do usuario")
        .setRequired(true)),
  cooldown: 5000,
  ownerOnly: false,
  async slashRun(interaction) {
    
    const usuario = interaction.options.getString('usuario', true);
    const mensagem = interaction.options.getString('mensagem', true);
    const imagem = interaction.options.getString("imagem", true);

    const canvas = createCanvas(419, 100);
    const context = canvas.getContext("2d");
    const BaseImage = await loadImage('./assets/images/seguinte.png');

    await interaction.deferReply();

    try {
      const { statusCode, headers, body } = await request(imagem, requestOptions);

      if (statusCode < 200 || statusCode >= 300) {
        logger.error(`[Falha] Status code inválido: ${statusCode}`);
        return interaction.editReply({
          content: "Erro ao localizar a imagem!",
          flags: MessageFlags.Ephemeral,
        });
      }

      const contentType = headers['content-type'];
      if (!contentType || !contentType.startsWith('image/')) {
        logger.error(`[Falha] Content-Type não é de imagem: ${contentType}`);
        return interaction.editReply({
          content: "O link não é de uma imagem!",
          flags: MessageFlags.Ephemeral,
        });
      }

      context.drawImage(BaseImage, 0, 0, canvas.width, canvas.height);

      const avatar = await loadImage(body);

      context.save();

      context.beginPath();

      context.arc(27, 40, 23.5, 0, Math.PI * 2, true);
      context.closePath();

      context.clip()

      context.drawImage(avatar, 0, 15, 60, 60);

      context.restore();

      context.font = '18px ggsans-Medium';
      context.fillStyle = '#ffffff';

      const userTextSize = context.measureText(usuario).width

      context.fillText(usuario, 66, 30);

      context.font = "12px ggsans-Medium";
      context.fillStyle = '#999aa1';

      const agora = new Date();

      const horas = String(agora.getHours()).padStart(2, '0');
      const minutos = String(agora.getMinutes()).padStart(2, '0');

      const horaAtual = `${horas}:${minutos}`;

      context.fillText(`${horaAtual}`, 73+userTextSize, 30)
      
      context.font = "16px ggsans-Normal";
      context.fillStyle = '#dddee0';

      const palavras = mensagem.split(' ');
      let linhaAtual = '';
      const x = 66; 
      let y = 52; 
      const maxWidth = 325;
      const lineHeight = 20;

      for (let i = 0; i < palavras.length; i++) {
        const linhaDeTeste = linhaAtual + palavras[i] + ' ';
        const metrics = context.measureText(linhaDeTeste);
        const larguraDaLinha = metrics.width;

        if (larguraDaLinha > maxWidth && i > 0) {
          context.fillText(linhaAtual, x, y)
          linhaAtual = palavras[i] + ' ';
          y += lineHeight;
        } else {
          linhaAtual = linhaDeTeste;
        }
      }

      context.fillText(linhaAtual, x, y)

      

      const attachment = new AttachmentBuilder(await canvas.encode("png"), { name: `attachment.png`});

      interaction.editReply({files: [attachment]});



    } catch (error) {
      console.error(`[Erro] ${error.message} ${error.stack}`);
      return interaction.editReply({
          content: "Houve um erro ao executar o comando.",
          flags: MessageFlags.Ephemeral,
        });
    }

  }
}