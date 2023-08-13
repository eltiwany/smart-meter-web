import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * API Enviroment
   */
  environment: 'prod' | 'dev' = 'prod';

  /**
   * Base URL for API
   */
  // baseUrl = this.environment == 'prod' ? 'http://konekted-api.nafuutronics.com/' : 'http://localhost:8000/';
  baseUrl = this.environment == 'prod' ? 'https://api.smartmetertz.com/' : 'http://localhost:8000/';

  /**
   * WebHost URL
   */
  host = this.baseUrl + 'api' + '/';

  /**
   * For storage file links
   */
  storageHost = this.baseUrl + 'storage' + '/';

  /**
   * Authentication Api's
   */
  auth = {
    authenticate: this.host + 'auth',
    activateAccount: this.host + 'activate-account',
    register: this.host + 'register',
    logout: this.host + 'logout',
    refresh: this.host + 'auth/refresh',
  }

  stats = this.host + 'stats';

  /**
   * Employee Area Api's
   */
   myArea = {
    changePassword: this.host + 'my-area/change-password',

    // ServiceDocuments
    ServiceDocuments: this.host + 'my-area/service-documents',
    getServiceDocuments: this.host + 'my-area/get-service-documents',
  }

  /**
   * Settings API's
   */
  settings = {
    // Pages
    pageAccess: this.host + 'settings/pages',
    getPageAccess: this.host + 'settings/get-pages',

    // Documents
    documents: this.host + 'settings/documents',
    getDocuments: this.host + 'settings/get-documents',

    // Permissions
    permissions: this.host + 'settings/permissions',
    getPermissions: this.host + 'settings/get-permissions',

    // Roles
    roles: this.host + 'settings/roles',
    getRoles: this.host + 'settings/get-roles',

  }

  /**
   * Users Api's
   */
   users = {
    getUsers: this.host + 'get-users',
    getResources: this.host + 'get-user-resources',
    getAreaReports: this.host + 'get-area-reports',
    getUserLogs: this.host + 'get-user-logs',
    clearUserLogs: this.host + 'clear-user-logs',
    users: this.host + 'users',
    notifications: this.host + 'notifications',
    resetPassword: this.host + 'reset-password',
  }

  /**
   * Messages Api's
   */
  messages = {
    getMessages: this.host + 'get-messages',
    messages: this.host + 'messages'
  }

  /**
   * Boards Api's
   */
   boards = {
    getBoards: this.host + 'get-boards',
    boardImage: this.host + 'board-image',
    getBoardPinTypes: this.host + 'get-board-pin-types',
    boards: this.host + 'boards',
    userBoards: this.host + 'user-boards',
  }

  /**
   * Sensors Api's
   */
   sensors = {
    getSensors: this.host + 'get-sensors',
    sensorImage: this.host + 'sensor-image',
    getSensorPinTypes: this.host + 'get-sensor-pin-types',
    sensors: this.host + 'sensors',
    userSensors: this.host + 'user-sensors',
    userSensorsAutoAdded: this.host + 'user-sensors-auto-added',
    userSensorValues: this.host + 'get-user-sensor-values',
    userSensorValuesPerSensor: this.host + 'get-user-sensor-values-per-sensor',
    switchActuator: this.host + 'switch-smart-actuator',
  }

  /**
   * Actuators Api's
   */
   actuators = {
    getActuators: this.host + 'get-actuators',
    actuatorImage: this.host + 'actuator-image',
    getActuatorPinTypes: this.host + 'get-actuator-pin-types',
    actuators: this.host + 'actuators',
    userActuators: this.host + 'user-actuators',
    switchActuator: this.host + 'switch-actuator',
  }

  /**
   * PinTypes Api's
   */
   pinTypes = {
    getPinTypes: this.host + 'get-pin-types',
    pinTypes: this.host + 'pin-types',
  }

  /**
   * Automations Api's
   */
   automations = {
    getAutomations: this.host + 'get-automations',
    automations: this.host + 'automations',
  }

  /**
   * Scheduling tasks Api's
   */
   schedulers = {
    getSchedulers: this.host + 'get-schedulers',
    schedulers: this.host + 'schedulers',
  }

  /**
   * User hardwares Api's
   */
  userBoards = {
    getBoards: this.host + 'user-boards/get-boards',
    boards: this.host + 'user-boards/boards',
    getActiveBoard: this.host + 'user-boards/get-active-board',
    test: this.host + 'seed/smart-meter',
  }

  /**
   * Preferences Api's
   * Using this service you can
   * save key-value pair of data
   * from server
   */
  preference = {
    preferences: this.host + 'preferences',
    preferenceFiles: this.host + 'preference-files'
  }

  /**
   * Reports Api's
   */
  reports = {
    getUserBriefStats: this.host + 'get-user-brief-stats',
    getBriefStats: this.host + 'get-brief-stats',
    getHealthStatus: this.host + 'get-health-status',
    getTotalLosses: this.host + 'get-total-losses',
    getMapUserSummary: this.host + 'get-map-user-summary',
  }
}
