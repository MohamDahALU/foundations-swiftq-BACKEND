export interface ICustomer {
  _id?: string
  name?: string
  status: 'waiting' | 'served' | 'skipped'
  joinedAt: Date
}
