using AttributeRouting.Web.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DAL;
using WebAPI.Models;
using System.Data.Entity.Core.Objects;

namespace WebAPI.Controllers
{
    public class ProductController : ApiController
    {

        ProductInventoryEntities DC = new ProductInventoryEntities();
        [HttpGet]      
        public List<Get_Products_Result> getInvetntoryData()
        {
            List<Get_Products_Result> result = new List<Get_Products_Result>();
            try
            {
                result = DC.Get_Products().Select(x => new Get_Products_Result { Id = x.Id, ProductName = x.ProductName, Category = x.Category, Description = x.Description, Stock = x.Stock }).ToList();
            }
            catch (Exception)
            {
                result = null;
            }
                  
            return result;
        }

        [HttpGet]      
        public Get_Product_By_ID_Result get(string Id)
        {
            Get_Product_By_ID_Result result = new Get_Product_By_ID_Result();
            try
            {
                result = DC.Get_Product_By_ID(Id).FirstOrDefault();
            }
            catch (Exception)
            {
                result = null;
            }

            return result;
        }


        [HttpPost]
        [POST("Product/insertProduct")]
        public int insertProduct(ProductModel PM)
        {
            int result = 0;
            try
            {
                ObjectParameter isSuccess = new ObjectParameter("isSuccess", typeof(string));
                DC.INSERT_Product(PM.ProductName, PM.Category, PM.Description, PM.Stock, isSuccess);
                result = 1;
            }
            catch (Exception ex)
            {
                result = 0;
            }

            return result;
        }



        [HttpPost]
        [POST("Product/UpdateProduct")]
        public int UpdateProduct(ProductModel PM)
        {
            int result = 0;
            try
            {
                ObjectParameter isSuccess = new ObjectParameter("isSuccess", typeof(string));
                DC.Update_Product(PM.Id.ToString(),PM.ProductName, PM.Category, PM.Description, PM.Stock, isSuccess);
                // result = Convert.ToInt32(isSuccess);
                result = 1;
            }
            catch (Exception ex)
            {
                result = 0;
            }

            return result;
        }

    }
}
