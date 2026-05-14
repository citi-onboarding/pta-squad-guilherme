import { CreateUserForExampleDto } from "@dtos";
import prisma from "@database";

const userForExampleRepository = {
  create(data: CreateUserForExampleDto) {
    return prisma.userForExample.create({ data });
  },

  findById(id_user: string) {
    return prisma.userForExample.findUnique({ where: { id_user } });
  },

  findByEmail(email: string) {
    return prisma.userForExample.findFirst({ where: { email } });
  },

  list() {
    return prisma.userForExample.findMany();
  },

  remove(id_user: string) {
    return prisma.userForExample.delete({ where: { id_user } });
  },
};

export default userForExampleRepository;
