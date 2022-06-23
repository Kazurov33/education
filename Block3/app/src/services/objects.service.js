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

  // Receivers - Данные получателей уведомлений

  receivers() {
    return this._get(`/receivers/all`);
  }

  // Events - События

  events() {
    return this._get(`/events/all`);
  }
  newEvents(data) {
    return this._post(`/events/new`, data);
  }

  // Systems - системы
  systems() {
    return this._get(`/system/all`);
  }
  createSystem(data) {
    return this._post(`/system/create`, data);
  }
  deleteSystem(id) {
    return this._delete(`/system/${id}`);
  }
}

// export a singleton instance in the global namespace
export const objectsService = ObjectsService.Instance;
