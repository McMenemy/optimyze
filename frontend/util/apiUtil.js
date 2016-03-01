var ApiUtil = {
  fetchAllOptimizations: function (callback) {
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

  createOptimization: function (updateParams, callback) {
    $.ajax({
      type: 'POST',
      url: 'api/optimizations',
      data: updateParams,
      dataType: 'json',
      success:
        function (respData) {
          callback(respData);
          console.log('ajax create', respData);
        },
    });
  },

  updateOptimization: function (patchParams, callback) {
    $.ajax({
      type: 'PATCH',
      url: 'api/optimizations/' + patchParams.optimization.id,
      data: patchParams,
      dataType: 'json',
      success:
        function (respData) {
          callback(respData);
          console.log('ajax update', respData);
        },
    });
  },

  deleteOptimization: function (deleteParams, callback) {
    $.ajax({
      type: 'DELETE',
      url: 'api/optimizations/' + deleteParams.optimization.id,
      data: deleteParams,
      dataType: 'json',
      success:
        function (respData) {
          callback(respData);
          console.log('ajax delete', respData);
        },
    });
  },

};

module.exports = ApiUtil;
