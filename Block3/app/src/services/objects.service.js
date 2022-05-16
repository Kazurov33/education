//import axios from 'axios';
import { BaseService } from "./base.service";

class ObjectsService extends BaseService {
  static instance; //: AdminService;

  constructor() {
    //console.log(super())
    super();
  }

  static get Instance() {
    // Do you need arguments? Make it a regular method instead.
    return this.instance || (this.instance = new this());
  }

  // Charge Stations - Зарядные станции

  // Users - Данные пользователей в рамках сервиса

  users() {
    return this._get(`/users`);
  }

  // Events - События

  events(data) {
    return this._put(`/events`, data);
  }
  newEvents(data) {
    return this._put(`/events/new`, data);
  }
}

// export a singleton instance in the global namespace
export const objectsService = ObjectsService.Instance;
