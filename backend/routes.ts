/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ApartmentController } from './src/controllers/apartment.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './src/controllers/auth.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './src/controllers/user.controller';
import { expressAuthentication } from './src/middlewares/auth.jwt';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  "User": {
    "dataType": "refObject",
    "properties": {
      "id": { "dataType": "integer", "required": true, "validators": { "isInt": { "errorMsg": "Integer" } } },
      "username": { "dataType": "string", "required": true },
      "name": { "dataType": "string", "required": true },
    },
    "additionalProperties": false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Apartment": {
    "dataType": "refObject",
    "properties": {
      "apartmentDescription": { "dataType": "string", "required": true },
      "roomCount": { "dataType": "integer", "required": true, "validators": { "isInt": { "errorMsg": "Room count value must be integer" } } },
      "surfaceArea": { "dataType": "double", "required": true },
      "streetAddress": { "dataType": "string", "required": true },
      "postalCode": { "dataType": "string", "required": true },
      "postDistrict": { "dataType": "string", "required": true },
      "id": { "dataType": "integer", "required": true, "validators": { "isInt": { "errorMsg": "id value must be integer" } } },
      "coOwners": { "dataType": "array", "array": { "ref": "User" }, "required": true },
      "owner": { "ref": "User", "required": true },
    },
    "additionalProperties": false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "ValidateErrorJSON": {
    "dataType": "refObject",
    "properties": {
      "message": { "dataType": "enum", "enums": ["Validation failed"], "required": true },
      "details": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" }, "required": true },
    },
    "additionalProperties": false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "AddApartment": {
    "dataType": "refObject",
    "properties": {
      "apartmentDescription": { "dataType": "string", "required": true },
      "roomCount": { "dataType": "integer", "required": true, "validators": { "isInt": { "errorMsg": "Room count value must be integer" } } },
      "surfaceArea": { "dataType": "double", "required": true },
      "streetAddress": { "dataType": "string", "required": true },
      "postalCode": { "dataType": "string", "required": true },
      "postDistrict": { "dataType": "string", "required": true },
    },
    "additionalProperties": false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "AuthToken": {
    "dataType": "refObject",
    "properties": {
      "id": { "dataType": "integer", "required": true, "validators": { "isInt": { "errorMsg": "Integer" } } },
      "username": { "dataType": "string", "required": true },
      "accessToken": { "dataType": "string", "required": true },
    },
    "additionalProperties": false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "AuthUser": {
    "dataType": "refObject",
    "properties": {
      "username": { "dataType": "string", "required": true },
      "password": { "dataType": "string", "required": true },
    },
    "additionalProperties": false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "AddUserBody": {
    "dataType": "refObject",
    "properties": {
      "username": { "dataType": "string", "required": true },
      "password": { "dataType": "string", "required": true },
      "name": { "dataType": "string", "required": true },
    },
    "additionalProperties": false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "ChangePasswordBody": {
    "dataType": "refObject",
    "properties": {
      "oldPwd": { "dataType": "string", "required": true },
      "newPwd": { "dataType": "string", "required": true },
    },
    "additionalProperties": false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Express) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.post('/apartments',
    authenticateMiddleware([{ "apiKey": [] }]),
    function(request: any, response: any, next: any) {
      const args = {
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        data: { "in": "body", "name": "data", "required": true, "ref": "AddApartment" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new ApartmentController();


      const promise = controller.addApartment.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put('/apartments/:apartmentId/addCoOwner/:coOwnerId',
    authenticateMiddleware([{ "apiKey": [] }]),
    function(request: any, response: any, next: any) {
      const args = {
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        apartmentId: { "in": "path", "name": "apartmentId", "required": true, "dataType": "integer", "validators": { "isInt": { "errorMsg": "Must give integer value" } } },
        coOwnerId: { "in": "path", "name": "coOwnerId", "required": true, "dataType": "integer", "validators": { "isInt": { "errorMsg": "Must give integer value" } } },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new ApartmentController();


      const promise = controller.addCoOwner.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get('/apartments',
    authenticateMiddleware([{ "apiKey": [] }]),
    function(request: any, response: any, next: any) {
      const args = {
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new ApartmentController();


      const promise = controller.getApartments.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post('/auth/signin',
    function(request: any, response: any, next: any) {
      const args = {
        user: { "in": "body", "name": "user", "required": true, "ref": "AuthUser" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new AuthController();


      const promise = controller.signin.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post('/auth/addUser',
    function(request: any, response: any, next: any) {
      const args = {
        data: { "in": "body", "name": "data", "required": true, "ref": "AddUserBody" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new AuthController();


      const promise = controller.addUser.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get('/users/self',
    authenticateMiddleware([{ "apiKey": [] }]),
    function(request: any, response: any, next: any) {
      const args = {
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new UserController();


      const promise = controller.getSelf.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put('/users/changePassword',
    authenticateMiddleware([{ "apiKey": [] }]),
    function(request: any, response: any, next: any) {
      const args = {
        request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        data: { "in": "body", "name": "data", "required": true, "ref": "ChangePasswordBody" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new UserController();


      const promise = controller.changePassword.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
    return (request: any, _response: any, next: any) => {
      let responded = 0;
      let success = false;

      const succeed = function(user: any) {
        if (!success) {
          success = true;
          responded++;
          request['user'] = user;
          next();
        }
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      const fail = function(error: any) {
        responded++;
        if (responded == security.length && !success) {
          error.status = error.status || 401;
          next(error)
        }
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          let promises: Promise<any>[] = [];

          for (const name in secMethod) {
            promises.push(expressAuthentication(request, name, secMethod[name]));
          }

          Promise.all(promises)
            .then((users) => { succeed(users[0]); })
            .catch(fail);
        } else {
          for (const name in secMethod) {
            expressAuthentication(request, name, secMethod[name])
              .then(succeed)
              .catch(fail);
          }
        }
      }
    }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }

  function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode;
        if (isController(controllerObj)) {
          const headers = controllerObj.getHeaders();
          Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
          });

          statusCode = controllerObj.getStatus();
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
          data.pipe(response);
        } else if (data || data === false) { // === false allows boolean result
          response.status(statusCode || 200).json(data);
        } else {
          response.status(statusCode || 204).end();
        }
      })
      .catch((error: any) => next(error));
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, request: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
        case 'path':
          return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
        case 'header':
          return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
        case 'body':
          return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
        case 'body-prop':
          return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, '');
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
