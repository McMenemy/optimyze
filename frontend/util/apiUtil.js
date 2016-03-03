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

  createOptimization: function (postParams, callback, errorCallback, successCallback) {
    $.ajax({
      type: 'POST',
      url: 'api/optimizations',
      data: postParams,
      dataType: 'json',
      success:
        function (respData) {
          callback(respData);
          successCallback(respData);
          console.log('ajax create', respData);
        },

      error:
        function (respError) {
          console.log('ajax create error', respError.responseText);
          errorCallback(respError.responseText);
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
