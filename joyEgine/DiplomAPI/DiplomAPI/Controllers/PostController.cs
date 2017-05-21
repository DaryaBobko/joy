using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using DiplomAPI.Controllers.Base;
using DiplomAPI.Filters;
using JoyBusinessService.Enums;
using JoyBusinessService.Models.PostsModels;
using JoyBusinessService.Models.SearchModels;
using JoyBusinessService.Services.Interfaces;

namespace DiplomAPI.Controllers
{
    
    public class PostController : BaseController
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [AllowAnonymous]
        [Route("api/post/getPosts")]
        [HttpPost]
        public List<PostViewModel> GetPosts(PostSearchMidel searchModel)
        {
            var searchedPosts = _postService.GetPosts(searchModel);
            return searchedPosts;
        }

        public int Post(PostModel post)
        {
            return _postService.AddPost(post);
            
        }

        public PostViewModel Get(int Id)
        {
            return _postService.GetById(Id);
        }

        [Route("api/post/getUserPosts")]
        [HttpPost]
        public List<PostViewModel> GetUserPosts(int? id, PostStatus? status)
        {
            var posts = _postService.GetUserPosts(id, status);
            return posts;
        }
    }
}
