/****************************************************/
/*  BE CARFUL this file is for exmaple perpsles     */
/* and doesnt have any functionality at this time   */
/****************************************************/

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // create user
  await db.user.create({
    data: {
      userName: "ilghar",
      name: "lordighar",
      status: false,
    },
  });
  // create post for user
  await db.post.create({
    data: {
      title: "test post !",
      des: "test post content",
      user_id: 1, // the author of the post or user`s id
    },
  });
  // get all users with post
  const allUsers = await db.user.findMany({
    include: {
      posts: true,
    },
  });
  allUsers.forEach((v) => console.log(v));
}
//call the main function
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // disconnect from db at the end of the main functiaon
    await db.$disconnect();
  });
