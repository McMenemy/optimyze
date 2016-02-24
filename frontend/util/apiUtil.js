

var ApiUtil = {
  fetchAllPublicOptimizations: function (callback) {
    $.ajax({
      url: 'api/optimizations',
      dataType: 'json',
      success:
        function (respData) {
          callback(respData);
          console.log('ajax fetch all', respData);
        },
    });
  },

  fetchOneOptimization: function (optimizationId, callback) {
    $.ajax({
      url: 'api/optimizations/' + optimizationId,
      dataType: 'json',
      success:
        function (respData) {
          callback(respData);
          console.log('ajax fetch one', respData);
        },
    });
  },

  createOptimization: function (newOptimization, callback) {
    $.ajax({
      type: 'POST',
      url: 'api/optimizations',
      data: newOptimization,
      dataType: 'json',
      success:
        function (respData) {
          callback(respData);
          console.log('ajax create', respData);
        },
    });
  },

};

module.exports = ApiUtil;
