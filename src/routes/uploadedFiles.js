const path = require('path');
const uuid = require('node-uuid');
const pathToRegexp = require('path-to-regexp');

function routeMatches(req, route, acceptedMethod) {
  return pathToRegexp(route).test(req.path) && acceptedMethod.toLowerCase() === req.method.toLowerCase();
}

function fieldExists(req, fieldName) {
  return req.files && req.files[fieldName];
}

function moveFile(file, uploadDir, req, next) {
  const fileName = `${uuid.v4()}-${file.name}`;
  const filePath = path.resolve(uploadDir, fileName);

  file.mv(filePath)
    .then(() => {
      req.uploaded[file.fieldName] = fileName;
      next();
    }).catch((err) => {
      next(err);
    });
}

module.exports = (options) => {
  const uploadedFiles = (req, res, next) => {
    if (!options.uploadDir) {
      next(new Error('uploadDir property is missing'));
    } else {
      const routes = options.routes || {};
      let routeMatchDetected = false;

      Object.keys(routes).forEach((route) => {
        const routeOptions = routes[route];
        const { fieldName, method: acceptedMethod } = routeOptions;

        if (routeMatches(req, route, acceptedMethod)) {
          routeMatchDetected = true;
          if (!fieldExists(req, fieldName)) {
            return res.status(400).send('Here was expected a file to be uploaded but something went wrong');
          }

          const file = req.files[fieldName];
          file.fieldName = fieldName;
          req.uploaded = {};
          moveFile(file, options.uploadDir, req, next);
        }
        return undefined;
      });
      if (!routeMatchDetected) {
        next();
      }
    }
  };
  return uploadedFiles;
};
