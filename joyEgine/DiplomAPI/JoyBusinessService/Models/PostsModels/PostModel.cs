using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DevTeam.FileFormatter;

namespace JoyBusinessService.Models.PostsModels
{
    public class PostModel : FileContentList
    {
        public PostModel()
        {
            //SelectedTags = new List<int>();
        }
        public int Id { get; set; }
        public string Header { get; set; }
        public string Message { get; set; }
        public List<int> SelectedTags { get; set; }
        //public string SelectedFile { get; set; }
    }
}
