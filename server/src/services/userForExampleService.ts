import bcrypt from "bcryptjs";

import userForExampleRepository from "@repositories/userForExampleRepository";
import { CreateUserForExampleDto } from "@dtos";
import { ConflictError, NotFoundError } from "@errors/AppError";

const userForExampleService = {
  async create(data: CreateUserForExampleDto) {
    const emailInUse = await userForExampleRepository.findByEmail(data.email);
    if (emailInUse) {
      throw new ConflictError("Email já cadastrado");
    }

    const password = await bcrypt.hash(data.password, 10);

    const user = await userForExampleRepository.create({
      ...data,
      password,
    });

    const { password: _, ...safeUser } = user;
    return safeUser;
  },

  async findById(id_user: string) {
    const user = await userForExampleRepository.findById(id_user);
    if (!user) {
      throw new NotFoundError("Usuário");
    }
    const { password: _, ...safeUser } = user;
    return safeUser;
  },

  async list() {
    const users = await userForExampleRepository.list();
    return users.map(({ password: _, ...rest }) => rest);
  },

  async remove(id_user: string) {
    const exists = await userForExampleRepository.findById(id_user);
    if (!exists) {
      throw new NotFoundError("Usuário");
    }
    return userForExampleRepository.remove(id_user);
  },
};

export default userForExampleService;
