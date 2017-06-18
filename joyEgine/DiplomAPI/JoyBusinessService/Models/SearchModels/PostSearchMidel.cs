using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JoyBusinessService.Enums;

namespace JoyBusinessService.Models.SearchModels
{
    public class PostSearchMidel
    {
        public string SaerchText { get; set; }
        public int? TagId { get; set; }
        public PostDisplayType? DisplayType { get; set; }
    }
}
