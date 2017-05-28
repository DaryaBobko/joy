using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoyBusinessService.Models.PostsModels
{
    public class PostViewModel
    {
        public int Id { get; set; }
        public string Header { get; set; }
        public string Message { get; set; }
        public string FilePath { get; set; }
        public DateTime CreatedOn { get; set; }
        public IdNameModel User { get; set; }
        public List<IdNameModel> Tags { get; set; }
        public int Priority { get; set; }
        public string ImagePath { get; set; }
        public List<string> Images { get; set; }
    }
}
