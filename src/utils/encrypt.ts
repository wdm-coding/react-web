import { JSEncrypt } from 'jsencrypt';

type DataType = string | string[];
interface EncryptParams {
  random: string;
  publicKey: string;
}

export default function Encrypt({
  random,
  publicKey,
}: EncryptParams, data: DataType): DataType {
  // 1. 前置校验
  if (!random || !publicKey) {
    return data;
  }
  // 2. 初始化加密器
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  // 3. 处理字符串类型
  if (typeof data === 'string') {
    return encryptor.encrypt(`${data}|${random}`) || '';
  }

  // 4. 处理数组类型
  if (Array.isArray(data)) {
    return data.map((item) => encryptor.encrypt(`${item}|${random}`) || '');
  }

  // 5. 防御性代码：防止非预期类型的传入导致报错
  console.warn('Encrypt: data 必须是 string 或 array 类型');
  return data;
}