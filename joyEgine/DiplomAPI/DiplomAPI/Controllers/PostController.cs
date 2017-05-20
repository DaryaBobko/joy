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
        public List<PostViewModel> Get(string text)
        {
            //var searchedPosts = _postService.GetPosts(searchModel);
           // return searchedPosts;
            return new List<PostViewModel>();
        }

        public int Post(PostModel post)
        {
            _postService.AddPost(post);
            
            return 1;
        }
    }
}
