import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  await db.user.create({
    data: {
      userName: "ilghar",
      name: "lordighar",
      status: false,
    },
  });
  await db.post.create({
    data: {
      title: "test post !",
      des: "test post content",
      user_id: 1,
    },
  });
  const allUsers = await db.user.findMany({
    select: {
      posts: true,
    },
  });
  allUsers.forEach((v) => console.log());
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await db.$disconnect();
  });
