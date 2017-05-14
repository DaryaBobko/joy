using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JoyBusinessService.Models.PostsModels;
using JoyBusinessService.Models.SearchModels;

namespace JoyBusinessService.Services.Interfaces
{
    public interface IPostService
    {
        int AddPost(PostModel post);

        List<PostViewModel> GetPosts(PostSearchMidel searchModel);
    }
}
