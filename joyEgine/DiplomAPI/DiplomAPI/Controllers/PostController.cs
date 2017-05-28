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

        public PostViewModel Get(int id)
        {
            return _postService.GetById(id);
        }

        [Route("api/post/getUserPosts")]
        [HttpGet]
        public List<PostViewModel> GetUserPosts(int? id = null, PostStatus? status = null)
        {
            var posts = _postService.GetUserPosts(id, status);
            return posts;
        }

        [HttpDelete]
        public void RemovePost(int id)
        {
            _postService.Remove(id);
        }
    }
}
