import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const goalsTable = await db
    .insert(goals)
    .values([
      {
        title: 'Aprender Node.js',
        desiredWeeklyFrequency: 2,
      },
      {
        title: 'Estudar React Native',
        desiredWeeklyFrequency: 1,
      },
      {
        title: 'Fazer exercícios de Alongamento',
        desiredWeeklyFrequency: 3,
      },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: goalsTable[0].id, createdAt: startOfWeek.toDate() },
    { goalId: goalsTable[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
    { goalId: goalsTable[2].id, createdAt: startOfWeek.toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
