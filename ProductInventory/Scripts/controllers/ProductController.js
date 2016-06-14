
var app = angular.module('app', []);
app.controller("Productcontroller", ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
    $scope.Product = {
        InventoryCount: 0,
        Tbl_data: [],
        Insert_btn_flag: 0,
        Insert_Data: [],
        Edit_Data: [],
        ViewData: [],
        showview: 0,
        showedit: 0,
        Initialize: function () {            
            $scope.Product.Methods.getInvetntoryCounts();
        },
        Methods: {
            getInvetntoryCounts: function () {
                $('#mydiv').show();              
                $scope.Product.Services.getInvetntoryCounts();
            },
            SetInvetntoryCounts: function (data) {               
                var i = 0;               
                var stock = 0;
                for (i = 0; i < data.length; i++)
                {
                    stock += data[i].Stock;
                }
                $scope.Product.InventoryCount = stock;
                $scope.Product.Tbl_data = data;
                $('#mydiv').hide();
            },
            GetData: function (Id) {
                
                $scope.Product.Services.GetData(Id);
            },
            EditData: function (Id) {
                
                $scope.Product.Services.EditData(Id);
            },
            UpdateData: function (Id) {
                
                $scope.Product.Services.Updatedata({
                    Id: Id,
                    ProductName: $scope.Product.Edit_Data.Productname,
                    Category: $scope.Product.Edit_Data.Category,
                    Description: $scope.Product.Edit_Data.Description,
                    Stock: $scope.Product.Edit_Data.Stock
                });
            },
            InsertData: function () {                
                $scope.Product.Services.InsertData({
                    ProductName: $scope.Product.Insert_Data.Productname,
                    Category: $scope.Product.Insert_Data.Category,
                    Description: $scope.Product.Insert_Data.Description,
                    Stock: $scope.Product.Insert_Data.Stock
                });
            },
            ResultInsertData: function (data) {
                $scope.Product.showedit = 0;
                $scope.Product.Insert_btn_flag = 0;
                $scope.Product.showview = 0;
                $scope.Product.Methods.getInvetntoryCounts();
            },           
            setData: function (data) {               
                debugger;
                $scope.Product.ViewData = data;
            },
            SetEditData: function (data) {
                $scope.Product.Edit_Data.Id = data.Id;
                $scope.Product.Edit_Data.Productname = data.ProductName;
                $scope.Product.Edit_Data.Category = data.Category;
                $scope.Product.Edit_Data.Description = data.Description;
                $scope.Product.Edit_Data.Stock = data.Stock;              
            },

            returnUpdateresult: function (data) {
                var res = JSON.parse(data);
                $scope.Product.Methods.getInvetntoryCounts();
            },
        },
        Services: {
            getInvetntoryCounts: function () {
                $http.get('/api/api/Product/getInvetntoryData').success($scope.Product.Methods.SetInvetntoryCounts);
            },
            InsertData: function (data) {
                $http.post('/api/api/Product/insertProduct', data).success($scope.Product.Methods.ResultInsertData);
            },
            GetData: function (Id) {
                $http.get('/api/api/Product/get/' + Id).success($scope.Product.Methods.setData);
            },
            EditData: function (Id) {
                $http.get('/api/api/Product/get/' + Id).success($scope.Product.Methods.SetEditData);
            },
            Updatedata: function (data) {
                $http.post('/api/api/Product/UpdateProduct', data).success($scope.Product.Methods.returnUpdateresult);
            }
        }
    };

    $scope.Product.Initialize();

}]);