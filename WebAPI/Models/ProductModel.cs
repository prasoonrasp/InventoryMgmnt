using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string Stock { get; set; }
    }
}