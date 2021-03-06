import { Router } from 'express';
import { getCustomRepository } from "typeorm";

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  // TODO
  const transactionsRepository = getCustomRepository(TransactionsRepository)
  const transactions = await transactionsRepository.find()

  const balance = await transactionsRepository.getBalance()

  const responseTotal = {
    transactions,
    balance
  }

  return response.json(responseTotal)
});

transactionsRouter.post('/', async (request, response) => {
  // TODO
  const { title, value, type, category } = request.body

  const CreateTransaction = new CreateTransactionService()

  const transaction = await CreateTransaction.execute({
    title,
    value,
    type,
    category
  })

  return response.json(transaction)
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
  const { id } = request.params
  const transactionsDelete = new DeleteTransactionService()

  const deleteTransaction = await transactionsDelete.execute({
    id
  })


  return response.json(deleteTransaction)
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
  const importTransaction = new ImportTransactionsService()

  const importCsv = await importTransaction.execute()

  return response.json(importCsv)


});

export default transactionsRouter;
