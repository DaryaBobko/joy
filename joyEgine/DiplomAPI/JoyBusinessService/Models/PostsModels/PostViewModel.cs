using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoyBusinessService.Models.PostsModels
{
    public class PostViewModel
    {
        public string Header { get; set; }
        public string Message { get; set; }
        public string FilePath { get; set; }
        public DateTime CreatedOn { get; set; }
        public IdNameModel User { get; set; }
        public List<IdNameModel> SelectedTags { get; set; }
        public int Priority { get; set; }
    }
}
