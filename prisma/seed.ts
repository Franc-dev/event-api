/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Clean database
  await prisma.ticket.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.event.deleteMany({});

  console.log('Seeding database...');

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: await hash('password123', 10),
      },
    }),
    prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await hash('password123', 10),
      },
    }),
    prisma.user.create({
      data: {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: await hash('password123', 10),
      },
    }),
  ]);

  console.log(`Created ${users.length} users`);

  // Create events
  const currentDate = new Date();
  const futureDate = (days) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + days);
    return date;
  };

  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Summer Music Festival',
        description: 'Annual summer music festival featuring top artists from around the world.',
        location: 'Central Park, New York',
        startTime: futureDate(10),
        endTime: futureDate(12),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Tech Conference 2025',
        description:
          'The biggest tech conference of the year with keynote speakers from major tech companies.',
        location: 'Moscone Center, San Francisco',
        startTime: futureDate(30),
        endTime: futureDate(32),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Food & Wine Expo',
        description: 'Taste the finest cuisines and wines from around the globe.',
        location: 'Convention Center, Chicago',
        startTime: futureDate(15),
        endTime: futureDate(16),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Art Gallery Opening',
        description:
          'Exclusive opening of the new modern art gallery featuring works from emerging artists.',
        location: 'Downtown Gallery, Los Angeles',
        startTime: futureDate(5),
        endTime: futureDate(5),
      },
    }),
  ]);

  console.log(`Created ${events.length} events`);

  // Create tickets
  const tickets = await Promise.all([
    // John has tickets to the music festival and tech conference
    prisma.ticket.create({
      data: {
        userId: users[0].id,
        eventId: events[0].id,
      },
    }),
    prisma.ticket.create({
      data: {
        userId: users[0].id,
        eventId: events[1].id,
      },
    }),

    // Jane has a ticket to the food expo
    prisma.ticket.create({
      data: {
        userId: users[1].id,
        eventId: events[2].id,
      },
    }),

    // Bob has tickets to all events
    prisma.ticket.create({
      data: {
        userId: users[2].id,
        eventId: events[0].id,
      },
    }),
    prisma.ticket.create({
      data: {
        userId: users[2].id,
        eventId: events[1].id,
      },
    }),
    prisma.ticket.create({
      data: {
        userId: users[2].id,
        eventId: events[2].id,
      },
    }),
    prisma.ticket.create({
      data: {
        userId: users[2].id,
        eventId: events[3].id,
      },
    }),
  ]);

  console.log(`Created ${tickets.length} tickets`);
  console.log('Database seeding completed successfully');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
