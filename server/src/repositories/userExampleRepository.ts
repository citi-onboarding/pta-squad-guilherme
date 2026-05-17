import prisma from "@database";
import { CreateUserForExampleDto } from "@dtos/createUserExampleDto";

 const userForExampleRepository = {
   create(data: CreateUserForExampleDto) {
     return prisma.userForExample.create({ data });
   },


   findById(id_user: string) {
     return prisma.userForExample.findUnique({ where: { id_user: id_user } });
   },

   findByEmail(email: string) {
     return prisma.userForExample.findFirst({ where: { email: email } });
   },

   list() {
     return prisma.userForExample.findMany();
   },

     remove(id_user: string) {
     return prisma.userForExample.delete({ where: { id_user: id_user } });
   },
};

export default userForExampleRepository;