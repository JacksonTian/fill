!(function () {
  var isArray = function (item) {
    return Object.prototype.toString.call(item) === '[object Array]';
  };

  var merge = function (obj, src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        obj[key] = src[key];
      }
    }
    return obj;
  };

  var distinct = function (list, key) {
    var map = {};
    for (var i = 0; i < list.length; i++) {
      var val = list[i][key];
      if (!map[val]) {
        map[val] = true;
      }
    }
    return Object.keys(map);
  };

  var findAll = function (list, callback) {
    var ret = [];
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if (callback(item)) {
        ret.push(item);
      }
    }
    return ret;
  };

  // [] => {};
  var groupBy = function (list, key, values) {
    var group = {};
    values = values || distinct(list, key);
    for (var i = 0; i < values.length; i++) {
      var val = values[i];
      var found = findAll(list, function (item) {
        return item[key] === val;
      });
      group[val] = found;
    }
    return group;
  };

  var fill = function (list, condition, valueKey, defaultValue) {
    var newItem = isArray(list[0]) ? function () {return [];} : function () {return {};};
    var expand = function (arr, index, property) {
      index = index || 0;
      var group = {};
      var cond;
      if ((cond = condition[index])) {
        group = groupBy(arr, cond.key, cond.full);
        for (var key in group) {
          if (index !== condition.length - 1) {
            var map = {};
            map[cond.key] = key;
            group[key] = expand(group[key], index + 1, merge(map, property));
          } else {
            var list = group[key];
            if (!list.length) {
              var obj = newItem();
              obj[valueKey] = defaultValue;
              obj[cond.key] = key;
              merge(obj, property);
              group[key] = [obj];
            }
          }
        }
      }
      return group;
    };

    var collect = function (group) {
      var ret = [];
      for (var key in group) {
        if (isArray(group[key])) {
          ret.push(group[key][0]);
        } else {
          ret = ret.concat(collect(group[key]));
        }
      }
      return ret;
    };

    return collect(expand(list));
  };

  // export to global
  this.fill = fill;
}());
