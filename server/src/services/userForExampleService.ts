import { ConflictError, NotFoundError } from "@errors/AppError";
import { CreateUserForExampleDto } from "@dtos";
import userForExampleRepository from "@repositories/userExampleRepository";

const userForExampleService = {
  async create(data: CreateUserForExampleDto) {
    const emailInUse = await userForExampleRepository.findByEmail(data.email);
    if (emailInUse) {
      throw new ConflictError("Email já cadastrado");
    }
    return userForExampleRepository.create(data);
  },

  async findById(id_user: string) {
    const user = await userForExampleRepository.findById(id_user);
    if (!user) {
      throw new NotFoundError("Usuário");
    }
    return user;
  },

  async list() {
    const users = await userForExampleRepository.list();
    return users;
  },

  async remove(id: string) {
    const exists = await userForExampleRepository.findById(id);
    if (!exists) {
      throw new NotFoundError("Usuário");
    }
    return userForExampleRepository.remove(id);
  }
};

export default userForExampleService;