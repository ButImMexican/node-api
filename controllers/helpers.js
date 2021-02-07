function buildParams(validParams, body) {
        let Params = {};

        validParams.forEach(attr=>{
          if(Object.prototype.hasOwnProperty.call(body, attr))
          Params[attr] = body[attr];
        });
        return Params;
}

module.exports = {buildParams};