using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JoyBusinessService.Enums;
using JoyBusinessService.Models.PostsModels;
using JoyBusinessService.Models.SearchModels;

namespace JoyBusinessService.Services.Interfaces
{
    public interface IPostService
    {
        int AddPost(PostModel post);

        List<PostViewModel> GetPosts(PostSearchMidel searchModel);
        PostViewModel GetById(int id);
        List<PostViewModel> GetUserPosts(int? id, PostStatus? status);
        void Remove(int id);
        void Update(PostModel model);
        void ApprovePost(PostViewModel model);
    }
}
