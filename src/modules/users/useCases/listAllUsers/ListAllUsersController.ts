import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;
    let id = null;
    if (typeof user_id !== "string") {
      [id] = user_id;
    } else {
      id = user_id;
    }
    try {
      const users = this.listAllUsersUseCase.execute({ user_id: id });

      return response.status(200).json(users);
    } catch (e) {
      return response.status(400).json({ error: e.message });
    }
  }
}

export { ListAllUsersController };
