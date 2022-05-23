//import axios from 'axios';
import { BaseService } from "./base.service";

class DirectoryService extends BaseService {
  static instance; //: AdminService;

  constructor() {
    //console.log(super())
    super();
  }

  static get Instance() {
    // Do you need arguments? Make it a regular method instead.
    return this.instance || (this.instance = new this());
  }

  // Event Types - Типы событий

  eventTypes() {
    return this._get(`/eventType/all`);
  }
}

// export a singleton instance in the global namespace
export const directoryService = DirectoryService.Instance;
