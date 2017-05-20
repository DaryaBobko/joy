using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using DiplomAPI.Filters;
using JoyBusinessService.Models.PostsModels;
using JoyBusinessService.Models.SearchModels;
using JoyBusinessService.Services.Interfaces;

namespace DiplomAPI.Controllers
{
    
    public class PostController : ApiController
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        public List<PostViewModel> Get(PostSearchMidel searchModel)
        {
            var searchedPosts = _postService.GetPosts(searchModel);
            return searchedPosts;
        }
        [JoyAutorize]
        public int Post(PostModel post)
        {
            _postService.AddPost(post);
            
            return 1;
        }
    }
}
