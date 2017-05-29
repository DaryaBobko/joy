using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoyBusinessService.Models.PropertyModels
{
    public class PropertyModel
    {
        public int Id { get; set; }
        public string PropertyName { get; set; }
        public object Value { get; set; }
    }
}
