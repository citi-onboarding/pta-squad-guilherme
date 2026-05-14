import { Request, Response, NextFunction } from "express";
import { userForExampleService } from "@services";
import { createUserForExampleSchema } from "@dtos";

const userForExampleController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createUserForExampleSchema.parse(req.body);
      const user = await userForExampleService.create(data);
      return res.status(201).json(user);
    } catch (err) {
      return next(err);
    }
  },

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userForExampleService.findById(req.params.id);
      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  },

  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userForExampleService.list();
      return res.status(200).json(users);
    } catch (err) {
      return next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await userForExampleService.remove(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
};

export default userForExampleController;
