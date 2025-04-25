export default interface IOrderService {
  processOrder(fileName: string): Promise<void>;
}
