using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoyBusinessService.Models
{
    public class MailModel
    {
        public int FromId { get; set; }
        public int ToId { get; set; }
        public string Text { get; set; }
    }
}
