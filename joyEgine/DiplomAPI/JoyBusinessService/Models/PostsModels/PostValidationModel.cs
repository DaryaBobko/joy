using System.Collections.Generic;

namespace JoyBusinessService.Models.PostsModels
{
    public class PostValidationModel
    {
        public int Id { get; set; }
        public bool ApproveImage { get; set; }
        public List<TagViewModel> Tags { get; set; }
        public bool ApproveAll { get; set; }
    }
}