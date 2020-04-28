import path from 'path'; // modulo path de dentro do node para passar o caminho.
import crypto from 'crypto'; // gerar hash ou criar criptografia, modulo do node.
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder, // Para gente saber diretorio dos arquivos

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
