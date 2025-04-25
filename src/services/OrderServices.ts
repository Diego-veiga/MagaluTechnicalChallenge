import IOrderService from 'src/interface/IOrderService';
import { injectable } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import OrderFile from '@models/OrderFile';

@injectable()
export default class OrderService implements IOrderService {
  async processOrder(fileName: string): Promise<void> {
    const lines = fs
      .readFileSync(
        path.resolve(__dirname, '..', '..', `uploads/${fileName}`),
        'utf-8',
      )
      .split('\n')[0];

    const orderFile: OrderFile = {
      idUsuario: Number(lines.substring(0, 10).trim()),
      nome: lines.substring(10, 55).trim(),
      idPedido: Number(lines.substring(55, 65).trim()),
      idProduto: Number(lines.substring(65, 75).trim()),
      valorProduto: Number(Number(lines.substring(75, 87).trim()).toFixed(2)),
      dataCompra: formatDate(lines.substring(87, 95).trim()),
    };

    function formatDate(yyyymmdd: string): string {
      return `${yyyymmdd.substring(0, 4)}-${yyyymmdd.substring(
        4,
        6,
      )}-${yyyymmdd.substring(6, 8)}`;
    }
  }
}
